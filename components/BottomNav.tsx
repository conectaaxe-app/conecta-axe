import Link from "next/link";

const items = [
  { href: "/feed", label: "Início", icon: "⌂" },
  { href: "/mapa", label: "Mapa", icon: "⌖" },
  { href: "/cadastro", label: "Publicar", icon: "+" },
  { href: "/admin", label: "Notificações", icon: "⌁" },
  { href: "/perfil", label: "Perfil", icon: "●" }
];

export function BottomNav() {
  return (
    <nav className="bottomNav">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={item.label === "Publicar" ? "navItem navPlus" : "navItem"}>
          <span>{item.icon}</span>
          <small>{item.label}</small>
        </Link>
      ))}
    </nav>
  );
}
