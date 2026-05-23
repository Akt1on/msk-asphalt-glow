import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminAuth, useCms } from "@/store/cms";
import { supabase } from "@/integrations/supabase/client";
import { ImageDropzone } from "@/components/admin/ImageDropzone";
import { Toaster, toast } from "sonner";
import { LogOut, Plus, Trash2, Save, Lock, Home, RotateCcw, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Админ-панель — МСК АСФАЛЬТ" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const isAuthed = useAdminAuth((s) => s.isAuthed);
  const ready = useAdminAuth((s) => s.ready);
  return (
    <div className="min-h-screen bg-secondary/40">
      <Toaster position="top-center" richColors />
      {!ready ? (
        <div className="min-h-screen grid place-items-center text-muted-foreground">Загрузка…</div>
      ) : isAuthed ? (
        <AdminDashboard />
      ) : (
        <LoginScreen />
      )}
    </div>
  );
}

// Fixed admin credentials → mapped to a hidden Supabase auth user
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "emin.admin07";
const ADMIN_EMAIL = "admin@msk-asfalt.local";

function LoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const l = login.trim().toLowerCase();
    if (l !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
      toast.error("Неверный логин или пароль");
      return;
    }
    setBusy(true);
    try {
      // Try sign-in; if user doesn't exist yet — create it, then sign in.
      let { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      if (error) {
        const { error: signUpErr } = await supabase.auth.signUp({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (signUpErr && !/registered/i.test(signUpErr.message)) throw signUpErr;
        ({ error } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        }));
        if (error) throw error;
      }
      toast.success("Добро пожаловать");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-hero">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl shadow-soft p-8 space-y-5 bg-card border border-border"
      >
        <div className="size-14 rounded-2xl bg-gradient-brand grid place-items-center text-white shadow-glow-green mx-auto">
          <Lock className="size-6" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Вход в админ-панель</h1>
          <p className="text-sm text-muted-foreground mt-1">МСК АСФАЛЬТ — управление контентом</p>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="username"
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full rounded-2xl border border-border bg-background pl-4 pr-12 py-3 font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Показать пароль"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-gradient-brand text-white py-3 font-semibold shadow-soft hover:shadow-glow-green transition disabled:opacity-60"
        >
          {busy ? "…" : "Войти"}
        </button>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">
          ← на сайт
        </Link>
      </form>
    </div>
  );
}

type Tab = "brand" | "hero" | "services" | "portfolio" | "advantages" | "steps" | "districts" | "reviews" | "prices" | "contacts";

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("brand");
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const reset = useCms((s) => s.reset);

  const tabs: { id: Tab; label: string }[] = [
    { id: "brand", label: "Бренд" },
    { id: "hero", label: "Hero" },
    { id: "services", label: "Услуги" },
    { id: "portfolio", label: "Портфолио" },
    { id: "advantages", label: "Преимущества" },
    { id: "steps", label: "Шаги работы" },
    { id: "districts", label: "География" },
    { id: "reviews", label: "Отзывы" },
    { id: "prices", label: "Цены" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div>
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="container-x py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-gradient-brand grid place-items-center text-white font-bold text-sm">
              М
            </div>
            <div className="font-bold text-foreground">Админ-панель</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm("Сбросить все данные к исходным?")) {
                  reset();
                  toast.success("Данные сброшены");
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium hover:bg-secondary text-foreground"
            >
              <RotateCcw className="size-4" /> Сброс
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium hover:bg-secondary text-foreground"
            >
              <Home className="size-4" /> Сайт
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3 py-2 text-sm font-medium"
            >
              <LogOut className="size-4" /> Выйти
            </button>
          </div>
        </div>
        <div className="container-x pb-3">
          <div className="flex gap-1 overflow-x-auto -mx-1 px-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === t.id
                    ? "bg-gradient-brand text-white shadow-soft"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container-x py-8">
        {tab === "brand" && <BrandEditor />}
        {tab === "hero" && <HeroEditor />}
        {tab === "services" && <ServicesEditor />}
        {tab === "portfolio" && <PortfolioEditor />}
        {tab === "advantages" && <AdvantagesEditor />}
        {tab === "steps" && <StepsEditor />}
        {tab === "districts" && <DistrictsEditor />}
        {tab === "reviews" && <ReviewsEditor />}
        {tab === "prices" && <PricesEditor />}
        {tab === "contacts" && <ContactsEditor />}
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}
    </label>
  );
}

