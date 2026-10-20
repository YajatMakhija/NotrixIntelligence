export function PageHeader({
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "paper";
}) {
  return (
    <section className="bg-[var(--paper)] pt-[72px] text-[var(--ink)]">
      <div className="mx-auto max-w-[1520px] px-7 pb-20 pt-[72px] md:px-9 md:pb-28">
        <h1 className="display max-w-[16ch] text-[48px] md:text-[64px] lg:text-[80px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-[36rem] text-[17px] leading-relaxed text-[var(--body)]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
