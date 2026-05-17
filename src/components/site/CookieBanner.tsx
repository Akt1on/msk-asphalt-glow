import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "cookie-ack-v1";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);
  const accept = () => {
    localStorage.setItem(KEY, "1");
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-x-3 bottom-3 z-[60] sm:bottom-5 sm:inset-x-5"
        >
          <div className="mx-auto max-w-3xl glass rounded-3xl shadow-soft p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="size-10 rounded-2xl bg-gradient-brand grid place-items-center text-white shrink-0">
                <Cookie className="size-5" />
              </div>
              <p className="text-sm text-foreground/80">
                Мы используем cookies для корректной работы сайта и улучшения сервиса. Продолжая, вы соглашаетесь с
                нашей политикой.
              </p>
            </div>
            <button
              onClick={accept}
              className="self-stretch sm:self-auto inline-flex items-center justify-center rounded-full bg-gradient-brand text-white px-6 py-3 text-sm font-semibold shadow-soft"
            >
              Принять
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
