import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useCms } from "@/store/cms";

export function WhyUs() {
  const steps = useCms((s) => s.steps);
  return (
    <section className="py-20 sm:py-28 bg-secondary/50">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Как мы работаем</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Шаги <span className="text-gradient-sky">до готового покрытия</span>
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => {
            const Icon = (Icons as any)[s.icon] ?? Icons.Sparkles;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative rounded-3xl bg-card border border-border p-7 shadow-card overflow-hidden"
              >
                <div className="absolute top-5 right-6 text-6xl font-extrabold text-primary/10 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="size-12 rounded-2xl bg-gradient-brand grid place-items-center text-white shadow-glow-green">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
