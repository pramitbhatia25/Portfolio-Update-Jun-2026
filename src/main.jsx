import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Ballpit from './components/Ballpit.jsx';
import TargetCursor from './components/TargetCursor.jsx';
import './styles.css';

const ballpitPalette = [0x5a35ff, 0x2f2368, 0xf6f4f0, 0xb8b8bb, 0x191722, 0xe9a8ff];

const workNavLinks = [
  {
    label: 'Resume',
    href: 'https://docs.google.com/document/d/18n8_1PyM5XKpG0uqZ5Q_2Wj0-_i128uNpVEFe1C_3Bw/edit?usp=sharing',
    icon: 'resume'
  },
  { label: 'Blog', href: 'https://unfundedthoughts.vercel.app/', icon: 'blog' },
  { label: 'Work', href: '#work-experience', icon: 'work' },
  { label: 'GitHub', href: 'https://github.com/pramitbhatia25', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pramit-bhatia-220680b2/', icon: 'linkedin' }
];

const workExperience = [
  {
    company: 'ProSights',
    href: 'https://www.linkedin.com/company/prosightsco/',
    role: 'Founding Software Engineer',
    period: 'Jan 2026 - Present',
    place: 'New York, NY',
    photoLabel: 'ProSights team',
    photoSrc: '/work/prosights-team.png',
    summary:
      'Building the agent evaluation and observability platform for production AI workflows: 3000+ agent runs, scoring across precision/recall/completeness/citation accuracy, and telemetry over $100K+ in agent spend.',
    details: [
      'Built trace-level analytics for Claude, Codex, tool calls, sources, reruns, artifacts, and model/config comparisons.',
      'Unblocked enterprise deals with an external SSO flow for the Excel VSTO add-in and shipped Python/FastAPI services for OCR, ingestion, layout modeling, and exports at million-page scale.'
    ]
  },
  {
    company: 'Cybriant',
    href: 'https://www.cybriant.com/',
    role: 'Software Engineer',
    period: 'May 2023 - Dec 2025',
    place: 'Atlanta, GA',
    photoLabel: 'Cybriant team',
    photoSrc: '/work/cybriant-team.png',
    summary:
      'Shipped security automation products across Google SecOps, GCP, Auth0, React, Flask, and Python pipelines, turning manual SOC and onboarding workflows into multi-tenant software.',
    details: [
      'Built a Google Security Operations SaaS platform that automated customer setup, saving 100+ hours/month and roughly $60K/year.',
      'Led AI security-agent projects and intern teams, including a 1st place finish among 500+ projects at KSU Capstone Showcase.'
    ]
  },
  {
    company: 'BullRun AI',
    href: 'https://tinyurl.com/4erjxf5d',
    role: 'Co-Founder',
    period: 'May 2025 - Present',
    place: 'Remote',
    photoLabel: 'BullRun build diary',
    photoSrc: '/work/bullrun-team.png',
    summary:
      'Co-founded an AI investment analyst that connects to portfolios and watchlists, explains market movement, and sends daily summaries personalized to a user\'s goals.',
    details: [
      'Won Best Generative AI Hack at Hacklytics 2025 out of 250+ projects and 1200+ students.',
      'Built the MVP, shaped the product narrative, and grew a waitlist of 1000+ users.'
    ]
  },
  {
    company: 'Georgia State University',
    href: 'https://www.gsu.edu/',
    role: 'Undergraduate Research Assistant',
    period: 'Aug 2023 - May 2024',
    place: 'Atlanta, GA',
    photoLabel: 'Research lab notes',
    photoSrc: '/work/georgia-state-graduation.png',
    summary:
      'Worked on a C++ command-line system for image experiments with ADIOS2, SQLite, and OpenCV under Dr. Lipeng Wan, improving research storage and processing workflows.',
    details: [
      'Integrated image-processing, metadata, and storage layers for repeatable experiment management.',
      'Balanced research code, systems work, and production engineering habits while completing the undergraduate assistantship.'
    ]
  }
];

function WorkNavIcon({ type }) {
  if (type === 'resume') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6M9 9h2" />
      </svg>
    );
  }

  if (type === 'blog') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16z" />
        <path d="M13 6l5 5" />
      </svg>
    );
  }

  if (type === 'work') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8h16v11H4z" />
        <path d="M9 8V5h6v3M4 13h16" />
      </svg>
    );
  }

  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-3 17c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.1-3.4-1.1-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.8c0 .3.2.6.7.5A9 9 0 0 0 12 3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9h4v10H5zM5 5h4v2H5zM12 9h4v1.6A3.6 3.6 0 0 1 22 13v6h-4v-5c0-1.2-.5-1.8-1.4-1.8S15 12.8 15 14v5h-3z" />
    </svg>
  );
}

