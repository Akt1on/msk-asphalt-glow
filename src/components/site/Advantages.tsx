import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useCms } from "@/store/cms";

export function Advantages() {
  const items = useCms((s) => s.advantages);
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Преимущества</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Почему нам доверяют <span className="text-gradient-sky">крупные объекты</span>
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = (Icons as any)[it.icon] ?? Icons.Sparkles;
            return (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-3xl bg-card border border-border p-7 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all"
              >
                <div className="size-12 rounded-2xl bg-gradient-brand-soft grid place-items-center text-white shadow-soft">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">{it.title}</h3>
                <p className="mt-2 text-muted-foreground">{it.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
