import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const districts = [
  "Москва (все округа)", "Балашиха", "Химки", "Мытищи", "Королёв",
  "Подольск", "Люберцы", "Красногорск", "Одинцово", "Домодедово",
  "Истра", "Видное", "Реутов", "Долгопрудный", "Щёлково",
  "Пушкино", "Сергиев Посад", "Серпухов", "Ногинск", "Чехов",
];

export function Geography() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">География</p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
              Работаем по <span className="text-gradient-brand">Москве и МО</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Выезжаем на объект в любой район в радиусе 200 км от МКАД. Логистика отлажена, техника всегда в работе.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {districts.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
                  className="rounded-2xl glass px-4 py-3 flex items-center gap-2 text-sm font-medium"
                >
                  <MapPin className="size-4 text-primary flex-shrink-0" />
                  <span className="truncate">{d}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
