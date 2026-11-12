/* Formaliti: logika aplikacji mobilnej.
   Dane (PRESETS) i silnik regułowy (generatePlanFromInput) są w data.js. */

const STORAGE_CHECKED = "formaliti_checked_state";
const STORAGE_PLAN = "formaliti_current_plan";

const CATEGORY_LABELS = {
  rejestracja: "🏛️ Rejestracja",
  podatki: "💰 Podatki i Finanse",
  zus: "🏥 ZUS i Zdrowie",
  legal: "⚖️ Tożsamość i Prawo",
  inne: "📌 Inne"
};
const PRIORITY_LABELS = { mandatory: "Wymagane", recommended: "Zalecane", optional: "Opcjonalne" };

let currentPlan = planFromPreset(PRESETS[0]);
let checkedState = {};
let activeStatusFilter = "all";

const $ = (id) => document.getElementById(id);

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function planFromPreset(p) {
  return { title: p.title, icon: p.icon, description: p.description, items: JSON.parse(JSON.stringify(p.items)) };
}

/* ---------- Pamięć lokalna (postęp zostaje po zamknięciu aplikacji) ---------- */
function loadState() {
  try {
    const checked = localStorage.getItem(STORAGE_CHECKED);
    if (checked) checkedState = JSON.parse(checked);
    const plan = JSON.parse(localStorage.getItem(STORAGE_PLAN) || "null");
    if (plan && Array.isArray(plan.items) && plan.items.length) currentPlan = plan;
  } catch (e) {
    console.warn("Brak dostępu do pamięci lokalnej", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_CHECKED, JSON.stringify(checkedState));
    localStorage.setItem(STORAGE_PLAN, JSON.stringify(currentPlan));
  } catch (e) {
    console.warn("Nie udało się zapisać stanu", e);
  }
}

/* ---------- Nawigacja między ekranami ---------- */
function showView(name) {
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + name));
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.view === name));
  window.scrollTo(0, 0);
}

/* ---------- Ekran 1: scenariusze ---------- */
function renderPresetButtons() {
  $("presets-container").innerHTML = PRESETS.map((p) => `
    <button class="preset" data-preset="${esc(p.id)}">
      <div class="preset-icon">${p.icon}</div>
      <div class="preset-text">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.subtitle)}</p>
      </div>
      <span class="preset-arrow">›</span>
    </button>
  `).join("");
}

function selectPreset(id) {
  const found = PRESETS.find((p) => p.id === id);
  if (!found) return;
  currentPlan = planFromPreset(found);
  resetFilters();
  saveState();
  renderPlan();
  showView("plan");
  showToast("Załadowano szablon: " + found.title, "📋");
}

function toggleExtraFilters() {
  const hidden = $("extra-filters").classList.toggle("hidden");
  $("extra-btn").textContent = hidden ? "Pokaż szczegóły +" : "Ukryj opcje -";
}

function handleCustomGenerate(e) {
  e.preventDefault();
  const promptText = $("user-prompt").value.trim();
  if (!promptText) return;

  const btn = $("generate-btn");
  btn.disabled = true;
  $("btn-text").textContent = "AI analizuje procedury prawne Gov.pl...";
  $("btn-icon").innerHTML = '<i class="spinner"></i>';
  $("user-prompt").blur();

  setTimeout(() => {
    currentPlan = generatePlanFromInput(promptText, $("param-age").value, $("param-auth").value);
    resetFilters();
    saveState();
    renderPlan();

    btn.disabled = false;
    $("btn-text").textContent = "Wygeneruj indywidualny plan formalności";
    $("btn-icon").textContent = "⚡";
    showView("plan");
    showToast("Wygenerowano spersonalizowaną ścieżkę!", "✨");
  }, 700);
}

/* ---------- Ekran 2: plan ---------- */
function resetFilters() {
  activeStatusFilter = "all";
  $("category-filter").value = "all";
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === "all"));
}

function setStatusFilter(status) {
  activeStatusFilter = status;
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === status));
  renderItems();
}

function toggleStep(id) {
  checkedState[id] = !checkedState[id];
  saveState();
  renderPlan();
}

function renderPlan() {
  $("active-title").textContent = currentPlan.title;
  $("active-icon").textContent = currentPlan.icon;
  $("active-desc").textContent = currentPlan.description;

  const total = currentPlan.items.length;
  const completed = currentPlan.items.filter((item) => checkedState[item.id]).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  $("progress-percent").textContent = percent + "%";
  $("progress-bar-fill").style.width = percent + "%";
  $("count-all").textContent = total;
  $("count-pending").textContent = pending;
  $("count-done").textContent = completed;

  const badge = $("tab-badge");
  badge.textContent = pending;
  badge.classList.toggle("hidden", pending === 0);

  renderItems();
}

