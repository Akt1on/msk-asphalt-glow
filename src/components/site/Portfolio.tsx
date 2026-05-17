import { motion } from "framer-motion";
import { MapPin, Maximize2 } from "lucide-react";
import { useCms } from "@/store/cms";

export function Portfolio() {
  const portfolio = useCms((s) => s.portfolio);

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Портфолио</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Реальные объекты, <span className="text-gradient-sky">которые работают годами</span>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolio.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" /> {p.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize2 className="size-4" /> {p.area}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
