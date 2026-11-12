/* Formaliti: dane scenariuszy i silnik regulowy (przeniesione 1:1 z wersji www) */
// PRESET SCENARIOS WITH REAL POLISH ADMINISTRATIVE PROCEDURES
const PRESETS = [
  {
    id: "jdg",
    title: "Założenie firmy (JDG)",
    subtitle: "Rejestracja w CEIDG, wybór ZUS i podatków",
    icon: "💼",
    description: "Pełny proces startu jednoosobowej działalności gospodarczej w Polsce z uwzględnieniem Ulg ZUS i urzędu skarbowego.",
    items: [
      {
        id: "jdg-1",
        title: "Wypełnienie wniosku CEIDG-1 online",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "Przed dniem rozpoczęcia działalności",
        description: "Wniosek o wpis do Centralnej Ewidencji i Informacji o Działalności Gospodarczej. Jest bezpłatny i jednocześnie nadaje NIP i REGON firmy.",
        documents: ["Profil Zaufany / aplikacja mObywatel", "Tytuł prawny do lokalu (do wglądu)", "Kody PKD określające profil działalności"],
        links: [{ label: "Wniosek CEIDG na Biznes.gov.pl", url: "https://www.biznes.gov.pl/pl/portal/00119" }],
        order: 1
      },
      {
        id: "jdg-2",
        title: "Wybór formy opodatkowania",
        category: "podatki",
        priority: "mandatory",
        deadline: "W trakcie wniosku CEIDG-1",
        description: "Decyzja, jak będziesz rozliczać podatek dochodowy: Skala podatkowa (12%/32%), Podatek liniowy (19%) lub Ryczałt od przychodów ewidencjonowanych (zależny od stawki PKD).",
        documents: ["Kalkulacja planowanych przychodów i kosztów"],
        links: [{ label: "Przewodnik podatkowy na Podatki.gov.pl", url: "https://www.podatki.gov.pl/rozliczenie-dochodow-z-dzialalnosci-gospodarczej/" }],
        order: 2
      },
      {
        id: "jdg-3",
        title: "Zgłoszenie do ZUS (Ulga na Start - ZUS ZZA)",
        category: "zus",
        priority: "mandatory",
        deadline: "Do 7 dni od daty rozpoczęcia działalności",
        description: "Jako początkujący przedsiębiorca masz prawo do 'Ulgi na Start' (płacisz tylko składkę zdrowotną przez pierwsze 6 miesięcy). Składasz formularz ZUS ZZA.",
        documents: ["Formularz ZUS ZZA", "NIP i PESEL"],
        links: [{ label: "Portal PUE / eZUS", url: "https://www.zus.pl/portal/logowanie.npi" }],
        order: 3
      },
      {
        id: "jdg-4",
        title: "Rejestracja do podatku VAT (Formularz VAT-R)",
        category: "podatki",
        priority: "recommended",
        deadline: "Przed pierwszą sprzedażą towaru/usługi",
        description: "Obowiązkowe, jeśli Twoja sprzedaż przekroczy 200 tys. zł rocznie lub świadczysz usługi doradcze/prawnicze. Jeśli nie, możesz skorzystać ze zwolnienia podmiotowego.",
        documents: ["Wypełniony druk VAT-R", "Opłata skarbowa 170 zł (tylko przy wydaniu zaświadczenia)"],
        links: [{ label: "Złóż VAT-R na Podatki.gov.pl", url: "https://www.podatki.gov.pl/vat/formularze-do-druku-vat/#VAT-R" }],
        order: 4
      },
      {
        id: "jdg-5",
        title: "Założenie firmowego rachunku bankowego",
        category: "podatki",
        priority: "recommended",
        deadline: "Przed pierwszą płatnością / do Białej Listy VAT",
        description: "Wymagane w przypadku transakcji split-payment (B2B powyżej 15 tys. zł) oraz aby trafić na tzw. Białą Listę podatników VAT.",
        documents: ["Wpis do CEIDG (wydruk ze strony)", "Dowód osobisty"],
        links: [{ label: "Biała Lista podatników VAT", url: "https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka" }],
        order: 5
      }
    ]
  },
  {
    id: "pierwsza-praca",
    title: "Pierwsza praca (Ulga dla Młodych)",
    subtitle: "Badania, PIT-2, umowa i ulgi do 26. roku życia",
    icon: "🎓",
    description: "Wszystkie formalności niezbędne przy podjęciu zatrudnienia na etacie lub umowie zlecenie w Polsce.",
    items: [
      {
        id: "praca-1",
        title: "Wstępne badania medycyny pracy",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "Przed pierwszym dniem w pracy",
        description: "Pracodawca ma obowiązek wystawić skierowanie, a Ty musisz uzyskać orzeczenie lekarskie o braku przeciwwskazań. Koszt w całości pokrywa pracodawca.",
        documents: ["Skierowanie od pracodawcy (2 egzemplarze)", "Dokument tożsamości", "Okulary/soczewki (jeśli nosisz)"],
        links: [{ label: "Zasady badań lekarskich - PIP", url: "https://www.pip.gov.pl" }],
        order: 1
      },
      {
        id: "praca-2",
        title: "Złożenie oświadczenia PIT-2",
        category: "podatki",
        priority: "recommended",
        deadline: "Przed pierwszą wypłatą",
        description: "Dzięki temu pracodawca uwzględni miesięczną kwotę zmniejszającą podatek (300 zł/miesiąc), co podwyższa Twoją pensję 'na rękę'.",
        documents: ["Druk PIT-2 (często przekazywany przez HR firmy)"],
        links: [{ label: "Informacja o PIT-2 na Podatki.gov.pl", url: "https://www.podatki.gov.pl/pit/formularze-do-druku-pit/#PIT-2" }],
        order: 2
      },
      {
        id: "praca-3",
        title: "Weryfikacja 'Ulgi dla Młodych' (Zerowy PIT)",
        category: "podatki",
        priority: "mandatory",
        deadline: "Automatycznie do ukończenia 26 lat",
        description: "Osoby do 26 roku życia są zwolnione z podatku dochodowego od przychodów z pracy i zleceń (do limitu 85 528 zł rocznie). Pracodawca stosuje ulgę z mocy prawa.",
        documents: ["Dowód tożsamości z datą urodzenia", "Legitymacja studencka (przy umowie zlecenia dla zwolnienia z ZUS)"],
        links: [{ label: "Przewodnik: Bez PIT dla młodych", url: "https://www.podatki.gov.pl/pit/ulgi-odliczenia-i-zwolnienia/zerowy-pit-dla-mlodych/" }],
        order: 3
      },
      {
        id: "praca-4",
        title: "Instruktaż ogólny i stanowiskowy BHP",
        category: "legal",
        priority: "mandatory",
        deadline: "W pierwszym dniu pracy",
        description: "Bez odbycia szkolenia BHP pracownik nie może zostać dopuszczony do pracy. Szkolenie kończy się podpisaniem karty szkolenia wstępnego.",
        documents: ["Karta szkolenia wstępnego BHP (zapewnia pracodawca)"],
        links: [{ label: "Baza wiedzy BHP - CIOP", url: "https://www.ciop.pl" }],
        order: 4
      }
    ]
  },
  {
    id: "przeprowadzka",
    title: "Przeprowadzka i zmiana adresu",
    subtitle: "Meldunek przez internet, opłata śmieciowa, media",
    icon: "📦",
    description: "Kompletny wykaz kroków prawnych i logistycznych przy zmianie miejsca zamieszkania.",
    items: [
      {
        id: "dom-1",
        title: "Zameldowanie na pobyt stały lub czasowy",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "W terminie do 30 dni od zamieszkania",
        description: "Obowiązek meldunkowy zrealizujesz online bezpłatnie na Gov.pl. Jeśli nie jesteś właścicielem lokalu, potrzebujesz zgody i podpisu właściciela na formularzu.",
        documents: ["Profil Zaufany", "Umowa najmu LUB akt notarialny lokalu", "Wypis z księgi wieczystej (opcjonalnie)"],
        links: [{ label: "Zamelduj się przez Gov.pl", url: "https://www.gov.pl/web/gov/zamelduj-sie-na-pobyt-staly-lub-czasowy-dluzszy-niz-3-miesiace" }],
        order: 1
      },
      {
        id: "dom-2",
        title: "Deklaracja o opłatach za odpady (śmieciowa)",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "Do 14 dni od wprowadzenia się",
        description: "W przypadku własnego mieszkania/domu musisz złożyć deklarację w urzędzie gminy/miasta. Jeśli wynajmujesz w bloku, zgłoszenia zwykle dokonuje wspólnota lub spółdzielnia.",
        documents: ["Formularz deklaracji odpadowej danej gminy", "Informacja o liczbie mieszkańców lub zużyciu wody"],
        links: [{ label: "Portal ePUAP / Urząd Gminy", url: "https://epuap.gov.pl" }],
        order: 2
      },
      {
        id: "dom-3",
        title: "Aktualizacja adresu w urzędzie skarbowym (ZAP-3)",
        category: "podatki",
        priority: "recommended",
        deadline: "Przy najbliższym rozliczeniu PIT lub od razu",
        description: "Osoby fizyczne nieprowadzące działalności aktualizują adres zamieszkania na druku ZAP-3 lub bezpośrednio w corocznym zeznaniu Twój e-PIT.",
        documents: ["Formularz ZAP-3 online lub Profil Zaufany"],
        links: [{ label: "Druk ZAP-3 na Podatki.gov.pl", url: "https://www.podatki.gov.pl/pit/formularze-do-druku-pit/#ZAP-3" }],
        order: 3
      },
      {
        id: "dom-4",
        title: "Protokół zdawczo-odbiorczy i przepisanie liczników",
        category: "inne",
        priority: "mandatory",
        deadline: "W dniu przekazania kluczy",
        description: "Spisanie stanów liczników prądu i gazu wraz z podpisami obu stron oraz złożenie wniosku o cesję umowy u dostawców energii.",
        documents: ["Protokół zdawczo-odbiorczy z numerami liczników", "Umowa najmu/sprzedaży"],
        links: [{ label: "Poradnik URE: Zmiana odbiorcy mediów", url: "https://www.ure.gov.pl" }],
        order: 4
      }
    ]
  },
  {
    id: "auto",
    title: "Rejestracja zakupionego samochodu",
    subtitle: "Wydział komunikacji, podatek PCC-3, ubezpieczenie OC",
    icon: "🚗",
    description: "Jak legalnie i w terminie zarejestrować pojazd używany w Polsce.",
    items: [
      {
        id: "auto-1",
        title: "Opłacenie podatku od czynności cywilnoprawnych (PCC-3)",
        category: "podatki",
        priority: "mandatory",
        deadline: "Do 14 dni od podpisania umowy kupna",
        description: "Wynosi 2% wartości rynkowej pojazdu (dotyczy zakupu od osoby prywatnej na umowę kupna-sprzedaży. Zakup na fakturę VAT/VAT-marża jest zwolniony z PCC).",
        documents: ["Umowa kupna-sprzedaży", "Wypełniona deklaracja PCC-3"],
        links: [{ label: "Złóż deklarację PCC-3 online", url: "https://www.podatki.gov.pl/pcc-sd/pcc/formularze-do-druku-pcc/#PCC-3" }],
        order: 1
      },
      {
        id: "auto-2",
        title: "Weryfikacja i przepisanie polisy OC",
        category: "legal",
        priority: "mandatory",
        deadline: "W dniu zakupu pojazdu",
        description: "Samochód nie może mieć ani jednego dnia przerwy w OC (kara UFG sięga kilku tysięcy zł). Możesz kontynuować polisę zbywcy lub wypowiedzieć ją i kupić nową.",
        documents: ["Polisa OC poprzedniego właściciela", "Umowa kupna"],
        links: [{ label: "Ubezpieczeniowy Fundusz Gwarancyjny (UFG)", url: "https://www.ufg.pl" }],
        order: 2
      },
      {
        id: "auto-3",
        title: "Rejestracja w Wydziale Komunikacji",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "Do 30 dni od daty zakupu",
        description: "Składasz wniosek o przerejestrowanie w starostwie lub urzędzie miasta właściwym dla Twojego miejsca zamieszkania. Możesz zachować dotychczasowe tablice rejestracyjne.",
        documents: ["Wniosek o rejestrację", "Dotychczasowy dowód rejestracyjny", "Karta pojazdu (jeśli była wydana)", "Dotychczasowe tablice", "Umowa kupna"],
        links: [{ label: "Procedura rejestracji na Gov.pl", url: "https://www.gov.pl/web/gov/zarejestruj-pojazd" }],
        order: 3
      }
    ]
  }
];

