import { Link } from "@tanstack/react-router";
import { useCms } from "@/store/cms";
import { maxLink, telLink } from "@/lib/contacts";

export function SiteFooter() {
  const c = useCms((s) => s.contacts);
  return (
    <footer className="bg-foreground text-background py-12 pb-28 lg:pb-12">
      <div className="container-x">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-brand grid place-items-center text-white font-bold">
                М
              </div>
              <div>
                <div className="font-bold">МСК АСФАЛЬТ</div>
                <div className="text-xs opacity-70">благоустройство под ключ</div>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-70 max-w-md">
              Асфальтирование, благоустройство, ремонт покрытий в Москве и Московской области. Собственная техника,
              гарантия до 5 лет.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider opacity-60">Контакты</div>
            <a href={telLink(c.phone)} className="mt-3 block font-semibold">
              {c.phoneDisplay}
            </a>
            <a
              href={maxLink(c.phone)}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-sm opacity-80 hover:opacity-100"
            >
              Написать в MAX
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider opacity-60">Компания</div>
            <div className="mt-3 text-sm opacity-80">{c.company}</div>
            <div className="text-sm opacity-80">ИНН {c.inn}</div>
            <Link to="/admin" className="mt-3 inline-block text-sm opacity-60 hover:opacity-100">
              Админ-панель
            </Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs opacity-60">
          © {new Date().getFullYear()} МСК АСФАЛЬТ. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
