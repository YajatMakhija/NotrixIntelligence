import Image from "next/image";

export function ProductMockup() {
  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--line)] bg-black">
      <Image
        src="/company-brain-product.png"
        alt="Company Brain answering a deployment question inside Slack, shown on a laptop."
        width={1024}
        height={708}
        sizes="(min-width: 1180px) 1180px, 100vw"
        className="h-auto w-full"
      />
    </figure>
  );
}
