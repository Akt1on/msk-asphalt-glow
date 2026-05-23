// Стилизованные знаки крупнейших ритейл-сетей РФ.
// Использованы фирменные цвета и формы — без копирования официальных логотипов.

type Brand = {
  name: string;
  render: () => JSX.Element;
};

const BRANDS: Brand[] = [
  {
    name: "Пятёрочка",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="relative w-9 h-9 rounded-full bg-[#E1051E] flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-lg leading-none">5</span>
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-[#E1051E]">
          Пятёрочка
        </span>
      </div>
    ),
  },
  {
    name: "Магнит",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-md bg-[#E2001A] flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-base leading-none">М</span>
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-[#E2001A]">
          магнит
        </span>
      </div>
    ),
  },
  {
    name: "Перекрёсток",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#00A651] flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-base leading-none">+</span>
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-[#00733E]">
          Перекрёсток
        </span>
      </div>
    ),
  },
  {
    name: "Лента",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="px-2.5 h-9 rounded-md bg-[#0033A0] flex items-center shadow-sm">
          <span className="text-white font-black text-[15px] tracking-wider leading-none">
            ЛЕНТА
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "Ашан",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#E2001A] flex items-center justify-center shadow-sm">
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-[#E2001A]">
          AUCHAN
        </span>
      </div>
    ),
  },
  {
    name: "ВкусВилл",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#7AB800] flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-base leading-none">В</span>
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-[#5A8A00]">
          ВкусВилл
        </span>
      </div>
    ),
  },
  {
    name: "Дикси",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="px-2.5 h-9 rounded-md bg-[#E2001A] flex items-center shadow-sm">
          <span className="text-white font-black text-[15px] tracking-wider leading-none">
            ДИКСИ
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "Глобус",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#F39200] flex items-center justify-center shadow-sm">
          <div className="w-5 h-5 rounded-full border-2 border-white" />
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-[#F39200]">
          Globus
        </span>
      </div>
    ),
  },
  {
    name: "METRO",
    render: () => (
      <div className="px-2.5 h-9 rounded-md bg-[#FFCC00] flex items-center shadow-sm">
        <span className="text-[#003D7C] font-black text-[15px] tracking-wider leading-none">
          METRO
        </span>
      </div>
    ),
  },
  {
    name: "О'КЕЙ",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#E30613] flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-base leading-none">O</span>
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-[#E30613]">
          О'КЕЙ
        </span>
      </div>
    ),
  },
  {
    name: "Азбука Вкуса",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-md bg-[#1A1A1A] flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-base leading-none">А</span>
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-foreground leading-tight">
          Азбука<br />Вкуса
        </span>
      </div>
    ),
  },
  {
    name: "Светофор",
    render: () => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-md flex flex-col justify-between p-1 bg-[#1A1A1A] shadow-sm">
          <div className="w-full h-1.5 rounded-full bg-[#E2001A]" />
          <div className="w-full h-1.5 rounded-full bg-[#FFCC00]" />
          <div className="w-full h-1.5 rounded-full bg-[#00A651]" />
        </div>
        <span className="font-extrabold text-[15px] tracking-tight text-foreground">
          Светофор
        </span>
      </div>
    ),
  },
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
          <div className="flex w-max gap-6 sm:gap-8 animate-marquee">
            {row.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="shrink-0 flex items-center justify-center min-w-[180px] sm:min-w-[200px] h-20 px-5 rounded-2xl bg-background border border-border/60 shadow-sm transition hover:border-primary/40 hover:shadow-md"
                title={brand.name}
              >
                {brand.render()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
