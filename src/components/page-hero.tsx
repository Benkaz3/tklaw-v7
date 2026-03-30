interface PageHeroProps {
  children?: React.ReactNode;
}

export default function PageHero({ children }: PageHeroProps) {
  return (
    <section
      className="relative h-80 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/practices_hero_bg.webp')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 text-white">{children}</div>
    </section>
  );
}
