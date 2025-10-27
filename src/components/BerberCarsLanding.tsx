// ВСТАВЬ САМЫМ ПЕРВЫМ
"use client";

import React, { useMemo, useState, useEffect } from "react"; // добавили useEffect

/**
 * BERBER CARS — Single‑Page Frontend (React + Tailwind)
 * - Dark, brutal style; bold headings (Bebas/Anton vibe via Tailwind utilities)
 * - Hero with soft "smoke" animation (CSS only, reduced-motion friendly)
 * - Primary CTA leads to external booking URL
 * - Google Maps embed with dark overlay + "How to get there" buttons
 * - Header/Footer with WhatsApp, Telegram, Instagram; Phone & Email clickable
 * - Simple i18n (PL default) with UA/RU/EN
 *
 * Replace BOOKING_URL with your real link.
 */

const BOOKING_URL =
  "https://dobrymechanik.pl/mechanicy/katowice/auto-serwis-dostawcze-berber-cars-geometria-3d.html?dm_source=mechanic_link_46755_button"; // TODO: set your real booking link
const PHONE_E164 = "+48881288700"; // tel link
const PHONE_HUMAN = "+48 881 288 700";
const EMAIL = "biuro@berbercars.pl";
const ADDRESS_TEXT = "Roździeńska 41, 40-382 Katowice";
const TELEGRAM_HANDLE = "berbercars";
const INSTAGRAM_URL = "https://www.instagram.com/berbercarserwis/";

const GMAPS_Q = encodeURIComponent(ADDRESS_TEXT);
const GMAPS_EMBED = `https://www.google.com/maps?q=${GMAPS_Q}&output=embed`;
const GMAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${GMAPS_Q}`;
const APPLE_MAPS_DIRECTIONS = `https://maps.apple.com/?daddr=${GMAPS_Q}`;

const i18n = {
  pl: {
    lang: "PL",
    heroTitle: "Auto Serwis \u201eBERBER CARS\u201d",
    heroSubtitle: "Geometria 3D \u2022 Diagnostyka \u2022 Elektronika",
    ctaBook: "Umów wizytę",
    ctaCall: "Zadzwoń",
    teamTitle: "Zobacz kto będzie Cię obsługiwał.",
    roleServiceAdvisor: "Doradca serwisowy",
    roleOwner: "Właściciel",
    services: "Usługi",
    contact: "Kontakt",
    hours: "Godziny",
    address: "Adres",
    openMaps: "Jak dojechać",
    openInGoogle: "Otwórz w Google Maps",
    openInApple: "Otwórz w Apple Maps",
    monFri: "pn–pt",
    sat: "sob",
    sun: "nd — zamknięte",
    quickServices: [
      "Geometria 3D",
      "Diagnostyka",
      "Elektronika",
      "Chip‑tuning",
      "Klimatyzacja",
      "Wulkanizacja",
    ],
  },
  ua: {
    lang: "UA",
    heroTitle: "Автосервіс \u201eBERBER CARS\u201d",
    heroSubtitle: "3D геометрія \u2022 Діагностика \u2022 Електроніка",
    ctaBook: "Записатися",
    ctaCall: "Подзвонити",
    teamTitle: "Познайомся з тими, хто буде тебе обслуговувати.",
    roleServiceAdvisor: "Сервісний радник",
    roleOwner: "Власник",
    services: "Послуги",
    contact: "Контакти",
    hours: "Години роботи",
    address: "Адреса",
    openMaps: "Маршрут",
    openInGoogle: "Відкрити в Google Maps",
    openInApple: "Відкрити в Apple Maps",
    monFri: "пн–пт",
    sat: "сб",
    sun: "нд — зачинено",
    quickServices: [
      "3D геометрія",
      "Діагностика",
      "Електроніка",
      "Чіп‑тюнінг",
      "Кондиціонер",
      "Шиномонтаж",
    ],
  },
  ru: {
    lang: "RU",
    heroTitle: "Автосервис \u201eBERBER CARS\u201d",
    heroSubtitle: "3D геометрия \u2022 Диагностика \u2022 Электроника",
    ctaBook: "Записаться",
    ctaCall: "Позвонить",
    teamTitle: "Познакомьтесь с теми, кто будет вас обслуживать.",
    roleServiceAdvisor: "Сервисный консультант",
    roleOwner: "Владелец",
    services: "Услуги",
    contact: "Контакты",
    hours: "Часы работы",
    address: "Адрес",
    openMaps: "Как добраться",
    openInGoogle: "Открыть в Google Maps",
    openInApple: "Открыть в Apple Maps",
    monFri: "пн–пт",
    sat: "сб",
    sun: "вс — закрыто",
    quickServices: [
      "3D геометрия",
      "Диагностика",
      "Электроника",
      "Чип‑тюнинг",
      "Кондиционер",
      "Шиномонтаж",
    ],
  },
  en: {
    lang: "EN",
    heroTitle: "Auto Service \u201cBERBER CARS\u201d",
    heroSubtitle: "3D Alignment \u2022 Diagnostics \u2022 Electronics",
    ctaBook: "Book now",
    ctaCall: "Call",
    teamTitle: "Meet the team who will serve you.",
    roleServiceAdvisor: "Service Advisor",
    roleOwner: "Owner",
    services: "Services",
    contact: "Contact",
    hours: "Opening hours",
    address: "Address",
    openMaps: "Directions",
    openInGoogle: "Open in Google Maps",
    openInApple: "Open in Apple Maps",
    monFri: "Mon–Fri",
    sat: "Sat",
    sun: "Sun — closed",
    quickServices: [
      "3D alignment",
      "Diagnostics",
      "Electronics",
      "Chip‑tuning",
      "Air‑con",
      "Tyres",
    ],
  },
};

