'use client';

import type {
  CSSProperties,
  FormEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    code: '01',
    title: 'Estrategia digital',
    copy: 'Definimos dirección, audiencias y oportunidades para construir una estrategia que haga avanzar tu marca.',
  },
  {
    code: '02',
    title: 'Branding',
    copy: 'Creamos identidades con una voz propia, coherentes y memorables, para que tu marca tenga presencia y diferencia.',
  },
  {
    code: '03',
    title: 'Contenido',
    copy: 'Creamos historias, piezas y formatos pensados para captar atención, generar conexión y construir comunidad.',
  },
  {
    code: '04',
    title: 'Performance',
    copy: 'Diseñamos y optimizamos campañas enfocadas en resultados medibles: leads, conversaciones, ventas y crecimiento.',
  },
];

const capabilities = [
  {
    code: '04',
    title: 'Campañas de marketing',
    headline: 'Campañas que buscan resultados reales.',
    copy: 'Planificamos, lanzamos y optimizamos campañas en Meta, TikTok, Google y otros canales según el objetivo. Medimos lo que importa para mejorar conversaciones, leads, ventas y retorno de inversión.',
    icon: '↗',
  },
  {
    code: '05',
    title: 'Social media',
    headline: 'Presencia que se siente.',
    copy: 'Gestionamos la presencia digital de tu marca con estrategia, contenido y una comunicación coherente. No se trata solo de publicar: construimos una identidad que conecta con tu audiencia.',
    icon: '◌',
  },
  {
    code: '06',
    title: 'Producción de contenido',
    headline: 'Contenido que hace visible tu marca.',
    copy: 'Desarrollamos fotografías, videos publicitarios, piezas para redes, contenido audiovisual y material comercial pensado para comunicar y vender mejor.',
    icon: '◫',
  },
  {
    code: '07',
    title: 'Branding y diseño',
    headline: 'Una identidad que se reconoce.',
    copy: 'Construimos o renovamos la identidad visual de tu marca: concepto, dirección visual, piezas gráficas y sistemas que mantienen coherencia en cada punto de contacto.',
    icon: '◇',
  },
  {
    code: '08',
    title: 'Diseño y desarrollo web',
    headline: 'Tu marca también vive en la web.',
    copy: 'Diseñamos páginas web modernas, rápidas y orientadas a objetivos, combinando experiencia de usuario, identidad visual y estructura pensada para convertir visitas en oportunidades.',
    icon: '⌘',
  },
];

const projects = [
  {
    client: 'DONGFENG',
    field: 'AUTOMOTRIZ',
    note: 'Estrategia y contenido de marca.',
    style: 'project-dark',
  },
  {
    client: 'WULING',
    field: 'MOVILIDAD',
    note: 'Lanzamiento y presencia digital.',
    style: 'project-silver',
  },
  {
    client: 'ZNA',
    field: 'AUTOMOTRIZ',
    note: 'Campaña con foco en conversión.',
    style: 'project-blue',
  },
  {
    client: '98 TIME',
    field: 'BOUTIQUE',
    note: 'Identidad que se siente propia.',
    style: 'project-warm',
  },
  {
    client: 'Instabus',
    field: 'TRANSPORTE',
    note: 'Contenido para mover comunidad.',
    style: 'project-cyan',
  },
  {
    client: 'Instacargo',
    field: 'LOGÍSTICA',
    note: 'Ejecución y performance.',
    style: 'project-steel',
  },
];

const process = [
  [
    '01',
    'Descubrir',
    'Escuchamos, investigamos y detectamos oportunidades reales.',
  ],
  [
    '02',
    'Diseñar',
    'Traducimos hallazgos en una idea y un sistema con carácter.',
  ],
  [
    '03',
    'Activar',
    'Llevamos la estrategia a los canales y momentos que importan.',
  ],
  [
    '04',
    'Escalar',
    'Medimos, aprendemos y amplificamos lo que genera resultados.',
  ],
];

function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      →
    </span>
  );
}

