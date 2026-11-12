# Formaliti: aplikacja mobilna (Android + iOS)

Mobilna wersja strony "Formaliti: Asystent Formalności Życiowych". Jeden kod (HTML, CSS, JavaScript) działa na trzy sposoby:

| Wariant | Gdzie działa | Jak się instaluje |
|---|---|---|
| **APK** (Capacitor) | Android | plik `Formaliti.apk` wgrany na telefon |
| **PWA** | iPhone, iPad, Android | "Dodaj do ekranu początkowego" w przeglądarce |
| **Projekt Xcode** (Capacitor) | iPhone, iPad | kabel + Mac z Xcode (opcjonalnie) |

Technologia: **Capacitor 8** (opakowuje aplikację webową w natywną aplikację Android/iOS) + **PWA** (manifest i service worker, tryb offline).

## Struktura projektu

```
www/                  <- CAŁA aplikacja (to edytujesz)
  index.html          układ ekranów
  css/app.css         wygląd
  js/data.js          scenariusze (PRESETS) i reguły generowania planu
  js/app.js           logika: zakładki, checklista, filtry, udostępnianie
  manifest.webmanifest, sw.js, icons/   <- część PWA
android/              projekt Android Studio (wygenerowany przez Capacitor)
ios/                  projekt Xcode (wygenerowany przez Capacitor)
tools/make_icons.py   generator ikon i ekranu startowego
.github/workflows/    automat: buduje APK i publikuje PWA po każdym pushu
capacitor.config.json nazwa i identyfikator aplikacji
```

## 1. Android: instalacja z pliku APK

1. Prześlij `Formaliti.apk` na telefon (mail do siebie, Dysk Google, kabel USB, Messenger).
2. Otwórz plik na telefonie.
3. Android poprosi o zgodę na instalację z nieznanego źródła: kliknij **Ustawienia** i włącz **Zezwalaj z tego źródła**.
4. Jeśli pojawi się komunikat Play Protect, wybierz **Zainstaluj mimo to** (to normalne dla aplikacji spoza sklepu).
5. Gotowe: ikona Formaliti jest na liście aplikacji.

## 2. iPhone: instalacja jako PWA (bez Maca, bez App Store)

iOS nie pozwala instalować plików spoza App Store, dlatego na iPhonie używamy PWA. Aplikacja musi być dostępna pod adresem HTTPS, najprościej przez GitHub Pages (krok 4 poniżej).

1. Otwórz adres aplikacji w **Safari** (np. `https://TWOJ-LOGIN.github.io/formaliti-app/`).
2. Kliknij **Udostępnij** (kwadrat ze strzałką w górę).
3. Wybierz **Do ekranu początkowego**, potem **Dodaj**.
4. Ikona Formaliti pojawi się na ekranie. Aplikacja otwiera się na pełnym ekranie, bez paska adresu, i działa bez internetu.

To samo działa na Androidzie w Chrome: menu z trzema kropkami, **Zainstaluj aplikację**.

## 3. iPhone: wersja natywna przez Xcode (opcjonalnie, wymaga Maca)

1. Na Macu: zainstaluj Xcode i Node.js, w folderze projektu uruchom `npm install`, potem `npm run ios:open`.
2. W Xcode: **App > Signing & Capabilities > Team**, zaloguj się zwykłym (darmowym) Apple ID.
3. Podłącz iPhone'a kablem, wybierz go u góry okna i kliknij **Run**.
4. Na telefonie: **Ustawienia > Ogólne > VPN i zarządzanie urządzeniem**, zaufaj swojemu kontu. Trzeba też włączyć **Tryb dewelopera** w Ustawienia > Prywatność i ochrona.

Ograniczenie darmowego konta Apple: aplikacja działa 7 dni, potem trzeba ją wgrać ponownie.
Uwaga: folder `ios/` został wygenerowany automatycznie i nie był budowany na Macu.

## 4. GitHub: automatyczne budowanie (zalecane)

GitHub nie jest konieczny, ale daje za darmo dwie rzeczy: adres HTTPS dla PWA oraz budowanie APK w chmurze, bez instalowania Android Studio.

1. Załóż konto na github.com i utwórz **publiczne** repozytorium, np. `formaliti-app`.
2. Wgraj zawartość tego folderu. Najprościej programem **GitHub Desktop** (przeciąganie plików w przeglądarce pomija ukryty folder `.github`). Z terminala:
   ```
   git init
   git add .
   git commit -m "Formaliti 1.0"
   git branch -M main
   git remote add origin https://github.com/TWOJ-LOGIN/formaliti-app.git
   git push -u origin main
   ```
3. W repozytorium: **Settings > Pages > Source: GitHub Actions**.
4. Zakładka **Actions**: po kilku minutach oba zadania mają zielony znaczek. Jeśli zadanie PWA wystartowało przed krokiem 3, kliknij **Re-run jobs**.
5. Efekt:
   - PWA pod adresem `https://TWOJ-LOGIN.github.io/formaliti-app/`,
   - APK do pobrania: **Actions > ostatnie uruchomienie > Artifacts > Formaliti-APK**.

Od teraz każda zmiana wypchnięta na `main` sama przebudowuje APK i aktualizuje PWA.

Alternatywa bez GitHuba (tylko PWA): przeciągnij folder `www/` na dowolny darmowy hosting plików statycznych, np. Netlify Drop.

## 5. Zmiany w aplikacji

- **Nowy scenariusz**: dopisz obiekt do tablicy `PRESETS` w `www/js/data.js` (skopiuj istniejący i zmień treść).
- **Nowa reguła dla własnego opisu**: dopisz kolejny `else if` w funkcji `generatePlanFromInput` w tym samym pliku.
- **Wygląd**: `www/css/app.css` (kolory są na górze pliku w `:root`).
- **Ikona**: zmień rysunek w `tools/make_icons.py` i uruchom `npm run icons`.
- Po zmianach w PWA podbij numer w `www/sw.js` (`formaliti-v1` na `formaliti-v2`), żeby telefony pobrały nową wersję.

Podgląd na komputerze: `npm start` i adres `http://localhost:8080` (w Chrome klawisz F12 i ikona telefonu pokazują widok mobilny).

## 6. Budowanie APK na własnym komputerze (opcjonalnie)

Wymagane: Node.js 22+, JDK 21, Android Studio (instaluje Android SDK).

```
npm install
npm run android:apk
```

Plik wynikowy: `android/app/build/outputs/apk/debug/app-debug.apk`.
Albo `npm run android:open`, co otwiera projekt w Android Studio (przycisk Run wgrywa aplikację na podłączony telefon).

## Jak to działa

- **Capacitor** tworzy natywną aplikację, która w środku wyświetla folder `www/` w systemowym WebView. Pliki są w paczce, więc aplikacja działa offline.
- **Udostępnianie**: w APK przez natywne okno systemu (wtyczka `@capacitor/share`), w PWA przez Web Share API, a w razie braku obu plan jest kopiowany do schowka.
- **Postęp** (odhaczone kroki i ostatni plan) zapisuje się w pamięci telefonu (`localStorage`).
- **"Opisz własną sytuację"** działa tak jak na stronie www: to reguły oparte na słowach kluczowych (mieszkanie, dziecko, ślub), a nie połączenie z modelem AI. Dzięki temu nie potrzeba serwera ani klucza API.
