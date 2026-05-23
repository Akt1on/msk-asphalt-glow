import { Phone, MessageCircle, MapPin, Clock, Building } from "lucide-react";
import { useCms } from "@/store/cms";
import { maxLink, telLink } from "@/lib/contacts";

export function Contacts() {
  const c = useCms((s) => s.contacts);

  return (
    <section id="contacts" className="py-20 sm:py-28 bg-gradient-hero relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 size-[420px] rounded-full bg-[color:var(--brand-sky)] opacity-25 blur-3xl" />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Контакты</p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
              Готовы посчитать <span className="text-gradient-brand">ваш объект?</span>
            </h2>
            <p className="mt-4 text-foreground/75 max-w-xl">
              Позвоните или напишите в MAX — инженер свяжется в течение 10 минут и подготовит смету за 30 минут после
              выезда.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={telLink(c.phone)}
                className="flex items-center gap-4 rounded-3xl bg-white px-6 py-5 shadow-card hover:shadow-soft transition-all"
              >
                <div className="size-12 rounded-2xl bg-gradient-brand grid place-items-center text-white">
                  <Phone className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Телефон</div>
                  <div className="text-lg font-bold">{c.phoneDisplay}</div>
                </div>
              </a>
              <a
                href={maxLink(c.phone)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-3xl bg-white px-6 py-5 shadow-card hover:shadow-soft transition-all"
              >
                <div className="size-12 rounded-2xl bg-gradient-sky grid place-items-center text-white">
                  <MessageCircle className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">MAX мессенджер</div>
                  <div className="text-lg font-bold">Написать в MAX</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass rounded-[36px] p-8 shadow-soft space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="size-5 text-primary mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Адрес офиса</div>
                  <div className="font-semibold">{c.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="size-5 text-primary mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Время работы</div>
                  <div className="font-semibold">{c.workHours}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Building className="size-5 text-primary mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Реквизиты</div>
                  <div className="font-semibold">{c.company}</div>
                  <div className="text-sm text-muted-foreground">ИНН {c.inn}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
