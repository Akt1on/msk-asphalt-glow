import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useCms } from "@/store/cms";

export function Reviews() {
  const reviews = useCms((s) => s.reviews);

  return (
    <section id="reviews" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Отзывы</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Что говорят <span className="text-gradient-brand">наши заказчики</span>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="relative rounded-3xl bg-card border border-border p-7 shadow-card"
            >
              <Quote className="absolute top-6 right-6 size-10 text-primary/15" />
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="size-4 text-[color:var(--brand-sun)] fill-[color:var(--brand-sun)]" />
                ))}
              </div>
              <p className="mt-4 text-foreground/85 leading-relaxed">«{r.text}»</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-11 rounded-full bg-gradient-brand grid place-items-center text-white font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