type LangKey = keyof typeof i18n;

function IconPhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.18a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconWA(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.77.966-.944 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.496.099-.198.05-.372-.025-.521-.075-.149-.672-1.619-.922-2.219-.242-.58-.487-.501-.672-.51l-.573-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.48A11.957 11.957 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.093 1.52 5.82L0 24l6.333-1.66A11.957 11.957 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.193-1.247-6.093-3.48-8.52zM12 22a9.94 9.94 0 0 1-5.063-1.402l-.362-.214-3.758.987 1.004-3.665-.236-.376A9.94 9.94 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
    </svg>
  );
}
function IconTG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.5 2.5 1.7 10.1c-1.3.5-1.2 2.4.2 2.8l5.3 1.6 2.1 6.3c.4 1.1 1.8 1.4 2.6.5l3.7-3.8 5.1 3.8c1.1.8 2.6.2 2.9-1.1l3.5-16.9c.3-1.4-1-2.5-2.4-2z" />
    </svg>
  );
}
function IconIG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 4.5A5.5 5.5 0 1 0 17.5 12 5.5 5.5 0 0 0 12 6.5zm0 9A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5zM18 5.5a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 18 5.5z" />
    </svg>
  );
}
function IconClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}
function IconMapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <path d="M12 22s8-4.5 8-12a8 8 0 1 0-16 0c0 7.5 8 12 8 12z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