function renderItems() {
  const container = $("items-container");
  const categoryFilter = $("category-filter").value;

  const filtered = currentPlan.items.filter((item) => {
    const isDone = !!checkedState[item.id];
    if (activeStatusFilter === "pending" && isDone) return false;
    if (activeStatusFilter === "done" && !isDone) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    return true;
  });

  $("empty-state").classList.toggle("hidden", filtered.length > 0);

  container.innerHTML = filtered.map((item) => {
    const isDone = !!checkedState[item.id];
    const priority = PRIORITY_LABELS[item.priority] ? item.priority : "optional";
    const docs = (item.documents || []).map((d) => `<span class="doc">📄 ${esc(d)}</span>`).join("");
    const links = (item.links || []).map((l) => `
      <a class="link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
        <span>🔗</span><span>${esc(l.label)}</span><span>↗</span>
      </a>`).join("");

    return `
      <article class="item ${isDone ? "done" : ""}">
        <button class="check-wrap" data-step="${esc(item.id)}" role="checkbox" aria-checked="${isDone}"
                aria-label="Oznacz krok jako ${isDone ? "niezrobiony" : "zrobiony"}: ${esc(item.title)}">
          <span class="check">✓</span>
        </button>
        <div class="item-body">
          <div class="tags">
            <span class="tag tag-${priority}">${PRIORITY_LABELS[priority]}</span>
            <span class="tag">${CATEGORY_LABELS[item.category] || "Formalność"}</span>
            <span class="tag tag-deadline">⏰ ${esc(item.deadline)}</span>
          </div>
          <h3>${esc(item.title)}</h3>
          <p class="item-desc">${esc(item.description)}</p>
          ${docs ? `<span class="docs-label">Potrzebne dokumenty:</span><div class="docs">${docs}</div>` : ""}
          ${links ? `<div class="links">${links}</div>` : ""}
        </div>
      </article>`;
  }).join("");
}

/* ---------- Eksport: Markdown, schowek, udostępnianie ---------- */
function buildMarkdown() {
  let md = `# Plan formalności: ${currentPlan.title}\n\n`;
  md += `${currentPlan.description}\n\n`;
  md += `Data wygenerowania: ${new Date().toLocaleDateString("pl-PL")}\n\n`;
  md += `## Lista zadań do załatwienia:\n\n`;

  currentPlan.items.forEach((item, index) => {
    const isDone = !!checkedState[item.id];
    md += `### ${index + 1}. [${isDone ? "X" : " "}] ${item.title}\n`;
    md += `- **Priorytet:** ${PRIORITY_LABELS[item.priority] || item.priority} | **Termin:** ${item.deadline}\n`;
    md += `- **Opis:** ${item.description}\n`;
    if (item.documents && item.documents.length) {
      md += `- **Wymagane dokumenty:** ${item.documents.join(", ")}\n`;
    }
    (item.links || []).forEach((l) => {
      md += `- **Oficjalny formularz:** [${l.label}](${l.url})\n`;
    });
    md += `\n`;
  });

  md += `---\n*Wygenerowano przez Formaliti, Asystent Formalności Życiowych*`;
  return md;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Zapasowa metoda dla starszych WebView
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    ta.remove();
    return ok;
  }
}

async function copyMarkdownPlan() {
  const ok = await copyText(buildMarkdown());
  showToast(ok ? "Skopiowano plan do schowka jako Markdown!" : "Nie udało się skopiować automatycznie", ok ? "📝" : "⚠️");
}

async function sharePlan() {
  const payload = { title: "Plan formalności: " + currentPlan.title, text: buildMarkdown() };
  const cap = window.Capacitor;
  try {
    if (cap && cap.isNativePlatform && cap.isNativePlatform() && cap.Plugins && cap.Plugins.Share) {
      // Natywne okno udostępniania (aplikacja z APK / Xcode)
      await cap.Plugins.Share.share({ ...payload, dialogTitle: "Udostępnij plan" });
    } else if (navigator.share) {
      // Udostępnianie w przeglądarce / PWA
      await navigator.share(payload);
    } else {
      await copyMarkdownPlan();
    }
  } catch (e) {
    // Użytkownik zamknął okno udostępniania: nic nie robimy
    if (e && e.name !== "AbortError" && !/cancel/i.test(String(e.message || e))) {
      await copyMarkdownPlan();
    }
  }
}

/* ---------- Powiadomienia ---------- */
let toastTimer = null;
function showToast(message, icon = "✅") {
  $("toast-message").textContent = message;
  $("toast-icon").textContent = icon;
  $("toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2800);
}

/* ---------- Start ---------- */
function init() {
  loadState();
  renderPresetButtons();
  renderPlan();

  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => showView(t.dataset.view)));
  $("presets-container").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-preset]");
    if (btn) selectPreset(btn.dataset.preset);
  });
  $("items-container").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-step]");
    if (btn) toggleStep(btn.dataset.step);
  });
  $("status-filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) setStatusFilter(chip.dataset.filter);
  });
  $("category-filter").addEventListener("change", renderItems);
  $("extra-btn").addEventListener("click", toggleExtraFilters);
  $("ai-form").addEventListener("submit", handleCustomGenerate);
  $("share-btn").addEventListener("click", sharePlan);
  $("copy-btn").addEventListener("click", copyMarkdownPlan);

  // Tryb offline dla wersji PWA. W aplikacji natywnej pliki są już w paczce.
  const isNative = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
  if (!isNative && "serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch((e) => console.warn("Service worker", e));
  }
}

document.addEventListener("DOMContentLoaded", init);
