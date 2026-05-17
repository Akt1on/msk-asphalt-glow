import { motion } from "framer-motion";
import { Award, Clock, Wallet, Truck, ShieldCheck, Users } from "lucide-react";

const items = [
  { icon: Award, title: "12+ лет опыта", text: "Тысячи квадратных метров покрытий в Москве и МО." },
  { icon: Clock, title: "Старт от 24 часов", text: "Выезжаем на замер в день обращения, начинаем работы сразу." },
  { icon: Wallet, title: "Честная смета", text: "Фиксированная цена в договоре, без скрытых доплат." },
  { icon: Truck, title: "Собственная техника", text: "Катки, асфальтоукладчики, фрезы, самосвалы — всё своё." },
  { icon: ShieldCheck, title: "Гарантия до 5 лет", text: "Письменная гарантия на работы и материалы по ГОСТ." },
  { icon: Users, title: "Свои бригады", text: "Опытные мастера в штате, без субподряда." },
];

export function Advantages() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Преимущества</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Почему нам доверяют <span className="text-gradient-sky">крупные объекты</span>
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-3xl bg-card border border-border p-7 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className="size-12 rounded-2xl bg-gradient-brand-soft grid place-items-center text-white shadow-soft">
                <it.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-muted-foreground">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
