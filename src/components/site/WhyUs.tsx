import { motion } from "framer-motion";
import { FileSignature, Truck, HardHat, Hammer, ClipboardCheck, ShieldCheck } from "lucide-react";

const steps = [
  { icon: FileSignature, title: "Заявка и смета", text: "Выезд инженера, замеры, точная смета за 30 минут." },
  { icon: ClipboardCheck, title: "Договор", text: "Фиксированная цена и сроки в письменном договоре." },
  { icon: Truck, title: "Подготовка", text: "Снятие старого покрытия, основание, дренаж, бордюры." },
  { icon: Hammer, title: "Укладка асфальта", text: "Асфальтоукладчик, катки, температурный контроль." },
  { icon: HardHat, title: "Сдача объекта", text: "Уборка, разметка, акт приёма-передачи работ." },
  { icon: ShieldCheck, title: "Гарантия", text: "До 5 лет на покрытие, оперативное реагирование по гарантии." },
];

export function WhyUs() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/50">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Как мы работаем</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            6 шагов <span className="text-gradient-sky">до готового покрытия</span>
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative rounded-3xl bg-card border border-border p-7 shadow-card overflow-hidden"
            >
              <div className="absolute top-5 right-6 text-6xl font-extrabold text-primary/10 leading-none">
                0{i + 1}
              </div>
              <div className="size-12 rounded-2xl bg-gradient-brand grid place-items-center text-white shadow-glow-green">
                <s.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