function App() {
  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    let frameId = 0;

    const updateHeroScroll = () => {
      frameId = 0;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / (viewportHeight * 0.72), 0), 1);

      document.documentElement.style.setProperty('--hero-opacity', String(Math.max(1 - progress * 1.2, 0)));
      document.documentElement.style.setProperty('--hero-blur', `${progress * 8}px`);
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateHeroScroll);
    };

    updateHeroScroll();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      document.documentElement.style.removeProperty('--hero-opacity');
      document.documentElement.style.removeProperty('--hero-blur');
    };
  }, []);

  useEffect(() => {
    if (!previewPhoto) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setPreviewPhoto(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [previewPhoto]);

  return (
    <main className="portfolio-shell">
      <TargetCursor
        targetSelector=".cursor-target"
        hoverDuration={0.22}
        cursorColor="#f6f4f0"
        cursorColorOnTarget="#e9a8ff"
        hideDefaultCursor
      />

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="ballpit-layer" aria-hidden="true">
          <Ballpit
            className="ballpit-canvas"
            count={92}
            gravity={0.003}
            friction={0.9995}
            wallBounce={0.96}
            followCursor={false}
            colors={ballpitPalette}
            ambientIntensity={1}
            lightIntensity={230}
            minSize={0.36}
            maxSize={0.95}
            size0={0.9}
            startSpread={1.6}
            maxVelocity={0.032}
          />
        </div>

        <div className="hero-nameplate">
          <h1 id="hero-title">
            Pramit
            <br className="mobile-name-break" />
            <span className="desktop-name-space"> </span>
            Bhatia
          </h1>
          <a
            className="hero-subhead cursor-target"
            href="https://www.linkedin.com/company/prosightsco/"
            target="_blank"
            rel="noreferrer"
          >
            Founding Software Engineer @ ProSights (YC W24)
          </a>
        </div>

      </section>

      <section className="work-section" aria-labelledby="work-title">
        <div className="work-glass">
          <nav className="work-kicker" id="work-title" aria-label="Profile links">
            {workNavLinks.map((link) =>
              link.href ? (
                <a
                  className="cursor-target"
                  href={link.href}
                  target={link.href.startsWith('#') ? undefined : '_blank'}
                  rel={link.href.startsWith('#') ? undefined : 'noreferrer'}
                  key={link.label}
                >
                  <WorkNavIcon type={link.icon} />
                  <span>{link.label}</span>
                </a>
              ) : (
                <span key={link.label}>{link.label}</span>
              )
            )}
          </nav>
          <div className="experience-list" id="work-experience">
            {workExperience.map((item, index) => (
              <article className="experience-row cursor-target" key={item.company}>
                <div className="experience-content">
                  <div className="experience-meta">
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.company}
                    </a>
                    <span>{item.role}</span>
                    <strong>{item.period}</strong>
                    <em>{item.place}</em>
                  </div>

                  <div className="experience-copy">
                    <p>{item.summary}</p>
                    {item.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                </div>

                <figure className={`diary-photo${item.photoSrc ? ' has-real-photo' : ''}`} data-variant={index}>
                  <span className="photo-tape" aria-hidden="true" />
                  {item.photoSrc ? (
                    <button
                      className="photo-preview-trigger cursor-target"
                      type="button"
                      onClick={() => setPreviewPhoto(item)}
                      aria-label={`Open ${item.photoLabel} preview`}
                    >
                      <img src={item.photoSrc} alt={item.photoLabel} loading="lazy" />
                    </button>
                  ) : (
                    <div className="photo-inner" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                  {!item.photoSrc && <figcaption>{item.photoLabel}</figcaption>}
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      {previewPhoto ? (
        <div className="photo-preview" role="dialog" aria-modal="true" aria-label={previewPhoto.photoLabel}>
          <button className="photo-preview-backdrop" type="button" onClick={() => setPreviewPhoto(null)} />
          <div className="photo-preview-card">
            <button
              className="photo-preview-close cursor-target"
              type="button"
              onClick={() => setPreviewPhoto(null)}
              aria-label="Close image preview"
            >
              Close
            </button>
            <img src={previewPhoto.photoSrc} alt={previewPhoto.photoLabel} />
          </div>
        </div>
      ) : null}

    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