// Services Carousel Component with infinite auto-rotation
function ServicesCarousel({ services }: { services: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const SERVICE_ICONS = [
    { key: "alignment", icon: "⚙️" },
    { key: "diagnostics", icon: "🔍" },
    { key: "electronics", icon: "⚡" },
    { key: "chiptuning", icon: "🚀" },
    { key: "ac", icon: "❄️" },
    { key: "tyres", icon: "🛞" },
  ];

  // Auto-rotate every 1.5 seconds when not hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isHovered, services.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Calculate visible items (show 3 items at a time)
  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + services.length) % services.length;
      items.push({
        service: services[index],
        icon: SERVICE_ICONS[index],
        index,
      });
    }
    return items;
  };

  return (
    <div
      className="relative mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Previous Button */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 sm:-ml-6 group"
        aria-label="Previous service"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 group-hover:border-rose-500 bg-black/40 backdrop-blur flex items-center justify-center transition-all duration-300">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-rose-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </button>

      {/* Carousel Items */}
      <div className="overflow-hidden px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {getVisibleItems().map((item, idx) => {
            const isCenter = idx === 1;
            return (
              <div
                key={`${item.index}-${idx}`}
                className={`flex-shrink-0 transition-all duration-500 ${
                  isCenter
                    ? "w-48 sm:w-56 opacity-100 scale-100"
                    : "w-36 sm:w-44 opacity-50 scale-90"
                }`}
              >
                <div
                  className={`rounded-xl border p-6 text-center shadow-sm transition-all duration-300 ${
                    isCenter
                      ? "border-white/10 bg-white/10 hover:bg-white/15"
                      : "border-white/5 bg-white/5"
                  }`}
                >
                  <div className="text-4xl sm:text-5xl mb-3">
                    {item.icon.icon}
                  </div>
                  <div
                    className={`text-sm sm:text-base transition-colors select-none ${
                      isCenter ? "text-white font-medium" : "text-neutral-300"
                    }`}
                  >
                    {item.service}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 sm:-mr-6 group"
        aria-label="Next service"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 group-hover:border-rose-500 bg-black/40 backdrop-blur flex items-center justify-center transition-all duration-300">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-rose-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      {/* Progress Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-8 h-2 bg-rose-500"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to service ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function BerberCarsLanding() {
  const [lang, setLang] = useState<LangKey>("pl");
  const t = useMemo(() => i18n[lang], [lang]);

  // Dynamic font class for headings: Oswald for RU/UA (Cyrillic), Bebas Neue for PL/EN
  const headingFont = useMemo(() => {
    return lang === "ru" || lang === "ua"
      ? "[font-family:'Oswald',ui-sans-serif]"
      : "[font-family:'Bebas_Neue','Anton',ui-sans-serif]";
  }, [lang]);

  // Persist language and keep <html lang> in sync for a11y
  useEffect(() => {
    try {
      const stored =
        (localStorage.getItem("bc.lang") as LangKey | null) || null;
      if (stored && i18n[stored]) setLang(stored);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("bc.lang", lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);
  // ---- services meta ----
  type ServiceMeta =
    | { key: "alignment"; img: string }
    | { key: "diagnostics"; img: string }
    | { key: "electronics"; img: string }
    | { key: "chiptuning"; img: string }
    | { key: "ac"; img: string }
    | { key: "tyres"; img: string };

  const SERVICE_META: ServiceMeta[] = [
    { key: "alignment", img: "/services/alignment.png" },
    { key: "diagnostics", img: "/services/diagnostics.png" },
    { key: "electronics", img: "/services/electronics.png" },
    { key: "chiptuning", img: "/services/chiptuning.png" },
    { key: "ac", img: "/services/ac.png" },
    { key: "tyres", img: "/services/tyres.png" },
  ];

  // bios per language for 3 people
  const TEAM_BIOS: Record<
    LangKey,
    { manager: string; owner1: string; owner2: string }
  > = {
    pl: {
      manager:
        "Doradca serwisowy z doświadczeniem. Łączy wiedzę techniczną z dobrą obsługą klienta i dba o sprawną realizację usług.",
      owner1:
        "Właściciel warsztatu. Odpowiada za kierunek rozwoju, standard jakości i nowoczesne rozwiązania w serwisie.",
      owner2:
        "Właściciel. Specjalizuje się w doborze części i tuningu, dba o terminowość i transparentną komunikację.",
    },
    ua: {
      manager:
        "Досвідчений сервісний радник. Поєднує технічні знання з якісним сервісом та контролює виконання робіт.",
      owner1:
        "Власник сервісу. Відповідає за розвиток, якість та впровадження сучасних рішень.",
      owner2:
        "Власник. Спеціалізується на підборі запчастин і тюнингу, стежить за строками та комунікацією.",
    },
    ru: {
      manager:
        "Опытный сервисный консультант. Совмещает технические знания с качественным сервисом и контролирует выполнение работ.",
      owner1:
        "Владелец сервиса. Отвечает за развитие, качество и современные решения мастерской.",
      owner2:
        "Владелец. Специализируется на подборе запчастей и тюнинге, следит за сроками и коммуникацией.",
    },
    en: {
      manager:
        "Experienced service advisor who blends technical knowledge with great customer care and smooth execution.",
      owner1:
        "Shop owner. Responsible for strategy, quality standards and modern solutions in the workshop.",
      owner2:
        "Owner. Focused on parts sourcing and tuning, keeping timelines and communication clear.",
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-white/10">
      {/* Global max width */}
      <Header lang={lang} setLang={setLang} headingFont={headingFont} />
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* фон под видео */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(40,40,45,0.6),rgba(10,10,12,0.9))]" />
        {/* видео-дым / fallback */}
        <SmokeLayer />
        {/* лёгкий затемняющий градиент для глубины */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

        {/* только логотип по центру */}
        <div className="relative mx-auto max-w-7xl min-h-[70vh] px-4 py-20 sm:py-28">
          <img
            src="/brand/hero-logo.png" /* если svg: /brand/hero-logo.svg */
            alt="BERBER CARS — logo"
            className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] sm:w-[50vw] max-w-[820px] min-w-[260px] opacity-95 drop-shadow-[0_0_30px_rgba(255,255,255,.08)]"
            draggable={false}
          />
        </div>
      </section>
      <section id="hero-cta" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 mt-10 sm:mt-12 pb-8">
          <div className="flex flex-col items-end text-right">
            <div className="flex flex-wrap items-center justify-end gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold uppercase tracking-wide bg-rose-600 hover:bg-rose-500 active:bg-rose-700 transition"
              >
                {t.ctaBook}
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold uppercase tracking-wide bg-white/10 hover:bg-white/15 active:bg-white/20 transition"
              >
                <IconPhone className="h-5 w-5" /> {t.ctaCall}
              </a>
            </div>

            <div className="mt-4 flex items-center justify-end gap-4 text-sm text-neutral-300">
              <a
                className="inline-flex items-center gap-2 hover:text-white transition"
                href={`https://wa.me/${PHONE_E164.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <IconWA className="h-5 w-5" /> WhatsApp
              </a>
              <a
                className="inline-flex items-center gap-2 hover:text-white transition"
                href={`https://t.me/${TELEGRAM_HANDLE}`}
                target="_blank"
                rel="noreferrer"
              >
                <IconTG className="h-5 w-5" /> Telegram
              </a>
              <a
                className="inline-flex items-center gap-2 hover:text-white transition"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <IconIG className="h-5 w-5" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="flex items-end justify-between">
          <h2
            className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-[1px] ${headingFont}`}
          >
            {t.services}
          </h2>
          <div className="text-neutral-400 text-sm">BERBER CARS</div>
        </div>

        <ServicesCarousel services={t.quickServices} />
      </section>
      {/* CONTACT + HOURS */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
            <h3
              className={`text-2xl font-extrabold uppercase tracking-tight ${headingFont}`}
            >
              {t.contact}
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <IconPhone className="h-5 w-5 text-neutral-300" />
                <a className="hover:underline" href={`tel:${PHONE_E164}`}>
                  {PHONE_HUMAN}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <IconMail className="h-5 w-5 text-neutral-300" />
                <a className="hover:underline" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <IconMapPin className="h-5 w-5 text-neutral-300" />
                <span>{ADDRESS_TEXT}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  className="rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 px-3 py-2 text-xs font-semibold"
                  href={GMAPS_DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.openInGoogle}
                </a>
                <a
                  className="rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 px-3 py-2 text-xs font-semibold"
                  href={APPLE_MAPS_DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.openInApple}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h4
                className={`text-xl font-bold uppercase tracking-tight ${headingFont}`}
              >
                {t.hours}
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-neutral-300">
                <li>
                  <span className="inline-block w-16 text-neutral-400">
                    {t.monFri}
                  </span>{" "}
                  08:00–17:00
                </li>
                <li>
                  <span className="inline-block w-16 text-neutral-400">
                    {t.sat}
                  </span>{" "}
                  08:00–15:00
                </li>
                <li>
                  <span className="inline-block w-16 text-neutral-400">
                    {t.sun}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* MAP */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/5 bg-white/5">
            <div className="relative">
              <iframe
                title="Mapa"
                src={GMAPS_EMBED}
                loading="lazy"
                className="w-full h-[380px] sm:h-[420px]"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google map with BERBER CARS location"
              />
              {/* Dark overlay to blend with theme */}
              <div className="pointer-events-none absolute inset-0 bg-neutral-900/25" />
            </div>
          </div>
        </div>
      </section>
      {/* TEAM */}
      <section id="team" className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <h2
          className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-[1px] ${headingFont}`}
        >
          {t.teamTitle}
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              key: "manager",
              role: t.roleServiceAdvisor,
              name: "Imię i Nazwisko",
              img: "/team/manager.svg",
            },
            {
              key: "owner1",
              role: t.roleOwner,
              name: "Imię i Nazwisko",
              img: "/team/owner1.svg",
            },
            {
              key: "owner2",
              role: t.roleOwner,
              name: "Imię i Nazwisko",
              img: "/team/owner2.svg",
            },
          ].map((m) => (
            <article
              key={m.key}
              className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden"
            >
              <div className="bg-white/90">
                <img
                  src={m.img}
                  alt={`${m.name} — ${m.role}`}
                  className="w-full h-[360px] object-cover object-center select-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  {m.role}
                </div>
                <h3 className="mt-1 text-xl font-bold text-neutral-50">
                  {m.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  {TEAM_BIOS[lang][m.key as "manager" | "owner1" | "owner2"]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* FOOTER */}
      <footer className="mt-12 border-t border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-sm text-neutral-400">
            <div
              className={`font-bold text-neutral-200 tracking-wide uppercase ${headingFont}`}
            >
              BERBER CARS
            </div>
            <div className="mt-1">
              © {new Date().getFullYear()} — All rights reserved
            </div>
          </div>
          <div className="flex items-center gap-4 text-neutral-300">
            <a
              className="inline-flex items-center gap-2 hover:text-white transition"
              href={`https://wa.me/${PHONE_E164.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <IconWA className="h-5 w-5" />
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-white transition"
              href={`https://t.me/${TELEGRAM_HANDLE}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <IconTG className="h-5 w-5" />
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-white transition"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <IconIG className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
      {/* Language pill */}
      <LangSwitcher lang={lang} setLang={setLang} />
      {/* Styles for smoke animation */}
      <style>{`
        @keyframes drift {
          0% { transform: translate3d(0,0,0) scale(1); opacity: .36; }
          50% { transform: translate3d(20px,-30px,0) scale(1.07); opacity: .28; }
          100% { transform: translate3d(-10px,10px,0) scale(1); opacity: .36; }
        }
        @media (prefers-reduced-motion: reduce) {
          .smoke span { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Header({
  lang,
  setLang,
  headingFont,
}: {
  lang: LangKey;
  setLang: (l: LangKey) => void;
  headingFont: string;
}) {
  const t = i18n[lang];
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="BERBER CARS logo"
            className="h-8 w-auto rounded-[2px]"
          />
        </div>
        <div className="flex items-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 px-4 py-2 text-sm font-semibold uppercase tracking-wide"
          >
            {t.ctaBook}
          </a>
          <a
            className="hidden sm:inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-white"
            href={`tel:${PHONE_E164}`}
          >
            <IconPhone className="h-4 w-4" /> {PHONE_HUMAN}
          </a>
          <nav
            aria-label="social"
            className="hidden md:flex items-center gap-3 text-neutral-300"
          >
            <a
              className="hover:text-white"
              href={`https://wa.me/${PHONE_E164.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <IconWA className="h-5 w-5" />
            </a>
            <a
              className="hover:text-white"
              href={`https://t.me/${TELEGRAM_HANDLE}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <IconTG className="h-5 w-5" />
            </a>
            <a
              className="hover:text-white"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <IconIG className="h-5 w-5" />
            </a>
          </nav>
          <div className="ml-2 flex items-center gap-1">
            {(["pl", "ua", "ru", "en"] as LangKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setLang(k)}
                className={`px-2.5 py-1.5 text-xs rounded-lg uppercase font-semibold tracking-wide ${
                  k === lang
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
                aria-pressed={k === lang}
              >
                {i18n[k].lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function SmokeLayer() {
  // Видео-оверлей + fallback на CSS-дым (для reduce-motion или если видео не загрузилось)
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
        src="/media/smoke.mp4"
        // если есть webm: <source src="/media/smoke.webm" type="video/webm" />
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* Fallback для prefers-reduced-motion */}
      <div className="pointer-events-none absolute inset-0 smoke">
        <span className="absolute left-1/4 top-1/3 w-[360px] h-[360px] rounded-full blur-[60px] bg-white/10 animate-[drift_24s_ease-in-out_infinite_alternate]" />
        <span className="absolute left-2/3 top-1/4 w-[420px] h-[420px] rounded-full blur-[70px] bg-white/10 animate-[drift_30s_ease-in-out_infinite_alternate]" />
      </div>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
          .smoke span { animation: none !important; }
        }
        @keyframes drift {
          0% { transform: translate3d(0,0,0) scale(1); opacity: .35; }
          50% { transform: translate3d(18px,-24px,0) scale(1.06); opacity: .28; }
          100% { transform: translate3d(-12px,10px,0) scale(1); opacity: .35; }
        }
      `}</style>
    </div>
  );
}

function LangSwitcher({
  lang,
  setLang,
}: {
  lang: LangKey;
  setLang: (l: LangKey) => void;
}) {
  const t = i18n[lang];
  return (
    <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-black/50 px-3 py-2 shadow-xl">
      <div className="text-xs text-neutral-300 tracking-wide">{t.openMaps}</div>
      <a
        href={GMAPS_DIRECTIONS}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg bg-white/10 hover:bg-white/15 px-2 py-1 text-xs font-semibold"
      >
        Google
      </a>
      <a
        href={APPLE_MAPS_DIRECTIONS}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg bg-white/10 hover:bg-white/15 px-2 py-1 text-xs font-semibold"
      >
        Apple
      </a>
    </div>
  );
}
