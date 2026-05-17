import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_PHONE, DEFAULT_PHONE_DISPLAY } from "@/lib/contacts";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  priceFrom?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  area: string;
  image: string; // base64 or url
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface PriceRow {
  id: string;
  name: string;
  unit: string;
  price: string;
}

export interface HeroContent {
  badge: string;
  titleA: string;
  titleAccent: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface ContactsContent {
  phone: string;
  phoneDisplay: string;
  address: string;
  workHours: string;
  inn: string;
  company: string;
}

interface CmsState {
  hero: HeroContent;
  services: Service[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  prices: PriceRow[];
  contacts: ContactsContent;

  setHero: (h: Partial<HeroContent>) => void;
  setContacts: (c: Partial<ContactsContent>) => void;

  upsertService: (s: Service) => void;
  removeService: (id: string) => void;

  upsertPortfolio: (p: PortfolioItem) => void;
  removePortfolio: (id: string) => void;

  upsertReview: (r: Review) => void;
  removeReview: (id: string) => void;

  upsertPrice: (p: PriceRow) => void;
  removePrice: (id: string) => void;

  reset: () => void;
}

const defaultServices: Service[] = [
  { id: "s1", title: "Асфальтирование дорог", description: "Магистрали, подъезды, технологические дороги под нагрузку до 40 т.", icon: "Route", priceFrom: "от 590 ₽/м²" },
  { id: "s2", title: "Асфальтирование дворов", description: "Дворовые территории жилых комплексов, ТСЖ и УК — быстро и аккуратно.", icon: "Building2", priceFrom: "от 620 ₽/м²" },
  { id: "s3", title: "Асфальтирование СНТ", description: "Подъездные пути, дороги общего пользования в садовых товариществах.", icon: "Trees", priceFrom: "от 540 ₽/м²" },
  { id: "s4", title: "Асфальтирование парковок", description: "Парковки у ТЦ, бизнес-центров, складов с разметкой и водоотводом.", icon: "ParkingSquare", priceFrom: "от 660 ₽/м²" },
  { id: "s5", title: "Асфальтирование территорий", description: "Промышленные и коммерческие площадки любой площади.", icon: "Factory", priceFrom: "от 580 ₽/м²" },
  { id: "s6", title: "Укладка плитки", description: "Тротуарная плитка любых форматов с подготовкой основания.", icon: "Grid3x3", priceFrom: "от 1 350 ₽/м²" },
  { id: "s7", title: "Укладка брусчатки", description: "Гранитная и клинкерная брусчатка — премиальное благоустройство.", icon: "Square", priceFrom: "от 1 950 ₽/м²" },
  { id: "s8", title: "Ямочный ремонт", description: "Локальный ремонт покрытия за 1 день, гарантия на работы.", icon: "Wrench", priceFrom: "от 1 800 ₽/м²" },
  { id: "s9", title: "Асфальтовая крошка", description: "Бюджетное и экологичное покрытие для дорог и площадок.", icon: "Layers", priceFrom: "от 280 ₽/м²" },
  { id: "s10", title: "Комплексное благоустройство", description: "Под ключ: проект, основание, асфальт, бордюры, разметка, газон.", icon: "Sparkles", priceFrom: "по проекту" },
];

const defaultPortfolio: PortfolioItem[] = [
  { id: "p1", title: "ЖК «Зелёная долина»", location: "Москва, ЮЗАО", area: "8 400 м²", image: "https://images.unsplash.com/photo-1601758064955-83ed5cab2d61?w=1200&q=80&auto=format&fit=crop" },
  { id: "p2", title: "Логистический парк", location: "МО, Домодедово", area: "24 000 м²", image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80&auto=format&fit=crop" },
  { id: "p3", title: "СНТ «Берёзка»", location: "МО, Истра", area: "3 200 м²", image: "https://images.unsplash.com/photo-1597247241055-7c01f487d18f?w=1200&q=80&auto=format&fit=crop" },
  { id: "p4", title: "Парковка ТЦ", location: "Москва, СВАО", area: "6 100 м²", image: "https://images.unsplash.com/photo-1545179605-1296651e9d43?w=1200&q=80&auto=format&fit=crop" },
  { id: "p5", title: "Подъезд к складу", location: "МО, Подольск", area: "1 800 м²", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80&auto=format&fit=crop" },
  { id: "p6", title: "Двор ЖК «Парус»", location: "Москва, САО", area: "4 500 м²", image: "https://images.unsplash.com/photo-1564415900645-d4ca6c0c0b15?w=1200&q=80&auto=format&fit=crop" },
];

const defaultReviews: Review[] = [
  { id: "r1", name: "Игорь Воронцов", role: "Главный инженер УК «Северная»", text: "Сделали 6 000 м² дворов ЖК за 9 дней. Чисто, по технологии, документы — комар носа не подточит.", rating: 5 },
  { id: "r2", name: "Елена Шарова", role: "Председатель СНТ «Берёзка»", text: "Цена честная, сроки выдержали, через зиму ни одной трещины. Рекомендую соседям.", rating: 5 },
  { id: "r3", name: "Дмитрий К.", role: "Владелец склада, Подольск", text: "Подъезд под фуры — выдерживает 40 тонн без вопросов. Бригада адекватная, работали ночью без перерыва.", rating: 5 },
  { id: "r4", name: "Анна М.", role: "Управляющая ТЦ", text: "Парковка 6 100 м² с разметкой и ливнёвкой. Сдали раньше срока, гарантия 5 лет — подписали без правок.", rating: 5 },
];

const defaultPrices: PriceRow[] = [
  { id: "pr1", name: "Асфальт, 1 слой (4-5 см)", unit: "м²", price: "от 590 ₽" },
  { id: "pr2", name: "Асфальт, 2 слоя (7-9 см)", unit: "м²", price: "от 890 ₽" },
  { id: "pr3", name: "Асфальтовая крошка", unit: "м²", price: "от 280 ₽" },
  { id: "pr4", name: "Ямочный ремонт", unit: "м²", price: "от 1 800 ₽" },
  { id: "pr5", name: "Тротуарная плитка", unit: "м²", price: "от 1 350 ₽" },
  { id: "pr6", name: "Установка бордюра", unit: "пог. м", price: "от 850 ₽" },
  { id: "pr7", name: "Снятие старого покрытия", unit: "м²", price: "от 180 ₽" },
  { id: "pr8", name: "Выезд инженера и смета", unit: "—", price: "бесплатно" },
];

const defaultHero: HeroContent = {
  badge: "Москва и Московская область",
  titleA: "Асфальтирование дорог и дворов",
  titleAccent: "под ключ",
  subtitle: "Работаем с частными и коммерческими объектами. Собственная техника, материалы по ГОСТ, гарантия до 5 лет.",
  primaryCta: "Рассчитать стоимость",
  secondaryCta: "Бесплатный выезд инженера",
  stat1Value: "12+",
  stat1Label: "лет на рынке",
  stat2Value: "850+",
  stat2Label: "объектов сдано",
  stat3Value: "до 5 лет",
  stat3Label: "гарантия",
};

const defaultContacts: ContactsContent = {
  phone: DEFAULT_PHONE,
  phoneDisplay: DEFAULT_PHONE_DISPLAY,
  address: "г. Москва, МКАД 41 км, БЦ «Технопарк»",
  workHours: "Ежедневно, 8:00–22:00",
  inn: "7700000000",
  company: "МСК АСФАЛЬТ",
};

export const useCms = create<CmsState>()(
  persist(
    (set) => ({
      hero: defaultHero,
      services: defaultServices,
      portfolio: defaultPortfolio,
      reviews: defaultReviews,
      prices: defaultPrices,
      contacts: defaultContacts,

      setHero: (h) => set((s) => ({ hero: { ...s.hero, ...h } })),
      setContacts: (c) => set((s) => ({ contacts: { ...s.contacts, ...c } })),

      upsertService: (item) =>
        set((s) => {
          const idx = s.services.findIndex((x) => x.id === item.id);
          if (idx === -1) return { services: [...s.services, item] };
          const next = [...s.services];
          next[idx] = item;
          return { services: next };
        }),
      removeService: (id) => set((s) => ({ services: s.services.filter((x) => x.id !== id) })),

      upsertPortfolio: (item) =>
        set((s) => {
          const idx = s.portfolio.findIndex((x) => x.id === item.id);
          if (idx === -1) return { portfolio: [...s.portfolio, item] };
          const next = [...s.portfolio];
          next[idx] = item;
          return { portfolio: next };
        }),
      removePortfolio: (id) => set((s) => ({ portfolio: s.portfolio.filter((x) => x.id !== id) })),

      upsertReview: (item) =>
        set((s) => {
          const idx = s.reviews.findIndex((x) => x.id === item.id);
          if (idx === -1) return { reviews: [...s.reviews, item] };
          const next = [...s.reviews];
          next[idx] = item;
          return { reviews: next };
        }),
      removeReview: (id) => set((s) => ({ reviews: s.reviews.filter((x) => x.id !== id) })),

      upsertPrice: (item) =>
        set((s) => {
          const idx = s.prices.findIndex((x) => x.id === item.id);
          if (idx === -1) return { prices: [...s.prices, item] };
          const next = [...s.prices];
          next[idx] = item;
          return { prices: next };
        }),
      removePrice: (id) => set((s) => ({ prices: s.prices.filter((x) => x.id !== id) })),

      reset: () =>
        set({
          hero: defaultHero,
          services: defaultServices,
          portfolio: defaultPortfolio,
          reviews: defaultReviews,
          prices: defaultPrices,
          contacts: defaultContacts,
        }),
    }),
    { name: "msk-asfalt-cms-v1" },
  ),
);

interface AuthState {
  isAuthed: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
}

const ADMIN_USER = "admin";
const ADMIN_PASS = "emin.admin7";

export const useAdminAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthed: false,
      login: (u, p) => {
        const ok = u === ADMIN_USER && p === ADMIN_PASS;
        if (ok) set({ isAuthed: true });
        return ok;
      },
      logout: () => set({ isAuthed: false }),
    }),
    { name: "msk-asfalt-admin-v1" },
  ),
);