// INTELLIGENT RULE-BASED ENGINE FOR DYNAMIC POLISH PROCEDURES
function generatePlanFromInput(query, age, auth) {
  const lower = query.toLowerCase();
  let title = "Procedura: " + (query.length > 40 ? query.substring(0, 37) + "..." : query);
  let icon = "📑";
  let desc = "Spersonalizowany plan czynności formalnych i terminów wygenerowany dla Twojej sytuacji.";
  let items = [];

  const pzMention = auth === 'has_pz' 
    ? "Możesz złożyć wniosek w 100% online przez Profil Zaufany / mObywatel." 
    : "Z uwagi na brak Profilu Zaufanego zalecamy najpierw założyć go bezpłatnie przez bankowość elektroniczną.";

  // 1. Mieszkanie / Nieruchomość
  if (lower.includes("mieszkan") || lower.includes("dom") || lower.includes("notariusz") || lower.includes("kupił")) {
    icon = "🏡";
    title = "Nabycie nieruchomości i przeprowadzka";
    desc = "Kompletny zbiór obowiązków po zakupie lokalu: podatek od nieruchomości, meldunek i media.";
    items = [
      {
        id: "custom-dom-1",
        title: "Zgłoszenie do podatku od nieruchomości (IN-1)",
        category: "podatki",
        priority: "mandatory",
        deadline: "W terminie 14 dni od podpisania aktu notarialnego",
        description: "Musisz powiadomić właściwy urząd miasta/gminy na formularzu IN-1 o nabyciu praw do nieruchomości w celu ustalenia wymiaru podatku. " + pzMention,
        documents: ["Akt notarialny zakupu", "Wypis z księgi wieczystej", "Formularz IN-1"],
        links: [{ label: "Formularz IN-1 na Podatki.gov.pl", url: "https://www.podatki.gov.pl/podatki-i-oplaty-lokalne/formularze/#IN-1" }],
        order: 1
      },
      {
        id: "custom-dom-2",
        title: "Cesja umów z dostawcami mediów (Energia / Gaz / Internet)",
        category: "inne",
        priority: "mandatory",
        deadline: "Do 7 dni od odbioru lokalu",
        description: "Podpisanie protokołu zdawczo-odbiorczego ze stanami liczników i zawarcie nowych umów z operatorami.",
        documents: ["Protokół zdawczo-odbiorczy ze stanem liczników", "Dokument potwierdzający prawo do lokalu"],
        links: [{ label: "Baza Urzędu Regulacji Energetyki", url: "https://www.ure.gov.pl" }],
        order: 2
      },
      {
        id: "custom-dom-3",
        title: "Meldunek i aktualizacja adresu w bankach",
        category: "rejestracja",
        priority: "recommended",
        deadline: "Do 30 dni",
        description: "Zameldowanie przez platformę Gov.pl oraz aktualizacja danych w instytucjach finansowych.",
        documents: ["Profil Zaufany", "Akt notarialny"],
        links: [{ label: "Meldunek online na Gov.pl", url: "https://www.gov.pl/web/gov/zamelduj-sie-na-pobyt-staly-lub-czasowy-dluzszy-niz-3-miesiace" }],
        order: 3
      }
    ];
  } 
  // 2. Dziecko / Urlop
  else if (lower.includes("dzieck") || lower.includes("urodzen") || lower.includes("macierz") || lower.includes("ojcowsk")) {
    icon = "👶";
    title = "Narodziny dziecka i świadczenia rodzicielskie";
    desc = "Oficjalna procedura rejestracji noworodka, nadania numeru PESEL oraz wnioskowania o 800+ i urlopy.";
    items = [
      {
        id: "custom-kid-1",
        title: "Zgłoszenie narodzin dziecka w USC",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "W terminie 21 dni od wystawienia karty urodzenia",
        description: "Zgłoszenia dokonujesz online przez Gov.pl. Dziecko otrzyma od razu imię, nazwisko, akt urodzenia oraz automatycznie nadany numer PESEL.",
        documents: ["Profil Zaufany jednego z rodziców", "Karta urodzenia przekazana przez szpital"],
        links: [{ label: "Zgłoś urodzenie dziecka na Gov.pl", url: "https://www.gov.pl/web/gov/zglos-urodzenie-dziecka" }],
        order: 1
      },
      {
        id: "custom-kid-2",
        title: "Zgłoszenie dziecka do ubezpieczenia zdrowotnego w ZUS",
        category: "zus",
        priority: "mandatory",
        deadline: "W terminie 7 dni od nadania numeru PESEL",
        description: "Dziecko musi zostać dopisane do ubezpieczenia jednego z pracujących rodziców (poprzez pracodawcę na druku ZUS ZCNA).",
        documents: ["Numer PESEL dziecka", "Wypełniony wniosek ZUS ZCNA u pracodawcy"],
        links: [{ label: "Zasady ubezpieczenia członków rodziny ZUS", url: "https://www.zus.pl" }],
        order: 2
      },
      {
        id: "custom-kid-3",
        title: "Wniosek o świadczenie wychowawcze 800+ (ZUS SW-R)",
        category: "zus",
        priority: "recommended",
        deadline: "Do 3 miesięcy od dnia narodzin (z wyrównaniem)",
        description: "Wniosek składa się wyłącznie drogą elektroniczną przez aplikację mZUS, portal PUE ZUS lub bankowość internetową.",
        documents: ["Numer konta bankowego rodzica", "PESEL dziecka"],
        links: [{ label: "Złóż wniosek o 800+ w PUE ZUS", url: "https://www.zus.pl/portal/logowanie.npi" }],
        order: 3
      }
    ];
  } 
  // 3. Ślub / Małżeństwo
  else if (lower.includes("ślub") || lower.includes("slub") || lower.includes("małżeń") || lower.includes("nazwisk")) {
    icon = "💍";
    title = "Ślub cywilny i zmiana nazwiska";
    desc = "Formalności w Urzędzie Stanu Cywilnego oraz wymiana dokumentów tożsamości po zawarciu związku.";
    items = [
      {
        id: "custom-slub-1",
        title: "Złożenie zapewnień o braku przeszkód w USC",
        category: "legal",
        priority: "mandatory",
        deadline: "Najwcześniej 6 miesięcy, najpóźniej 1 miesiąc przed ceremonią",
        description: "Oboje narzeczeni muszą osobiście stawić się w wybranym USC, złożyć oświadczenia i uiścić opłatę skarbową 84 zł.",
        documents: ["Ważne dowody osobiste", "Potwierdzenie opłaty skarbowej (84 zł)"],
        links: [{ label: "Ślub cywilny - procedura na Gov.pl", url: "https://www.gov.pl/web/gov/wez-slub-cywilny" }],
        order: 1
      },
      {
        id: "custom-slub-2",
        title: "Wymiana Dowodu Osobistego przy zmianie nazwiska",
        category: "legal",
        priority: "mandatory",
        deadline: "Dotychczasowy dowód unieważnia się po 120 dniach",
        description: "Wniosek o nowy dowód osobisty składasz bezpłatnie w dowolnym urzędzie gminy lub online przez Gov.pl.",
        documents: ["Aktualne zdjęcie biometryczne", "Profil Zaufany lub obecny dowód"],
        links: [{ label: "Wymień dowód osobisty na Gov.pl", url: "https://www.gov.pl/web/gov/uzyskaj-dowod-osobisty" }],
        order: 2
      },
      {
        id: "custom-slub-3",
        title: "Wymiana Prawa Jazdy i Dowodu Rejestracyjnego",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "W terminie 30 dni od zmiany danych",
        description: "Zgłoszenie zmiany nazwiska w Wydziale Komunikacji i wyrobienie nowego dokumentu prawa jazdy.",
        documents: ["Nowy dowód osobisty", "Dotychczasowe prawo jazdy", "Zdjęcie biometryczne", "Opłata 100 zł"],
        links: [{ label: "Wymiana prawa jazdy na Gov.pl", url: "https://www.gov.pl/web/gov/wymien-prawo-jazdy" }],
        order: 3
      }
    ];
  } 
  // 4. Default dynamic fallback
  else {
    icon = "🎯";
    title = "Indywidualny plan postępowania: " + query.substring(0, 30);
    desc = "Wygenerowana ścieżka administracyjna na podstawie podanych wytycznych.";
    items = [
      {
        id: "gen-1",
        title: "Weryfikacja tożsamości i aktywacja Profilu Zaufanego",
        category: "legal",
        priority: "mandatory",
        deadline: "Krok wstępny",
        description: "Zapewnia bezpłatny dostęp do podpisów urzędowych ePUAP i załatwiania spraw bez wychodzenia z domu.",
        documents: ["Konto w polskim banku lub dowód osobisty z warstwą elektroniczną"],
        links: [{ label: "Zarządzaj Profilem Zaufanym na Gov.pl", url: "https://pz.gov.pl" }],
        order: 1
      },
      {
        id: "gen-2",
        title: "Złożenie właściwego wniosku na Gov.pl / Biznes.gov.pl",
        category: "rejestracja",
        priority: "mandatory",
        deadline: "Do 14 dni od zaistnienia zdarzenia",
        description: "Wypełnienie formularza elektronicznego odpowiadającego Twojej sprawie. " + pzMention,
        documents: ["Dokument tożsamości", "Załączniki uzasadniające wniosek"],
        links: [{ label: "Katalog usług na Gov.pl", url: "https://www.gov.pl" }],
        order: 2
      },
      {
        id: "gen-3",
        title: "Powiadomienie Urzędu Skarbowego i uregulowanie danin",
        category: "podatki",
        priority: "recommended",
        deadline: "Zgodnie z ustawowym terminem dla danego podatku",
        description: "Sprawdzenie, czy zaistniała sytuacja prawna rodzi obowiązek podatkowy (PIT, PCC lub podatek od spadków i darowizn).",
        documents: ["Umowa lub potwierdzenie nabycia praw", "Deklaracja podatkowa"],
        links: [{ label: "Elektroniczny Urząd Skarbowy", url: "https://www.podatki.gov.pl/e-urzad-skarbowy/" }],
        order: 3
      }
    ];
  }

  // Add student-specific bonus card if under 26
  if (age === "under26_student") {
    items.push({
      id: "custom-student-benefit",
      title: "Zastosowanie statusu studenta (< 26 lat)",
      category: "podatki",
      priority: "recommended",
      deadline: "Przed podpisaniem umowy",
      description: "Jako student do 26 r.ż. podlegasz całkowitemu zwolnieniu z podatku dochodowego (Zerowy PIT) oraz ze składek ZUS przy umowie zlecenia, kwota brutto równa się kwocie netto!",
      documents: ["Ważna legitymacja studencka z hologramem", "Oświadczenie do celów podatkowych"],
      links: [{ label: "Zasady zlecenia dla studenta - ZUS", url: "https://www.zus.pl" }],
      order: 99
    });
  }

  return { title, icon, description: desc, items };
}
