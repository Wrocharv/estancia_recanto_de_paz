import { useEffect, useRef, useState } from "react";
import { Header, Footer, MAANAIM_ORIGIN } from "./shared";

function resolveMaanaimUrl(url: string | null) {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${MAANAIM_ORIGIN}${url}`;
}

type Testimonial = {
  id: number;
  name: string;
  quote: string | null;
  photoUrl: string | null;
  videoUrl: string | null;
};

type EventContent = {
  title: string;
  tagline: string;
  intro: string;
  highlights: { title: string; text: string }[];
};

const content: Record<string, EventContent> = {
  maanaim: {
    title: "Retiro Espiritual Maanaim",
    tagline: "Um lugar de encontro com Deus",
    intro:
      "Inspirado em Gênesis 32:2, o Retiro Maanaim é um retiro espiritual mensal — três dias fora da rotina, dedicados a buscar a presença de Deus através de ministração, adoração e comunhão.",
    highlights: [
      {
        title: "Cura de feridas emocionais",
        text: "Um tempo para olhar para dores, traumas e marcas que ainda influenciam suas escolhas e relacionamentos, permitindo que Deus trate aquilo que você carrega há tanto tempo.",
      },
      {
        title: "Libertação de prisões",
        text: "Um ambiente de ministração e oração para romper ciclos, confrontar aquilo que tem prendido sua vida e experimentar liberdade em Cristo.",
      },
      {
        title: "Restauração da identidade",
        text: "Um encontro com Deus para resgatar sua identidade, fortalecer sua fé e compreender quem você é n'Ele — deixando para trás aquilo que já não precisa fazer parte da sua história.",
      },
      {
        title: "Um novo começo",
        text: "Depois de tratar o que estava escondido, é hora de seguir diferente: com a fé fortalecida, o coração alinhado e clareza para viver um novo tempo. Você será conduzido a reconhecer sua identidade, compreender seu chamado e descobrir como servir no Reino através de uma ativação ministerial que ajudará você a identificar seus dons e se posicionar para viver o propósito de Deus.",
      },
    ],
  },
  maturidade: {
    title: "Encontro Maturidade",
    tagline: "O próximo passo depois do Maanaim",
    intro:
      "Se você já viveu o Retiro Maanaim, saiba: aquilo foi apenas o começo. O Maturidade é o próximo passo para quem deseja aprofundar sua caminhada com Deus, crescer espiritualmente e consolidar tudo aquilo que Ele começou durante o Maanaim. Se o Maanaim marcou a sua vida, o Maturidade é a oportunidade de ir além.",
    highlights: [
      {
        title: "Tratamento e crescimento",
        text: "Um tempo dedicado a tratar o que for necessário e crescer na caminhada, aprofundando o relacionamento com Deus além da experiência do Maanaim.",
      },
      {
        title: "Fortalecimento e avanço",
        text: "Consolidar tudo o que Deus começou no Maanaim, desenvolvendo um relacionamento mais profundo e consistente com Ele.",
      },
    ],
  },
};

export default function EventDetailPage({ slug }: { slug: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const event = content[slug];

  function handlePlay(index: number) {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index && !v.paused) v.pause();
    });
  }

  useEffect(() => {
    fetch(`${MAANAIM_ORIGIN}/api/testimonials?eventType=${slug}`)
      .then((res) => res.json())
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, [slug]);

  if (!event) {
    return (
      <div className="bg-background text-foreground">
        <Header />
        <main className="flex min-h-screen items-center justify-center px-6 pt-32 text-center">
          <p className="text-sm text-muted">Página não encontrada.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <Header />

      <header className="bg-primary-dark px-6 pb-16 pt-40 text-center sm:px-10 sm:pt-48">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">Estância Recanto de Paz</p>
        <h1 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">{event.title}</h1>
        <p className="mt-3 text-sm text-white/80 sm:text-base">{event.tagline}</p>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center sm:px-10">
        <p className="text-sm leading-relaxed text-muted sm:text-base">{event.intro}</p>
        {slug === "maturidade" ? (
          <span className="mt-8 inline-block rounded-full border border-border px-7 py-3 text-sm font-semibold text-muted">
            Datas em breve
          </span>
        ) : (
          <a
            href="/#agenda"
            className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-dark"
          >
            Ver datas e se inscrever
          </a>
        )}
      </section>

      {event.highlights.length > 0 && (
        <section className="bg-surface px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">A jornada</p>
            <h2 className="font-display mt-2 text-center text-2xl font-bold text-primary-dark sm:text-3xl">O que você vai vivenciar</h2>
            <div className="mt-14">
              {event.highlights.map((item, i) => (
                <div key={item.title} className="relative flex gap-6 pb-12 last:pb-0">
                  {i < event.highlights.length - 1 && (
                    <span className="absolute left-[19px] top-11 h-[calc(100%-1rem)] w-px bg-border" aria-hidden="true" />
                  )}
                  <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-display text-lg font-bold text-primary-dark">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-center text-2xl font-bold text-primary-dark sm:text-3xl">Quem já participou conta</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {testimonials.map((t, i) => (
                <div key={t.id} className="rounded-2xl border border-border bg-surface p-5">
                  {t.videoUrl && (
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={resolveMaanaimUrl(t.videoUrl)}
                      controls
                      playsInline
                      poster={resolveMaanaimUrl(t.photoUrl)}
                      onPlay={() => handlePlay(i)}
                      className="mb-3 aspect-[9/16] w-full rounded-xl bg-black object-cover"
                    />
                  )}
                  {t.quote && <p className="text-sm italic leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-primary-dark px-6 py-16 text-center sm:px-10">
        {slug === "maturidade" ? (
          <span className="inline-block rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white/70">
            Datas em breve
          </span>
        ) : (
          <a
            href="/#agenda"
            className="inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-primary-dark shadow-lg transition hover:brightness-105"
          >
            Ver próximas datas
          </a>
        )}
      </section>

      <Footer />
    </div>
  );
}
