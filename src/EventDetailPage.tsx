import { useEffect, useRef, useState } from "react";
import { Header, Footer } from "./shared";

const MAANAIM_ORIGIN = "https://retiro-maanaim.onrender.com";

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
        title: "Renovação espiritual",
        text: "Renovo na presença de Deus e aprofundamento do seu relacionamento, recebendo renovação na fé e o poder do Espírito Santo para caminhar em ousadia e propósito.",
      },
      {
        title: "Descoberta do chamado",
        text: "Ter clareza sobre o propósito de Deus para sua vida e começar a identificar e ativar os dons espirituais que o Senhor confiou a você.",
      },
      {
        title: "Momentos profundos de adoração",
        text: "Experimentar momentos intensos de poder e adoração na presença de Deus, renovando seu propósito com Sua obra.",
      },
    ],
  },
  maturidade: {
    title: "Encontro Maturidade",
    tagline: "Aprofundamento espiritual e crescimento na fé",
    intro:
      "O Maturidade é um encontro voltado a quem deseja amadurecer na caminhada com Deus — um tempo de ensino, reflexão e comunhão para dar passos mais firmes na fé.",
    highlights: [],
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
    fetch(`${MAANAIM_ORIGIN}/api/testimonials`)
      .then((res) => res.json())
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, []);

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
        <a
          href="/#agenda"
          className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-dark"
        >
          Ver datas e se inscrever
        </a>
      </section>

      {event.highlights.length > 0 && (
        <section className="bg-surface px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-center text-2xl font-bold text-primary-dark sm:text-3xl">O que você vai vivenciar</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {event.highlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-background p-5">
                  <p className="font-display font-bold text-primary-dark">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
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
        <a
          href="/#agenda"
          className="inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-primary-dark shadow-lg transition hover:brightness-105"
        >
          Ver próximas datas
        </a>
      </section>

      <Footer />
    </div>
  );
}
