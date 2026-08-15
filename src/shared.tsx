export const whatsappNumber = "5564992446709";

export function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { label: "Sobre nós", href: "/#sobre" },
  { label: "Eventos", href: "/#eventos" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Parceiros", href: "/#parceiros" },
];

export function WhatsAppLink({ className, children, message }: { className: string; children: React.ReactNode; message: string }) {
  return (
    <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`fixed inset-x-0 top-0 z-20 ${dark ? "" : ""}`}>
      <div className="flex items-center justify-between px-6 py-4 sm:px-10">
        <a href="/" className="font-display text-sm font-bold tracking-wide text-white drop-shadow sm:text-base">
          Estância Recanto de Paz
        </a>
        <WhatsAppLink
          message="Olá! Gostaria de saber mais sobre a Estância Recanto de Paz (locação / eventos)."
          className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-primary-dark shadow backdrop-blur transition hover:bg-white sm:text-sm"
        >
          Fale conosco
        </WhatsAppLink>
      </div>
      <nav className="flex justify-start gap-5 overflow-x-auto whitespace-nowrap border-t border-white/15 bg-primary-dark/40 px-6 py-2.5 backdrop-blur sm:justify-center sm:gap-8">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 transition hover:text-white sm:text-xs"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="px-6 py-14 text-center sm:px-10">
      <p className="font-display text-lg font-bold text-primary-dark">Estância Recanto de Paz</p>
      <p className="mt-2 text-sm text-muted">Rio Verde, GO</p>
      <WhatsAppLink
        message="Olá! Gostaria de saber mais sobre a Estância Recanto de Paz (locação / eventos)."
        className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
      >
        Falar no WhatsApp
      </WhatsAppLink>
      <p className="mt-8 text-xs text-muted">© {new Date().getFullYear()} Estância Recanto de Paz. Todos os direitos reservados.</p>
    </footer>
  );
}