function Card({ children, title, actions }: { children: React.ReactNode; title?: string; actions?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-card p-6">
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          {title && <h3 className="font-bold text-lg text-foreground">{title}</h3>}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

function BrandEditor() {
  const brand = useCms((s) => s.brand);
  const setBrand = useCms((s) => s.setBrand);
  return (
    <Card title="Брендинг">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Название" value={brand.name} onChange={(v) => setBrand({ name: v })} />
        <Field label="Слоган" value={brand.tagline} onChange={(v) => setBrand({ tagline: v })} />
        <Field label="Буква логотипа" value={brand.logoChar} onChange={(v) => setBrand({ logoChar: v.slice(0, 2) })} />
        <div className="sm:col-span-2">
          <Field label="Текст в подвале" value={brand.footerNote} onChange={(v) => setBrand({ footerNote: v })} textarea />
        </div>
      </div>
    </Card>
  );
}

function HeroEditor() {
  const hero = useCms((s) => s.hero);
  const setHero = useCms((s) => s.setHero);
  return (
    <Card title="Hero секция">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Бейдж" value={hero.badge} onChange={(v) => setHero({ badge: v })} />
        <Field label="Заголовок (основной)" value={hero.titleA} onChange={(v) => setHero({ titleA: v })} />
        <Field label="Акцент (градиент)" value={hero.titleAccent} onChange={(v) => setHero({ titleAccent: v })} />
        <div className="sm:col-span-2">
          <Field label="Подзаголовок" value={hero.subtitle} onChange={(v) => setHero({ subtitle: v })} textarea />
        </div>
        <Field label="Кнопка 1" value={hero.primaryCta} onChange={(v) => setHero({ primaryCta: v })} />
        <Field label="Кнопка 2" value={hero.secondaryCta} onChange={(v) => setHero({ secondaryCta: v })} />
        <Field label="Метрика 1" value={hero.stat1Value} onChange={(v) => setHero({ stat1Value: v })} />
        <Field label="Подпись 1" value={hero.stat1Label} onChange={(v) => setHero({ stat1Label: v })} />
        <Field label="Метрика 2" value={hero.stat2Value} onChange={(v) => setHero({ stat2Value: v })} />
        <Field label="Подпись 2" value={hero.stat2Label} onChange={(v) => setHero({ stat2Label: v })} />
        <Field label="Метрика 3" value={hero.stat3Value} onChange={(v) => setHero({ stat3Value: v })} />
        <Field label="Подпись 3" value={hero.stat3Label} onChange={(v) => setHero({ stat3Label: v })} />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Изменения сохраняются автоматически.</p>
    </Card>
  );
}

function ContactsEditor() {
  const c = useCms((s) => s.contacts);
  const set = useCms((s) => s.setContacts);
  return (
    <Card title="Контакты">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Телефон (для ссылки)" value={c.phone} onChange={(v) => set({ phone: v })} />
        <Field label="Телефон (отображение)" value={c.phoneDisplay} onChange={(v) => set({ phoneDisplay: v })} />
        <Field label="Компания" value={c.company} onChange={(v) => set({ company: v })} />
        <Field label="ИНН" value={c.inn} onChange={(v) => set({ inn: v })} />
        <Field label="Время работы" value={c.workHours} onChange={(v) => set({ workHours: v })} />
        <Field label="Адрес" value={c.address} onChange={(v) => set({ address: v })} />
      </div>
    </Card>
  );
}

function ServicesEditor() {
  const services = useCms((s) => s.services);
  const upsert = useCms((s) => s.upsertService);
  const remove = useCms((s) => s.removeService);
  const add = () =>
    upsert({ id: `s-${Date.now()}`, title: "Новая услуга", description: "Описание", icon: "Sparkles", priceFrom: "", image: "" });
  return (
    <div className="space-y-4">
      <Card
        title={`Услуги (${services.length})`}
        actions={
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-white px-4 py-2 text-sm font-semibold"
          >
            <Plus className="size-4" /> Добавить
          </button>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border p-4 space-y-3">
              <ImageDropzone value={s.image} onChange={(v) => upsert({ ...s, image: v })} />
              <Field label="Название" value={s.title} onChange={(v) => upsert({ ...s, title: v })} />
              <Field label="Описание" value={s.description} onChange={(v) => upsert({ ...s, description: v })} textarea />
              <div className="grid grid-cols-2 gap-2">
                <Field label="Иконка (lucide)" value={s.icon} onChange={(v) => upsert({ ...s, icon: v })} />
                <Field label="Цена от" value={s.priceFrom ?? ""} onChange={(v) => upsert({ ...s, priceFrom: v })} />
              </div>
              <button
                onClick={() => remove(s.id)}
                className="inline-flex items-center gap-1.5 text-sm text-destructive font-medium"
              >
                <Trash2 className="size-4" /> Удалить
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PortfolioEditor() {
  const items = useCms((s) => s.portfolio);
  const upsert = useCms((s) => s.upsertPortfolio);
  const remove = useCms((s) => s.removePortfolio);
  const add = () =>
    upsert({ id: `p-${Date.now()}`, title: "Новый объект", location: "Москва", area: "1 000 м²", image: "" });
  return (
    <Card
      title={`Портфолио (${items.length})`}
      actions={
        <button
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-white px-4 py-2 text-sm font-semibold"
        >
          <Plus className="size-4" /> Добавить
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border p-4 space-y-3">
            <ImageDropzone value={p.image} onChange={(v) => upsert({ ...p, image: v })} />
            <Field label="Название" value={p.title} onChange={(v) => upsert({ ...p, title: v })} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Локация" value={p.location} onChange={(v) => upsert({ ...p, location: v })} />
              <Field label="Площадь" value={p.area} onChange={(v) => upsert({ ...p, area: v })} />
            </div>
            <button
              onClick={() => remove(p.id)}
              className="inline-flex items-center gap-1.5 text-sm text-destructive font-medium"
            >
              <Trash2 className="size-4" /> Удалить
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdvantagesEditor() {
  const items = useCms((s) => s.advantages);
  const upsert = useCms((s) => s.upsertAdvantage);
  const remove = useCms((s) => s.removeAdvantage);
  const add = () => upsert({ id: `a-${Date.now()}`, icon: "Sparkles", title: "Преимущество", text: "Описание" });
  return (
    <Card
      title={`Преимущества (${items.length})`}
      actions={
        <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-white px-4 py-2 text-sm font-semibold">
          <Plus className="size-4" /> Добавить
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((a) => (
          <div key={a.id} className="rounded-2xl border border-border p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Иконка (lucide)" value={a.icon} onChange={(v) => upsert({ ...a, icon: v })} />
              <Field label="Заголовок" value={a.title} onChange={(v) => upsert({ ...a, title: v })} />
            </div>
            <Field label="Текст" value={a.text} onChange={(v) => upsert({ ...a, text: v })} textarea />
            <button onClick={() => remove(a.id)} className="inline-flex items-center gap-1.5 text-sm text-destructive font-medium">
              <Trash2 className="size-4" /> Удалить
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StepsEditor() {
  const items = useCms((s) => s.steps);
  const upsert = useCms((s) => s.upsertStep);
  const remove = useCms((s) => s.removeStep);
  const add = () => upsert({ id: `st-${Date.now()}`, icon: "Sparkles", title: "Шаг", text: "Описание" });
  return (
    <Card
      title={`Шаги работы (${items.length})`}
      actions={
        <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-white px-4 py-2 text-sm font-semibold">
          <Plus className="size-4" /> Добавить
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Иконка (lucide)" value={s.icon} onChange={(v) => upsert({ ...s, icon: v })} />
              <Field label="Заголовок" value={s.title} onChange={(v) => upsert({ ...s, title: v })} />
            </div>
            <Field label="Текст" value={s.text} onChange={(v) => upsert({ ...s, text: v })} textarea />
            <button onClick={() => remove(s.id)} className="inline-flex items-center gap-1.5 text-sm text-destructive font-medium">
              <Trash2 className="size-4" /> Удалить
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DistrictsEditor() {
  const items = useCms((s) => s.districts);
  const upsert = useCms((s) => s.upsertDistrict);
  const remove = useCms((s) => s.removeDistrict);
  const add = () => upsert({ id: `d-${Date.now()}`, name: "Новый район" });
  return (
    <Card
      title={`География (${items.length})`}
      actions={
        <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-white px-4 py-2 text-sm font-semibold">
          <Plus className="size-4" /> Добавить
        </button>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((d) => (
          <div key={d.id} className="rounded-2xl border border-border p-3 flex items-center gap-2">
            <input
              value={d.name}
              onChange={(e) => upsert({ ...d, name: e.target.value })}
              className="flex-1 min-w-0 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={() => remove(d.id)} className="size-9 shrink-0 rounded-xl bg-destructive/10 text-destructive grid place-items-center">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReviewsEditor() {
  const items = useCms((s) => s.reviews);
  const upsert = useCms((s) => s.upsertReview);
  const remove = useCms((s) => s.removeReview);
  const add = () =>
    upsert({ id: `r-${Date.now()}`, name: "Новый отзыв", role: "Клиент", text: "Текст отзыва", rating: 5 });
  return (
    <Card
      title={`Отзывы (${items.length})`}
      actions={
        <button
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-white px-4 py-2 text-sm font-semibold"
        >
          <Plus className="size-4" /> Добавить
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border p-4 space-y-3">
            <Field label="Имя" value={r.name} onChange={(v) => upsert({ ...r, name: v })} />
            <Field label="Должность" value={r.role} onChange={(v) => upsert({ ...r, role: v })} />
            <Field label="Текст" value={r.text} onChange={(v) => upsert({ ...r, text: v })} textarea />
            <Field
              label="Рейтинг (1-5)"
              value={String(r.rating)}
              onChange={(v) => upsert({ ...r, rating: Math.min(5, Math.max(1, Number(v) || 5)) })}
            />
            <button
              onClick={() => remove(r.id)}
              className="inline-flex items-center gap-1.5 text-sm text-destructive font-medium"
            >
              <Trash2 className="size-4" /> Удалить
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PricesEditor() {
  const items = useCms((s) => s.prices);
  const upsert = useCms((s) => s.upsertPrice);
  const remove = useCms((s) => s.removePrice);
  const add = () => upsert({ id: `pr-${Date.now()}`, name: "Новая позиция", unit: "м²", price: "от 0 ₽" });
  return (
    <Card
      title={`Прайс (${items.length})`}
      actions={
        <button
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-white px-4 py-2 text-sm font-semibold"
        >
          <Plus className="size-4" /> Добавить
        </button>
      }
    >
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="grid grid-cols-12 gap-3 items-end rounded-2xl border border-border p-3">
            <div className="col-span-12 sm:col-span-6">
              <Field label="Услуга" value={p.name} onChange={(v) => upsert({ ...p, name: v })} />
            </div>
            <div className="col-span-5 sm:col-span-2">
              <Field label="Ед." value={p.unit} onChange={(v) => upsert({ ...p, unit: v })} />
            </div>
            <div className="col-span-5 sm:col-span-3">
              <Field label="Цена" value={p.price} onChange={(v) => upsert({ ...p, price: v })} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <button
                onClick={() => remove(p.id)}
                className="size-10 rounded-2xl bg-destructive/10 text-destructive grid place-items-center"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-1.5">
        <Save className="size-3" /> Все изменения сохраняются автоматически в браузере.
      </p>
    </Card>
  );
}
