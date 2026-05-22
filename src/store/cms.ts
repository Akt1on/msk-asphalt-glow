import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_PHONE, DEFAULT_PHONE_DISPLAY } from "@/lib/contacts";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceFrom?: string;
  image?: string;
}
export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  area: string;
  image: string;
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
export interface Advantage {
  id: string;
  icon: string;
  title: string;
  text: string;
}
export interface Step {
  id: string;
  icon: string;
  title: string;
  text: string;
}
export interface District {
  id: string;
  name: string;
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
export interface BrandContent {
  name: string;
  tagline: string;
  logoChar: string;
  footerNote: string;
}

interface CmsData {
  brand: BrandContent;
  hero: HeroContent;
  services: Service[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  prices: PriceRow[];
  advantages: Advantage[];
  steps: Step[];
  districts: District[];
  contacts: ContactsContent;
}

interface CmsState extends CmsData {
  loaded: boolean;
  setBrand: (b: Partial<BrandContent>) => void;
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
  upsertAdvantage: (a: Advantage) => void;
  removeAdvantage: (id: string) => void;
  upsertStep: (s: Step) => void;
  removeStep: (id: string) => void;
  upsertDistrict: (d: District) => void;
  removeDistrict: (id: string) => void;
  reset: () => void;
  hydrate: (data: Partial<CmsData>) => void;
}

const defaultServices: Service[] = [
  { id: "s1", title: "Асфальтирование дорог", description: "Магистрали, подъезды, технологические дороги под нагрузку до 40 т.", icon: "Route", priceFrom: "от 590 ₽/м²" },
  { id: "s2", title: "Асфальтирование дворов", description: "Дворовые территории ЖК, ТСЖ и УК — быстро и аккуратно.", icon: "Building2", priceFrom: "от 620 ₽/м²" },
  { id: "s3", title: "Асфальтирование СНТ", description: "Подъездные пути и дороги общего пользования в садовых товариществах.", icon: "Trees", priceFrom: "от 540 ₽/м²" },
  { id: "s4", title: "Асфальтирование парковок", description: "Парковки у ТЦ, БЦ, складов с разметкой и водоотводом.", icon: "ParkingSquare", priceFrom: "от 660 ₽/м²" },
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
const defaultAdvantages: Advantage[] = [
  { id: "a1", icon: "Award", title: "12+ лет опыта", text: "Тысячи квадратных метров покрытий в Москве и МО." },
  { id: "a2", icon: "Clock", title: "Старт от 24 часов", text: "Выезжаем на замер в день обращения, начинаем работы сразу." },
  { id: "a3", icon: "Wallet", title: "Честная смета", text: "Фиксированная цена в договоре, без скрытых доплат." },
  { id: "a4", icon: "Truck", title: "Собственная техника", text: "Катки, асфальтоукладчики, фрезы, самосвалы — всё своё." },
  { id: "a5", icon: "ShieldCheck", title: "Гарантия до 5 лет", text: "Письменная гарантия на работы и материалы по ГОСТ." },
  { id: "a6", icon: "Users", title: "Свои бригады", text: "Опытные мастера в штате, без субподряда." },
];
const defaultSteps: Step[] = [
  { id: "st1", icon: "FileSignature", title: "Заявка и смета", text: "Выезд инженера, замеры, точная смета за 30 минут." },
  { id: "st2", icon: "ClipboardCheck", title: "Договор", text: "Фиксированная цена и сроки в письменном договоре." },
  { id: "st3", icon: "Truck", title: "Подготовка", text: "Снятие старого покрытия, основание, дренаж, бордюры." },
  { id: "st4", icon: "Hammer", title: "Укладка асфальта", text: "Асфальтоукладчик, катки, температурный контроль." },
  { id: "st5", icon: "HardHat", title: "Сдача объекта", text: "Уборка, разметка, акт приёма-передачи работ." },
  { id: "st6", icon: "ShieldCheck", title: "Гарантия", text: "До 5 лет на покрытие, оперативное реагирование по гарантии." },
];
const defaultDistricts: District[] = [
  "Москва (все округа)", "Балашиха", "Химки", "Мытищи", "Королёв",
  "Подольск", "Люберцы", "Красногорск", "Одинцово", "Домодедово",
  "Истра", "Видное", "Реутов", "Долгопрудный", "Щёлково",
  "Пушкино", "Сергиев Посад", "Серпухов", "Ногинск", "Чехов",
].map((name, i) => ({ id: `d${i + 1}`, name }));

const defaultHero: HeroContent = {
  badge: "Москва и Московская область",
  titleA: "Асфальтирование дорог и дворов",
  titleAccent: "под ключ",
  subtitle: "Работаем с частными и коммерческими объектами. Собственная техника, материалы по ГОСТ, гарантия до 5 лет.",
  primaryCta: "Рассчитать стоимость",
  secondaryCta: "Бесплатный выезд инженера",
  stat1Value: "12+", stat1Label: "лет на рынке",
  stat2Value: "850+", stat2Label: "объектов сдано",
  stat3Value: "до 5 лет", stat3Label: "гарантия",
};
const defaultContacts: ContactsContent = {
  phone: DEFAULT_PHONE,
  phoneDisplay: DEFAULT_PHONE_DISPLAY,
  address: "г. Москва, МКАД 41 км, БЦ «Технопарк»",
  workHours: "Ежедневно, 8:00–22:00",
  inn: "7700000000",
  company: "МСК АСФАЛЬТ",
};
const defaultBrand: BrandContent = {
  name: "МСК АСФАЛЬТ",
  tagline: "благоустройство под ключ",
  logoChar: "М",
  footerNote: "Асфальтирование, благоустройство, ремонт покрытий в Москве и Московской области. Собственная техника, гарантия до 5 лет.",
};

const DEFAULTS: CmsData = {
  brand: defaultBrand,
  hero: defaultHero,
  services: defaultServices,
  portfolio: defaultPortfolio,
  reviews: defaultReviews,
  prices: defaultPrices,
  advantages: defaultAdvantages,
  steps: defaultSteps,
  districts: defaultDistricts,
  contacts: defaultContacts,
};

function upsertBy<T extends { id: string }>(arr: T[], item: T): T[] {
  const idx = arr.findIndex((x) => x.id === item.id);
  if (idx === -1) return [...arr, item];
  const next = [...arr];
  next[idx] = item;
  return next;
}

// ---------- persistence ----------
let saveTimer: ReturnType<typeof setTimeout> | null = null;
let suppressSave = false;
let lastSavedJson = "";

function getData(): CmsData {
  const s = useCms.getState();
  return {
    brand: s.brand, hero: s.hero, services: s.services, portfolio: s.portfolio,
    reviews: s.reviews, prices: s.prices, advantages: s.advantages,
    steps: s.steps, districts: s.districts, contacts: s.contacts,
  };
}

async function persist() {
  if (suppressSave) return;
  const data = getData();
  const json = JSON.stringify(data);
  if (json === lastSavedJson) return;
  const { error } = await supabase
    .from("cms_state")
    .upsert({ id: "main", data: data as never }, { onConflict: "id" });
  if (!error) lastSavedJson = json;
  else console.error("[cms] save failed", error);
}

function schedulePersist() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(persist, 350);
}

export const useCms = create<CmsState>()((set) => ({
  ...DEFAULTS,
  loaded: false,

  hydrate: (data) => {
    suppressSave = true;
    set({ ...DEFAULTS, ...data, loaded: true });
    lastSavedJson = JSON.stringify(getData());
    suppressSave = false;
  },

  setBrand: (b) => { set((s) => ({ brand: { ...s.brand, ...b } })); schedulePersist(); },
  setHero: (h) => { set((s) => ({ hero: { ...s.hero, ...h } })); schedulePersist(); },
  setContacts: (c) => { set((s) => ({ contacts: { ...s.contacts, ...c } })); schedulePersist(); },

  upsertService: (i) => { set((s) => ({ services: upsertBy(s.services, i) })); schedulePersist(); },
  removeService: (id) => { set((s) => ({ services: s.services.filter((x) => x.id !== id) })); schedulePersist(); },
  upsertPortfolio: (i) => { set((s) => ({ portfolio: upsertBy(s.portfolio, i) })); schedulePersist(); },
  removePortfolio: (id) => { set((s) => ({ portfolio: s.portfolio.filter((x) => x.id !== id) })); schedulePersist(); },
  upsertReview: (i) => { set((s) => ({ reviews: upsertBy(s.reviews, i) })); schedulePersist(); },
  removeReview: (id) => { set((s) => ({ reviews: s.reviews.filter((x) => x.id !== id) })); schedulePersist(); },
  upsertPrice: (i) => { set((s) => ({ prices: upsertBy(s.prices, i) })); schedulePersist(); },
  removePrice: (id) => { set((s) => ({ prices: s.prices.filter((x) => x.id !== id) })); schedulePersist(); },
  upsertAdvantage: (i) => { set((s) => ({ advantages: upsertBy(s.advantages, i) })); schedulePersist(); },
  removeAdvantage: (id) => { set((s) => ({ advantages: s.advantages.filter((x) => x.id !== id) })); schedulePersist(); },
  upsertStep: (i) => { set((s) => ({ steps: upsertBy(s.steps, i) })); schedulePersist(); },
  removeStep: (id) => { set((s) => ({ steps: s.steps.filter((x) => x.id !== id) })); schedulePersist(); },
  upsertDistrict: (i) => { set((s) => ({ districts: upsertBy(s.districts, i) })); schedulePersist(); },
  removeDistrict: (id) => { set((s) => ({ districts: s.districts.filter((x) => x.id !== id) })); schedulePersist(); },

  reset: () => {
    suppressSave = true;
    set({ ...DEFAULTS });
    suppressSave = false;
    schedulePersist();
  },
}));

// ---------- Bootstrap: load + realtime subscription ----------
let bootstrapped = false;
export async function bootstrapCms() {
  if (bootstrapped) return;
  bootstrapped = true;
  try {
    const { data, error } = await supabase
      .from("cms_state")
      .select("data")
      .eq("id", "main")
      .maybeSingle();
    if (error) {
      console.error("[cms] load failed", error);
      useCms.getState().hydrate({});
      return;
    }
    const remote = (data?.data ?? {}) as Partial<CmsData>;
    useCms.getState().hydrate(remote);

    // If row was empty, seed defaults to DB (best-effort; may fail without admin auth — OK).
    if (!data || Object.keys(remote).length === 0) {
      void supabase
        .from("cms_state")
        .upsert({ id: "main", data: DEFAULTS as never }, { onConflict: "id" });
    }
  } catch (e) {
    console.error("[cms] bootstrap error", e);
    useCms.getState().hydrate({});
  }

  // Realtime: sync changes from other tabs/devices instantly.
  supabase
    .channel("cms_state_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "cms_state", filter: "id=eq.main" },
      (payload) => {
        const next = (payload.new as { data?: Partial<CmsData> } | null)?.data;
        if (!next) return;
        const incoming = JSON.stringify(next);
        if (incoming === JSON.stringify(getData())) return;
        useCms.getState().hydrate(next);
      },
    )
    .subscribe();
}

// ---------- Admin auth (Supabase) ----------
interface AdminAuthState {
  isAuthed: boolean;
  email: string | null;
  ready: boolean;
  setSession: (email: string | null) => void;
}

export const useAdminAuth = create<AdminAuthState>()((set) => ({
  isAuthed: false,
  email: null,
  ready: false,
  setSession: (email) => set({ email, isAuthed: !!email, ready: true }),
}));

let authBootstrapped = false;
export function bootstrapAuth() {
  if (authBootstrapped) return;
  authBootstrapped = true;
  supabase.auth.getSession().then(({ data }) => {
    useAdminAuth.getState().setSession(data.session?.user.email ?? null);
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    useAdminAuth.getState().setSession(session?.user.email ?? null);
  });
}
