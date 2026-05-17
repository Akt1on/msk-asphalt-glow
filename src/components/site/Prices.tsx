import { motion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import { useCms } from "@/store/cms";
import { telLink } from "@/lib/contacts";

export function Prices() {
  const prices = useCms((s) => s.prices);
  const contacts = useCms((s) => s.contacts);

  return (
    <section id="prices" className="py-20 sm:py-28 bg-secondary/50">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Цены</p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
              Прозрачный <span className="text-gradient-brand">прайс</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Финальная цена зависит от объёма, состояния основания и сроков. Точную смету готовим за 30 минут после
              выезда инженера — бесплатно.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground/80">
              {["Договор с фиксированной ценой", "Чеки на материалы", "Акт скрытых работ", "Гарантия до 5 лет"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-gradient-brand grid place-items-center text-white">
                      <Check className="size-3" />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
            <a
              href={telLink(contacts.phone)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-white px-6 py-3 font-semibold shadow-soft hover:shadow-glow-green transition-all"
            >
              <Phone className="size-4" /> Узнать точную цену
            </a>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-card border border-border shadow-card overflow-hidden"
            >
              <div className="grid grid-cols-12 px-6 py-4 bg-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-7">Услуга</div>
                <div className="col-span-2">Ед.</div>
                <div className="col-span-3 text-right">Цена</div>
              </div>
              <ul>
                {prices.map((row) => (
                  <li
                    key={row.id}
                    className="grid grid-cols-12 px-6 py-4 items-center border-t border-border first:border-t-0 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="col-span-7 font-medium">{row.name}</div>
                    <div className="col-span-2 text-muted-foreground">{row.unit}</div>
                    <div className="col-span-3 text-right font-semibold text-foreground">{row.price}</div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
