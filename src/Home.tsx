import { useEffect, useState } from "react";
import { Header, Footer, WhatsAppLink, MAANAIM_ORIGIN, locacaoWhatsappNumber } from "./shared";

type VenueBooking = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: "reservado" | "confirmado";
};

function formatDateShort(d: string) {
  return new Date(`${d}T00:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function VenueAvailability() {
  const [bookings, setBookings] = useState<VenueBooking[] | null>(null);

  useEffect(() => {
    fetch(`${MAANAIM_ORIGIN}/api/venue-bookings`)
      .then((res) => res.json())
      .then(setBookings)
      .catch(() => setBookings([]));
  }, []);

  if (!bookings || bookings.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/15 bg-white/5 p-5 text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-light">Datas já ocupadas</p>
      <p className="mt-1 text-xs text-white/60">Confira antes de escolher sua data — o que não estiver aqui, está livre.</p>
      <ul className="mt-4 space-y-2.5">
        {bookings.map((b) => (
          <li key={b.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-white/85">
              {formatDateShort(b.startDate)} — {formatDateShort(b.endDate)}
            </span>
            <span className="flex items-center gap-2 text-right">
              <span className="truncate text-white/60">{b.title}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  b.status === "confirmado" ? "bg-emerald-500/20 text-emerald-300" : "bg-accent/20 text-accent-light"
                }`}
              >
                {b.status === "confirmado" ? "Confirmado" : "Reservado"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const events = [
  {
    name: "Retiro Maanaim",
    text: "Retiro espiritual mensal, com momentos de adoração, ministração e comunhão.",
    href: "/maanaim",
    cta: "Conhecer o Maanaim",
  },
  {
    name: "Maturidade",
    text: "Encontro voltado ao aprofundamento espiritual e ao crescimento na fé.",
    href: "/maturidade",
    cta: "Conhecer o Maturidade",
  },
  {
    name: "Encontro de Casais",
    text: "Um tempo dedicado a fortalecer o casamento à luz da Palavra.",
    href: null,
    cta: null,
  },
];

const structure = [
  { label: "Auditório e salão principal", icon: "⛪" },
  { label: "Alojamentos e quartos", icon: "🛏️" },
  { label: "Refeitório", icon: "🍽️" },
  { label: "Área de lazer e quadra", icon: "⚽" },
  { label: "Energia solar própria", icon: "☀️" },
  { label: "Amplo estacionamento", icon: "🚗" },
];

const agenda = [
  { title: "Maanaim — Setembro", dates: "11, 12 e 13", href: "https://retiro-maanaim.onrender.com/fanpage/2026-09" },
  { title: "Maanaim — Outubro", dates: "2, 3 e 4", href: "https://retiro-maanaim.onrender.com/fanpage/2026-10" },
  { title: "Maanaim — Novembro", dates: "6, 7 e 8", href: null },
  { title: "Maanaim — Dezembro", dates: "4, 5 e 6", href: null },
];

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img src="/fotos/espaco-01.jpg" alt="Entrada da Estância Recanto de Paz" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-primary-dark/10" />
        <div className="relative px-6 pb-16 pt-48 sm:px-10 sm:pb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">Assembleia de Deus · Rio Verde, GO</p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
            Um lugar reservado para encontros com Deus
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            A Estância Recanto de Paz recebe os retiros e encontros da nossa igreja — e, nos períodos livres, também
            está disponível para locação de eventos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#eventos"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary-dark shadow-lg transition hover:brightness-105"
            >
              Conheça os retiros
            </a>
            <a
              href="#locacao"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Locação de espaço
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sobre a estância</p>
        <h2 className="font-display mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">Um espaço para renovar</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          A Estância Recanto de Paz é o espaço da nossa igreja dedicado a retiros espirituais e encontros que marcam
          vidas. É aqui que acontecem o Retiro Maanaim, o Maturidade e outros encontros ao longo do ano — momentos de
          adoração, ensino e comunhão, longe da rotina, cercados de natureza.
        </p>
      </section>

      {/* Galeria / estrutura */}
      <section className="bg-surface px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">A estrutura</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">O espaço</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="/fotos/espaco-02.jpg"
              alt="Fachada do salão principal"
              className="h-72 w-full rounded-2xl object-cover shadow-sm sm:col-span-2 sm:h-96"
            />
            <img src="/fotos/fechadura.jpg" alt="Fechadura eletrônica dos quartos" className="h-56 w-full rounded-2xl object-cover shadow-sm" />
            <div className="grid grid-cols-2 gap-4">
              {structure.slice(0, 4).map((item) => (
                <div key={item.label} className="flex h-[104px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-background text-center">
                  <span className="text-xl">{item.icon}</span>
                  <span className="px-2 text-[11px] font-medium leading-tight text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2">
            {structure.slice(4).map((item) => (
              <div key={item.label} className="flex h-[88px] items-center justify-center gap-2 rounded-2xl border border-border bg-background text-center">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-muted">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">Mais fotos do espaço em breve.</p>
        </div>
      </section>

      {/* Eventos */}
      <section id="eventos" className="scroll-mt-24 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Trabalhos realizados</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">Nossos retiros e encontros</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {events.map((event) => (
              <div key={event.name} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-primary-dark">{event.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{event.text}</p>
                {event.href ? (
                  <a
                    href={event.href}
                    className="mt-5 inline-block rounded-full bg-primary px-5 py-2 text-center text-xs font-semibold text-white transition hover:bg-primary-dark"
                  >
                    {event.cta}
                  </a>
                ) : (
                  <span className="mt-5 inline-block rounded-full bg-border px-5 py-2 text-center text-xs font-semibold text-muted">Em breve</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="scroll-mt-24 bg-surface px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Próximas datas</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">Agenda</h2>
          </div>

          <div className="space-y-3">
            {agenda.map((item) => (
              <div key={item.title} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background px-6 py-4">
                <div>
                  <p className="font-display font-bold text-primary-dark">{item.title}</p>
                  <p className="text-sm text-muted">Dias {item.dates}</p>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark"
                  >
                    Inscreva-se
                  </a>
                ) : (
                  <span className="rounded-full bg-border px-5 py-2 text-xs font-semibold text-muted">Inscrições em breve</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="scroll-mt-24 px-6 py-20 text-center sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Projetos</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">Projetos sociais</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">Em breve, mais informações sobre os projetos sociais realizados pela igreja.</p>
        </div>
      </section>

      {/* Parceiros */}
      <section id="parceiros" className="scroll-mt-24 bg-surface px-6 py-20 text-center sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Parceiros</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">Nossos parceiros</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">Em breve, conheça as igrejas e organizações parceiras.</p>
        </div>
      </section>

      {/* Locação */}
      <section id="locacao" className="bg-primary-dark px-6 py-20 text-center sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">Locação</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">Disponível para o seu evento</h2>
          <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base">
            A Estância Recanto de Paz recebe retiros, confraternizações, encontros e eventos especiais em um
            ambiente completamente preparado para isso.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            Consulte a data do seu evento e verifique a disponibilidade na nossa agenda.
          </p>
          <WhatsAppLink
            message="Olá! Gostaria de consultar disponibilidade da Estância Recanto de Paz para locação."
            number={locacaoWhatsappNumber}
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-primary-dark shadow-lg transition hover:brightness-105"
          >
            Consultar data disponível
          </WhatsAppLink>

          <VenueAvailability />
        </div>
      </section>

      <Footer />
    </div>
  );
}
