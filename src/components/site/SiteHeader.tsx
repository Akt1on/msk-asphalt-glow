import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCms } from "@/store/cms";
import { maxLink, telLink } from "@/lib/contacts";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export function SiteHeader() {
  const contacts = useCms((s) => s.contacts);
  const brand = useCms((s) => s.brand);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-3 left-0 right-0 z-50"
    >
      <div className="container-x">
        <div className="glass rounded-full shadow-card px-4 py-2.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="size-10 rounded-full bg-gradient-brand grid place-items-center text-white font-bold text-lg shadow-soft">
              {brand.logoChar}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight text-foreground">{brand.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:block">
                {brand.tagline}
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground/80">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telLink(contacts.phone)}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <Phone className="size-4" />
              {contacts.phoneDisplay}
            </a>
            <a
              aria-label="Позвонить"
              href={telLink(contacts.phone)}
              className="md:hidden grid place-items-center size-10 rounded-full bg-gradient-brand text-white shadow-soft"
            >
              <Phone className="size-4" />
            </a>
            <button
              aria-label="Меню"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center size-10 rounded-full bg-white border border-border text-foreground shadow-sm"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <a
              href={maxLink(contacts.phone)}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-brand text-white px-5 py-2.5 text-sm font-semibold shadow-soft hover:shadow-glow-green transition-all"
            >
              <MessageCircle className="size-4" />
              Написать в MAX
            </a>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 rounded-3xl p-4 shadow-soft border border-border bg-card"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-2xl hover:bg-secondary text-foreground font-semibold"
                  >
                    {n.label}
                  </a>
                ))}
                <a
                  href={maxLink(contacts.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-white px-5 py-3 font-semibold"
                >
                  <MessageCircle className="size-4" />
                  Написать в MAX
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
