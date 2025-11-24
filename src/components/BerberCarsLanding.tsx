// ВСТАВЬ САМЫМ ПЕРВЫМ
"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

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

const GMAPS_COORDS = "50.260655285313305,19.07732689031581";
const GMAPS_EMBED = `https://www.google.com/maps?q=${GMAPS_COORDS}&output=embed`;
const GMAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${GMAPS_COORDS}`;
const APPLE_MAPS_DIRECTIONS = `https://maps.apple.com/?daddr=${GMAPS_COORDS}`;

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
    nameManager: "Menadżer Serwisu",
    nameOwner: "Współwłaściciel",
    servicesWarsztat: "Usługi warsztatu",
    servicesLakiernia: "Usługi lakierni",
    services: "Usługi",
    beforeAfterTitle: "Nasze realizacje",
    beforeAfterSubtitle: "Zobacz efekty naszej pracy",
    beforeLabel: "Przed",
    afterLabel: "Po",
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
    lakierniaServices: [
      "Lokalne malowanie i farba",
      "Pełne malowanie elementu",
      "Pełne malowanie pojazdu",
      "Prostowanie i przywrócenie geometrii części",
      "Prace na stanowisku prostowniczym",
      "Naprawa i odnawianie części plastikowych",
      "Przygotowanie do malowania",
      "Dobór koloru i malowanie pod fabrykę",
      "Polerowanie po malowaniu",
      "Polerowanie i renowacja reflektorów",
      "Malowanie pojedynczych elementów",
      "Zabezpieczenie antykorozyjne",
      "Polerowanie szyb",
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
    nameManager: "Менеджер сервісу",
    nameOwner: "Співвласник",
    servicesWarsztat: "Послуги майстерні",
    servicesLakiernia: "Послуги малярні",
    services: "Послуги",
    beforeAfterTitle: "Наші реалізації",
    beforeAfterSubtitle: "Подивіться на результати нашої роботи",
    beforeLabel: "До",
    afterLabel: "Після",
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
    lakierniaServices: [
      "Локальний ремонт і фарбування",
      "Повне фарбування елемента",
      "Повне фарбування автомобіля",
      "Рихтування та відновлення геометрії деталі",
      "Стапельні роботи",
      "Ремонт і відновлення пластикових деталей",
      "Підготовка до фарбування",
      "Підбір кольору та фарбування під завод",
      "Полірування після фарбування",
      "Полірування та відновлення фар",
      "Фарбування окремих елементів",
      "Антикорозійна обробка",
      "Полірування скла",
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
    nameManager: "Менеджер сервиса",
    nameOwner: "Совладелец",
    servicesWarsztat: "Услуги мастерской",
    servicesLakiernia: "Услуги малярни",
    services: "Услуги",
    beforeAfterTitle: "Наши работы",
    beforeAfterSubtitle: "Посмотрите на результаты нашей работы",
    beforeLabel: "До",
    afterLabel: "После",
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
    lakierniaServices: [
      "Локальный ремонт и покраска",
      "Полная покраска элемента",
      "Полная покраска автомобиля",
      "Рихтовка и восстановление геометрии детали",
      "Стапельные работы",
      "Ремонт и восстановление пластиковых деталей",
      "Подготовка к покраске",
      "Подбор цвета и покраска под завод",
      "Полировка после покраски",
      "Полировка и восстановление фар",
      "Покраска отдельных элементов",
      "Антикоррозийная обработка",
      "Полировка стёкол",
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
    nameManager: "Service Manager",
    nameOwner: "Co-owner",
    servicesWarsztat: "Workshop services",
    servicesLakiernia: "Body shop services",
    services: "Services",
    beforeAfterTitle: "Our Work",
    beforeAfterSubtitle: "See the results of our work",
    beforeLabel: "Before",
    afterLabel: "After",
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
    lakierniaServices: [
      "Local repair and painting",
      "Full element painting",
      "Full vehicle painting",
      "Straightening and part geometry restoration",
      "Frame straightening work",
      "Plastic parts repair and restoration",
      "Paint preparation",
      "Color matching and factory finish",
      "Post-paint polishing",
      "Headlight polishing and restoration",
      "Individual element painting",
      "Anti-corrosion treatment",
      "Glass polishing",
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

// Before/After Slider Component
function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      onMouseLeave={handleMouseUp}
    >
      {/* After Image (background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize pointer-events-auto"
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
        >
          <svg
            className="w-6 h-6 text-neutral-900"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7M9 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Services Carousel Component with infinite auto-rotation
function ServicesCarousel({
  services,
  type,
}: {
  services: string[];
  type: "warsztat" | "lakiernia";
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const WARSZTAT_IMAGES = [
    { key: "alignment", img: "/services/Geometria 3D.png" },
    { key: "diagnostics", img: "/services/Diagnostyka.png" },
    { key: "electronics", img: "/services/Elektronika.png" },
    { key: "chiptuning", img: "/services/Chip-tuning.png" },
    { key: "ac", img: "/services/Klimatyzacja.png" },
    { key: "tyres", img: "/services/Wulkanizacja.png" },
  ];

  // Lakiernia service images
  const LAKIERNIA_IMAGES = [
    { key: "lokalne", img: "/services/lakiernia/Lokalne_malowanie.PNG" },
    {
      key: "pelne-element",
      img: "/services/lakiernia/Pelne_malowanie_elementu.PNG",
    },
    {
      key: "pelne-pojazd",
      img: "/services/lakiernia/Pelne_malowanie_pojazdu.PNG",
    },
    { key: "geometria", img: "/services/lakiernia/geometrii_części.PNG" },
    {
      key: "prostownicze",
      img: "/services/lakiernia/Prace_na_stanowisku_prostowniczym.PNG",
    },
    {
      key: "plastik",
      img: "/services/lakiernia/Naprawa_czesci_plastikowych.PNG",
    },
    {
      key: "przygotowanie",
      img: "/services/lakiernia/Przygotowanie_do_malowania.PNG",
    },
    { key: "dobor", img: "/services/lakiernia/Dobor_koloru.PNG" },
    { key: "polerowanie", img: "/services/lakiernia/Polerowanie.PNG" },
    {
      key: "reflektory",
      img: "/services/lakiernia/Polerowanie_reflektorow.PNG",
    },
    {
      key: "pojedyncze",
      img: "/services/lakiernia/Malowanie_pojedynczych_elementow.PNG",
    },
    {
      key: "antykorozja",
      img: "/services/lakiernia/Zabezpieczenie_antykorozyjne.PNG",
    },
    { key: "szyby", img: "/services/lakiernia/Polerowanie_szyb.PNG" },
  ];

  const SERVICE_IMAGES =
    type === "warsztat" ? WARSZTAT_IMAGES : LAKIERNIA_IMAGES;

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
        image: SERVICE_IMAGES[index],
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
        className="absolute left-0 top-[40%] -translate-y-1/2 z-10 -ml-4 sm:-ml-6 group"
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
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {getVisibleItems().map((item, idx) => {
            const isCenter = idx === 1;
            const isSide = !isCenter;
            return (
              <div
                key={`${item.index}-${idx}`}
                className={`flex-shrink-0 transition-all duration-500 ${
                  isCenter
                    ? "w-[330px] sm:w-[440px] opacity-100 scale-100"
                    : "w-[257px] sm:w-[330px] opacity-100 scale-90 hidden sm:block"
                }`}
              >
                <div className="space-y-4">
                  {/* Image card - full size */}
                  <div
                    className={`rounded-2xl border overflow-hidden shadow-lg transition-all duration-300 aspect-square ${
                      isCenter
                        ? "border-white/10 bg-white/10 hover:bg-white/15"
                        : "border-white/5 bg-white/5"
                    }`}
                  >
                    <img
                      src={item.image.img}
                      alt={item.service}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  {/* Service name below card */}
                  <div
                    className={`text-center text-base sm:text-lg transition-colors select-none min-h-[3rem] flex items-center justify-center ${
                      isCenter ? "text-white font-semibold" : "text-neutral-400"
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
        className="absolute right-0 top-[40%] -translate-y-1/2 z-10 -mr-4 sm:-mr-6 group"
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
  const [mounted, setMounted] = useState(false);
  const t = useMemo(() => i18n[lang], [lang]);

  // Dynamic font class for headings: Oswald for RU/UA (Cyrillic), Bebas Neue for PL/EN
  const headingFont = useMemo(() => {
    return lang === "ru" || lang === "ua"
      ? "[font-family:'Oswald',ui-sans-serif]"
      : "[font-family:'Bebas_Neue','Anton',ui-sans-serif]";
  }, [lang]);

  // Persist language and keep <html lang> in sync for a11y
  useEffect(() => {
    setMounted(true);
    try {
      const stored =
        (localStorage.getItem("bc.lang") as LangKey | null) || null;
      if (stored && i18n[stored]) setLang(stored);
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("bc.lang", lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang, mounted]);
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
        "Ekspert w obsłudze klienta i organizacji pracy serwisu. Doskonale zna się na technice samochodowej i dba o to, aby każde zlecenie było wykonane terminowo i zgodnie z najwyższymi standardami jakości.",
      owner1:
        "Właściciel odpowiedzialny za stronę prawną i administracyjną firmy. Zapewnia pełną legalność i przejrzystość wszystkich procesów biznesowych, dbając o zgodność z przepisami i bezpieczeństwo dokumentacji.",
      owner2:
        "Właściciel odpowiedzialny za rozwój techniczny serwisu. Zajmuje się doborem i zakupem profesjonalnego sprzętu oraz negocjacją warunków najmu. Decyduje o inwestycjach w nowoczesne technologie dla warsztatów.",
    },
    ua: {
      manager:
        "Експерт у роботі з клієнтами та організації роботи сервісу. Чудово розуміється на автотехніці й дбає про те, щоб кожне замовлення виконувалось вчасно та відповідно до найвищих стандартів якості.",
      owner1:
        "Власник, відповідальний за юридичну та адміністративну сторону компанії. Забезпечує повну легальність і прозорість усіх бізнес-процесів, дбаючи про відповідність законодавству та безпеку документації.",
      owner2:
        "Власник, відповідальний за технічний розвиток сервісу. Займається підбором і закупівлею професійного обладнання та переговорами щодо умов оренди. Приймає рішення про інвестиції в сучасні технології для майстерень.",
    },
    ru: {
      manager:
        "Эксперт в работе с клиентами и организации работы сервиса. Отлично разбирается в автотехнике и следит за тем, чтобы каждый заказ выполнялся вовремя и в соответствии с высочайшими стандартами качества.",
      owner1:
        "Владелец, ответственный за юридическую и административную сторону компании. Обеспечивает полную легальность и прозрачность всех бизнес-процессов, заботясь о соблюдении законодательства и безопасности документации.",
      owner2:
        "Владелец, ответственный за техническое развитие сервиса. Занимается подбором и закупкой профессионального оборудования, а также переговорами об условиях аренды. Принимает решения об инвестициях в современные технологии для мастерских.",
    },
    en: {
      manager:
        "Expert in customer service and workshop operations management. Has deep knowledge of automotive technology and ensures every job is completed on time and to the highest quality standards.",
      owner1:
        "Owner responsible for legal and administrative aspects of the business. Ensures full compliance and transparency of all business processes, maintaining proper documentation and legal safety.",
      owner2:
        "Owner responsible for technical development of the service center. Handles selection and procurement of professional equipment and lease negotiations. Makes decisions on investments in modern workshop technologies.",
    },
  };

  // Detect Cyrillic for tighter letter spacing
  const isCyrillic = lang === "ua" || lang === "ru";
  const cyrillicClass = isCyrillic ? "tracking-tight" : "";

  return (
    <div
      className={`min-h-screen bg-neutral-950 text-neutral-100 selection:bg-white/10 ${cyrillicClass}`}
    >
      {/* Global max width */}
      <Header lang={lang} setLang={setLang} headingFont={headingFont} />
      {/* HERO */}
      <section className="relative overflow-visible">
        {/* Mobile version: Warsztat logo with sparks */}
        <div className="block lg:hidden relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(40,40,45,0.6),rgba(10,10,12,0.9))]" />

          {/* Smoke video */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
            src="/media/smoke.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          {/* Sparks video overlay */}
          <video
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
            src="/media/sparks.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl min-h-[70vh] px-4 py-20 sm:py-28 flex items-center justify-center">
            <img
              src="/brand/Berber Warsztat LOGO Biale 1500x1500.png"
              alt="BERBER WARSZTAT"
              className="pointer-events-none select-none w-[80vw] sm:w-[60vw] max-w-[600px] min-w-[320px] opacity-95 drop-shadow-[0_0_30px_rgba(255,255,255,.12)]"
              draggable={false}
            />
          </div>
        </div>

        {/* Desktop version: split hero with two videos */}
        <div className="hidden lg:flex min-h-[70vh] relative">
          {/* Left side - BERBER WARSZTAT with smoke video */}
          <div className="relative w-1/2 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 via-transparent to-black/40 z-10" />

            {/* Smoke video */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
              src="/media/smoke.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />

            {/* Sparks video overlay */}
            <video
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
              src="/media/sparks.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />

            {/* Fallback smoke animation */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute left-1/4 top-1/3 w-[360px] h-[360px] rounded-full blur-[60px] bg-white/10 animate-[drift_24s_ease-in-out_infinite_alternate]" />
              <span className="absolute left-2/3 top-1/4 w-[420px] h-[420px] rounded-full blur-[70px] bg-white/10 animate-[drift_30s_ease-in-out_infinite_alternate]" />
            </div>

            {/* Logo Warsztat */}
            <div className="relative z-20 flex items-center justify-center h-full">
              <img
                src="/brand/Berber Warsztat LOGO Biale 1500x1500.png"
                alt="BERBER WARSZTAT"
                className="pointer-events-none select-none w-[45vw] max-w-[500px] min-w-[280px] opacity-95 drop-shadow-[0_0_30px_rgba(255,255,255,.12)]"
                draggable={false}
              />
            </div>
          </div>

          {/* Center divider with perfectly smooth gradient blur */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-30 pointer-events-none backdrop-blur-[50px]"
            style={{
              width: "200px",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 50%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 50%, transparent 100%)",
            }}
          >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/3 via-black/8 to-black/3" />
          </div>

          {/* Right side - BERBER LAKIERNIA with ink in water video */}
          <div className="relative w-1/2 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/20 via-transparent to-black/40 z-10" />

            {/* Ink in water video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/media/ink_in_water.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />

            {/* Logo Lakiernia */}
            <div className="relative z-20 flex items-center justify-center h-full">
              <img
                src="/brand/Berber Lakiernia LOGO Biale 1500x1500.png"
                alt="BERBER LAKIERNIA"
                className="pointer-events-none select-none w-[45vw] max-w-[500px] min-w-[280px] opacity-95 drop-shadow-[0_0_30px_rgba(255,255,255,.12)]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Bottom horizontal blur divider - fades hero into buttons section */}
        <div
          className="absolute left-0 right-0 z-40 pointer-events-none backdrop-blur-[50px]"
          style={{
            bottom: "0",
            height: "120px",
            transform: "translateY(50%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)",
          }}
        >
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/3 via-black/8 to-black/3" />
        </div>
      </section>
      <section id="hero-cta" className="bg-transparent relative">
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
      {/* SERVICES WARSZTAT */}
      <section
        id="services-warsztat"
        className="relative py-16 sm:py-20 overflow-hidden"
      >
        {/* Background image - full width, scaled */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/services/background/stream_of_smoke.png"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Content with max-width */}
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between">
            <h2
              className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-[1px] ${headingFont}`}
            >
              {t.servicesWarsztat}
            </h2>
          </div>

          <ServicesCarousel services={t.quickServices} type="warsztat" />
        </div>
      </section>

      {/* SERVICES LAKIERNIA */}
      <section
        id="services-lakiernia"
        className="relative pb-16 sm:pb-20 overflow-hidden"
      >
        {/* Background image - full width, scaled */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/services/background/ink_stream.png"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Content with max-width */}
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between">
            <h2
              className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-[1px] ${headingFont}`}
            >
              {t.servicesLakiernia}
            </h2>
          </div>

          <ServicesCarousel services={t.lakierniaServices} type="lakiernia" />
        </div>
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
                <li className="whitespace-nowrap">
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

      {/* BEFORE & AFTER - TEMPORARILY HIDDEN (waiting for materials) */}
      {/* <section
        id="before-after"
        className="mx-auto max-w-7xl px-4 py-16 sm:py-20"
      >
        <div className="text-center mb-12">
          <h2
            className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-[1px] ${headingFont}`}
          >
            {t.beforeAfterTitle}
          </h2>
          <p className="mt-3 text-lg text-neutral-400">
            {t.beforeAfterSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
            <div className="aspect-[1670/652]">
              <BeforeAfterSlider
                beforeImage="/before_after/before_cls.jpg"
                afterImage="/before_after/after_cls.png"
                beforeLabel={t.beforeLabel}
                afterLabel={t.afterLabel}
              />
            </div>
          </div>
        </div>
      </section> */}

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
              name: t.nameManager,
              img: "/team/manager.JPG",
            },
            {
              key: "owner1",
              role: t.roleOwner,
              name: t.nameOwner,
              img: "/team/owner_1.JPG",
            },
            {
              key: "owner2",
              role: t.roleOwner,
              name: t.nameOwner,
              img: "/team/owner_2.JPG",
            },
          ].map((m) => (
            <article
              key={m.key}
              className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden"
            >
              <div className="bg-neutral-800/50">
                <img
                  src={m.img}
                  alt={`${m.name} — ${m.role}`}
                  className="w-full h-[480px] object-cover object-center select-none"
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
            src="/logo_berber.png"
            alt="BERBER CARS logo"
            className="h-32 w-auto rounded-[2px]"
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
