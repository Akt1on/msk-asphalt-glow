const BRANDS = [
  "Пятёрочка",
  "Магнит",
  "Перекрёсток",
  "Лента",
  "Ашан",
  "ВкусВилл",
  "Дикси",
  "Глобус",
  "METRO",
  "О'КЕЙ",
  "Азбука Вкуса",
  "Светофор",
];

export function TrustedBy() {
  const row = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Нам доверяют — крупнейшие сети России"
      className="py-14 sm:py-16 border-y border-border bg-card/40"
    >
      <div className="container-x">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Нам доверяют
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Работаем с крупнейшими сетями <span className="text-gradient-sky">России</span>
          </h2>
        </div>

        <div
          className="relative mt-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max gap-10 sm:gap-14 animate-marquee">
            {row.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="shrink-0 flex items-center justify-center min-w-[140px] sm:min-w-[180px] h-14 sm:h-16 px-5 rounded-2xl bg-background/60 border border-border/60 backdrop-blur-sm transition hover:border-primary/40 hover:bg-background"
              >
                <span className="font-bold text-base sm:text-lg tracking-tight text-foreground/75 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
