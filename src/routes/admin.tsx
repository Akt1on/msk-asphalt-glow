import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminAuth, useCms } from "@/store/cms";
import { ImageDropzone } from "@/components/admin/ImageDropzone";
import { Toaster, toast } from "sonner";
import { LogOut, Plus, Trash2, Save, Lock, Home, RotateCcw } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-secondary/40">
      <Toaster position="top-center" richColors />
      {isAuthed ? <AdminDashboard /> : <LoginScreen />}
    </div>
  );
}

function LoginScreen() {
  const login = useAdminAuth((s) => s.login);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(u, p)) {
      toast.success("Добро пожаловать");
      navigate({ to: "/admin" });
    } else {
      toast.error("Неверный логин или пароль");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-hero">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md glass rounded-3xl shadow-soft p-8 space-y-5"
      >
        <div className="size-14 rounded-2xl bg-gradient-brand grid place-items-center text-white shadow-glow-green mx-auto">
          <Lock className="size-6" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Вход в админ-панель</h1>
          <p className="text-sm text-muted-foreground mt-1">МСК АСФАЛЬТ — управление контентом</p>
        </div>
        <div className="space-y-3">
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Логин"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="username"
          />
          <input
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Пароль"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-brand text-white py-3 font-semibold shadow-soft hover:shadow-glow-green transition"
        >
          Войти
        </button>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">
          ← на сайт
        </Link>
      </form>
    </div>
  );
}

type Tab = "hero" | "services" | "portfolio" | "reviews" | "prices" | "contacts";

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("hero");
  const logout = useAdminAuth((s) => s.logout);
  const reset = useCms((s) => s.reset);

  const tabs: { id: Tab; label: string }[] = [
    { id: "hero", label: "Hero" },
    { id: "services", label: "Услуги" },
    { id: "portfolio", label: "Портфолио" },
    { id: "reviews", label: "Отзывы" },
    { id: "prices", label: "Цены" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div>
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="container-x py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-gradient-brand grid place-items-center text-white font-bold text-sm">
              М
            </div>
            <div className="font-bold">Админ-панель</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm("Сбросить все данные к исходным?")) {
                  reset();
                  toast.success("Данные сброшены");
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              <RotateCcw className="size-4" /> Сброс
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
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
        {tab === "hero" && <HeroEditor />}
        {tab === "services" && <ServicesEditor />}
        {tab === "portfolio" && <PortfolioEditor />}
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
          className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}
    </label>
  );
}

function Card({ children, title, actions }: { children: React.ReactNode; title?: string; actions?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white border border-border shadow-card p-6">
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          {actions}
        </div>
      )}
      {children}
    </div>
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
    upsert({ id: `s-${Date.now()}`, title: "Новая услуга", description: "Описание", icon: "Sparkles", priceFrom: "" });
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border p-4 space-y-3">
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
