import Link from "next/link";
import { LogoMark } from "./LogoMark";

export function SmallHeader({ title }: { title: string }) {
  return (
    <header className="smallHeader">
      <Link href="/" aria-label="Voltar">‹</Link>
      <strong>{title}</strong>
      <span>•••</span>
    </header>
  );
}

export function BrandHeader() {
  return (
    <section className="brandHeader">
      <LogoMark size={98} />
      <h1><span>Conecta</span> <em>Axé</em></h1>
      <p>O app para descobrir macumbas,<br />casas e pessoas perto de você.</p>
    </section>
  );
}
