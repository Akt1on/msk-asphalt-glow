import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { useCms } from "@/store/cms";
import { maxLink, telLink } from "@/lib/contacts";

export function Hero() {
  const hero = useCms((s) => s.hero);
  const contacts = useCms((s) => s.contacts);

  return (
    <section className="relative min-h-[100svh] pt-28 pb-20 overflow-hidden bg-gradient-hero">
      {/* atmospheric lighting */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[color:var(--brand-mint)] opacity-60 blur-[120px] animate-float" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 size-[560px] rounded-full bg-[color:var(--brand-sky)] opacity-35 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 size-[360px] -translate-x-1/2 rounded-full bg-[color:var(--brand-green)] opacity-25 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-foreground/80"
            >
              <span className="size-2 rounded-full bg-primary animate-pulse-glow" />
              {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] text-foreground"
            >
              {hero.titleA}
              <br />
              <span
                className="text-transparent bg-clip-text animate-shine"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, #21A038 0%, #7CEB8A 25%, #0098F8 50%, #7CEB8A 75%, #21A038 100%)",
                  filter: "drop-shadow(0 10px 30px color-mix(in oklab, #21A038 35%, transparent))",
                }}
              >
                {hero.titleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg sm:text-xl text-foreground/75 max-w-2xl"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href={telLink(contacts.phone)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-white px-7 py-4 text-base font-semibold shadow-soft hover:shadow-glow-green hover:-translate-y-0.5 transition-all"
              >
                <Phone className="size-5" />
                Позвонить
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={maxLink(contacts.phone)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full glass text-foreground px-7 py-4 text-base font-semibold hover:bg-white transition-all"
              >
                <MessageCircle className="size-5 text-primary" />
                Написать в MAX
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4 max-w-xl"
            >
              {[
                { v: hero.stat1Value, l: hero.stat1Label },
                { v: hero.stat2Value, l: hero.stat2Label },
                { v: hero.stat3Value, l: hero.stat3Label },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">{s.v}</div>
                  <div className="text-xs sm:text-sm text-foreground/60 mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative animate-float">
              <div className="glass rounded-[36px] p-7 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="size-14 rounded-2xl bg-gradient-brand grid place-items-center text-white shadow-glow-green">
                    <ShieldCheck className="size-7" />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight">Договор и гарантия</div>
                    <div className="text-sm text-muted-foreground">Фиксируем смету и сроки. Гарантия до 5 лет.</div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { k: "Смета", v: "за 30 мин" },
                    { k: "Старт работ", v: "от 24 ч" },
                    { k: "Техника", v: "своя" },
                    { k: "Материалы", v: "ГОСТ" },
                  ].map((b) => (
                    <div key={b.k} className="rounded-2xl bg-white/70 backdrop-blur px-4 py-3 border border-white/60">
                      <div className="text-xs text-muted-foreground">{b.k}</div>
                      <div className="text-base font-semibold">{b.v}</div>
                    </div>
                  ))}
                </div>
                <a
                  href={telLink(contacts.phone)}
                  className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-brand text-white px-5 py-4"
                >
                  <span className="font-semibold">{contacts.phoneDisplay}</span>
                  <Phone className="size-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
