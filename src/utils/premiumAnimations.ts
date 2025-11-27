// Premium Animation System - Apple/Nothing/Tesla inspired
// Единая система анимаций для цифровой роскоши

export const premiumEasing = [0.16, 1, 0.3, 1] as const;

// Анимация появления из глубины (как под стеклянным куполом)
export const glassEmergence = {
  initial: { 
    opacity: 0, 
    y: 10, 
    scale: 0.985,
    filter: "blur(4px)"
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)"
  },
  transition: { 
    duration: 0.8, 
    ease: premiumEasing 
  }
};

// Breathing glow для заголовков (2% пульсация, 3.8s)
export const breathingGlow = {
  animate: {
    filter: [
      "drop-shadow(0 0 20px rgba(168,85,247,0.25)) drop-shadow(0 0 40px rgba(168,85,247,0.1))",
      "drop-shadow(0 0 24px rgba(168,85,247,0.3)) drop-shadow(0 0 48px rgba(168,85,247,0.12))",
      "drop-shadow(0 0 20px rgba(168,85,247,0.25)) drop-shadow(0 0 40px rgba(168,85,247,0.1))"
    ]
  },
  transition: { 
    duration: 3.8, 
    repeat: Infinity, 
    ease: "easeInOut" 
  }
};

// Премиальный стеклянный стиль для карточек/бейджей
export const glassStyle = {
  base: "backdrop-blur-xl bg-black/[0.35] border border-white/[0.08]",
  shadow: "shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)]",
  noise: "relative before:absolute before:inset-0 before:opacity-[0.015] before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]",
  hover: "hover:bg-black/[0.42] hover:border-white/[0.12] hover:shadow-[0_12px_24px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.12)]"
};

// Премиальный градиент для текста (фиолетово-пурпурный)
export const premiumGradientText = "bg-gradient-to-r from-slate-100 via-primary to-accent bg-clip-text text-transparent";

// Внутреннее свечение для элементов (без пересветов)
export const innerGlow = "shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_0_20px_rgba(168,85,247,0.05)]";

// Hover-состояния кнопок с единой физикой
export const buttonGlassHover = {
  scale: 1.01,
  boxShadow: "0 12px 24px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.12), 0 0 30px rgba(168,85,247,0.15)",
  transition: { duration: 0.3, ease: premiumEasing }
};

// Задержки для последовательного появления элементов
export const staggerDelay = (index: number, base: number = 0.1) => index * base;