const revealStyle = (delay: number): CSSProperties =>
  ({ '--reveal-delay': `${delay}ms` }) as CSSProperties;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [motionReady, setMotionReady] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMotionReady(true));
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    function closeMenuOutside(event: PointerEvent) {
      if (
        menuOpen &&
        window.matchMedia('(max-width: 820px)').matches &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeMenuOutside);
    return () => document.removeEventListener('pointerdown', closeMenuOutside);
  }, [menuOpen]);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.get('nombre'),
          email: formData.get('email'),
          celular: formData.get('celular'),
          proyecto: formData.get('proyecto'),
        }),
      });

      if (!response.ok) throw new Error('No se pudo enviar la consulta.');

      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }

  function handleHeroMotion(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--light-x',
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      '--light-y',
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  }

  return (
    <main className={motionReady ? 'motion-ready' : ''}>
      <div className="screen-signal" aria-hidden="true">
        <span></span>
      </div>
      <header ref={headerRef} className="site-header " id="inicio">
        <a className="brand" href="#inicio" aria-label="Goya, volver al inicio">
          <span>GOYA</span>
          <small>AGENCIA DE MARKETING</small>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          <span></span>
          <span></span>
          <span></span>
          <span className="sr-only">Abrir menú</span>
        </button>
        <nav
          id="primary-nav"
          className={menuOpen ? 'is-open' : ''}
          aria-label="Navegación principal"
        >
          {['Inicio', 'Servicios', 'Proyectos', 'Nosotros', 'Contacto'].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ),
          )}
        </nav>
      </header>

      <section
        className="hero hero-animated select-none"
        onPointerMove={handleHeroMotion}
        aria-labelledby="hero-title"
      >
        <div className="hero-aura aura-one"></div>
        <div className="hero-aura aura-two"></div>
        <p className="hero-kicker">ESTRATEGIA · CREATIVIDAD · RESULTADOS</p>
        <div className="hero-word" aria-hidden="true">
          GOYA
        </div>
        <div className="hero-objects" aria-hidden="true">
          <i></i>
          <b></b>
          <em></em>
        </div>
        <div className="orbit orbit-left" aria-hidden="true"></div>
        <div className="orbit orbit-right" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="hero-agency">AGENCIA DE MARKETING</p>
          <h1 id="hero-title">Ideas que se convierten en ventas.</h1>
          <p>
            Diseñamos estrategias digitales donde la creatividad, la tecnología
            y los resultados se convierten en crecimiento para tu marca.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contacto">
              Hablemos de tu proyecto <Arrow />
            </a>
            <a className="button button-quiet" href="#proyectos">
              Ver nuestros proyectos <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section
        className="section services-section"
        id="servicios"
        aria-labelledby="services-title"
      >
        <div className="section-label">Servicios</div>
        <div className="services-layout">
          <div className="section-intro reveal">
            <h2 id="services-title">
              Lo que hacemos por <strong>tu marca</strong>
            </h2>
            <p>
              Soluciones de marketing diseñadas según tus necesidades, objetivos
              y etapa de crecimiento.
            </p>
            <a href="#contacto" className="text-link">
              Conoce nuestras capacidades <Arrow />
            </a>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article
                className="service reveal"
                style={revealStyle(index * 80)}
                key={service.code}
              >
                <span className="service-code">{service.code}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a href="#contacto" aria-label={`Consultar ${service.title}`}>
                  <Arrow />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section live-section" aria-labelledby="live-title">
        <div className="live-copy reveal">
          <div className="section-label">TikTok live</div>
          <h2 id="live-title">
            Tu marca, <strong>en movimiento.</strong>
          </h2>
          <p>
            Llevamos tu marca al formato LIVE según lo que realmente necesita.
            Podemos trabajar reconocimiento, interacción, demostración de
            productos, procesos, comunidad o ventas.
          </p>
          <p className="live-footnote">
            La estrategia cambia según el tipo de negocio y el objetivo.
          </p>
          <a className="text-link" href="#contacto">
            Conversemos sobre tu live <Arrow />
          </a>
        </div>
        <div
          className="live-stage reveal"
          aria-label="Visual decorativo para TikTok Live"
        >
          <div className="live-pulse"></div>
          <div className="live-screen">
            <span className="live-dot"></span>
            <span className="live-label">EN VIVO</span>
            <div className="live-bars">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <span className="live-signal">GOYA / LIVE</span>
          </div>
        </div>
      </section>

      <section
        className="section capabilities-section"
        aria-labelledby="capabilities-title"
      >
        <div className="capabilities-head reveal">
          <div className="section-label">Capacidades</div>
          <h2 id="capabilities-title">
            Más formas de <strong>hacer crecer tu marca.</strong>
          </h2>
        </div>
        <div className="capabilities-list">
          {capabilities.map((capability, index) => (
            <article
              className="capability reveal"
              style={revealStyle(index * 65)}
              key={capability.code}
            >
              <div className="capability-meta">
                <span>{capability.code}</span>
                <span aria-hidden="true">{capability.icon}</span>
              </div>
              <div>
                <p className="capability-name">{capability.title}</p>
                <h3>{capability.headline}</h3>
              </div>
              <p>{capability.copy}</p>
              <a href="#contacto" aria-label={`Consultar ${capability.title}`}>
                <Arrow />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section projects-section"
        id="proyectos"
        aria-labelledby="projects-title"
      >
        <div className="project-heading reveal">
          <div>
            <div className="section-label">Proyectos</div>
            <h2 id="projects-title">
              Marcas reales, <strong>resultados reales</strong>
            </h2>
            <p>
              Una selección de proyectos donde estrategia, creatividad y
              ejecución se convierten en trabajo que habla por nosotros.
            </p>
          </div>
          <a href="#contacto" className="button button-outline">
            Ver más proyectos <Arrow />
          </a>
        </div>
        <div className="projects-rail">
          {projects.map((project, index) => (
            <article
              className={`project ${project.style} reveal`}
              style={revealStyle(index * 70)}
              key={project.client}
            >
              <div className="project-orb"></div>
              <div className="project-car" aria-hidden="true"></div>
              <div className="project-meta">
                <h3>{project.client}</h3>
                <p>{project.field}</p>
                <span>{project.note}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section process-section"
        id="nosotros"
        aria-labelledby="process-title"
      >
        <span className="process-axis" aria-hidden="true">
          FLOW / SIGNAL / 001
        </span>
        <span className="process-index" aria-hidden="true">
          FUTURE / 004
        </span>
        <div className="section-label reveal">Método</div>
        <h2 id="process-title" className="reveal">
          De la idea al impulso
        </h2>
        <ol className="process-line">
          {process.map(([number, title, copy], index) => (
            <li className="reveal" style={revealStyle(index * 95)} key={number}>
              <span className="process-dot"></span>
              <span className="process-number">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="section contact-section"
        id="contacto"
        aria-labelledby="contact-title"
      >
        <div className="contact-copy reveal">
          <div className="section-label">Contacto</div>
          <h2 id="contact-title">Hagamos algo extraordinario</h2>
          <p>Cuéntanos tu proyecto y descubramos juntos cómo hacerlo crecer.</p>
          <div className="contact-brand">
            GOYA<small>MARKETING QUE VENDE</small>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={submitForm}>
          <label>
            Nombre
            <input required name="nombre" placeholder="Tu nombre" />
          </label>
          <div className="form-row">
            <label>
              <span className="field-label">Email</span>
              <input
                required
                type="email"
                name="email"
                placeholder="nombre@empresa.com"
              />
            </label>
            <label>
              <span className="field-label">
                Celular <small>(opcional)</small>
              </span>
              <input type="tel" name="celular" placeholder="987 654 321" />
            </label>
          </div>
          <label>
            Proyecto
            <textarea
              required
              name="proyecto"
              rows={4}
              placeholder="Cuéntanos qué quieres construir"
            ></textarea>
          </label>
          {formStatus === 'success' && (
            <p role="status" className="success">
              Gracias. Recibimos tu consulta y te contactaremos pronto.
            </p>
          )}
          {formStatus === 'error' && (
            <p role="alert" className="form-error">
              No se pudo enviar tu consulta. Inténtalo nuevamente.
            </p>
          )}
          <button
            className="button button-primary"
            type="submit"
            disabled={formStatus === 'sending'}
          >
            {formStatus === 'sending' ? 'Enviando…' : 'Enviar consulta'} <Arrow />
          </button>
        </form>
      </section>

      <footer>
        <div>
          <strong>GOYA © 2026.</strong> Agencia de Marketing Digital
          <br />
          Todos los derechos reservados.
        </div>
        <nav aria-label="Navegación de pie">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="footer-social">
          <a href="#contacto" aria-label="Instagram">
            ◎
          </a>
          <a href="#contacto" aria-label="TikTok">
            ♪
          </a>
          <a href="#contacto" aria-label="LinkedIn">
            in
          </a>
          <a href="#contacto" aria-label="YouTube">
            ▷
          </a>
        </div>
        <p className="footer-close">Estrategia. Creatividad. Resultados.</p>
      </footer>
    </main>
  );
}
