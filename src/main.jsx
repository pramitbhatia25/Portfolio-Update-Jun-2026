import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Ballpit from './components/Ballpit.jsx';
import TargetCursor from './components/TargetCursor.jsx';
import './styles.css';

const ballpitPalette = [0x5a35ff, 0x2f2368, 0xf6f4f0, 0xb8b8bb, 0x191722, 0xe9a8ff];
const ballpitDesktopGravity = 0.003;
const ballpitMobileGravity = 0.5;
const ballpitDesktopMaxVelocity = 0.032;
const ballpitMobileMaxVelocity = 0.18;
const mobileViewportQuery = '(max-width: 680px)';
const heroCredentials = [
  '7X Hackathon Winner',
  'Hackathon Judge @ 10+ MLH hackathons',
  'SWE Advisory Board Member @ Kennesaw State University',
  '2x Founder'
];

const workNavLinks = [
  {
    label: 'Resume',
    href: 'https://drive.google.com/file/d/18ZqPBKB36wVBRi5as0e_7kf9RqXJYH5k/view?usp=sharing',
    icon: 'resume'
  },
  { label: 'Blog', href: 'https://unfundedthoughts.vercel.app/', icon: 'blog' },
  { label: 'Work', href: '#work-title', icon: 'work' },
  { label: 'Hackathons', href: '#hackathons', icon: 'hackathons' },
  { label: 'GitHub', href: 'https://github.com/pramitbhatia25', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pramit-bhatia-220680b2/', icon: 'linkedin' }
];

const hackathonProjects = [
  {
    title: 'BullrunAI',
    href: 'https://tinyurl.com/4erjxf5d',
    date: 'Feb 22-23, 2025',
    stack: 'AI Agents, finance, portfolio intelligence',
    award: 'Winner of Best Generative AI Hack @ Hacklytics 2025, Georgia Tech, out of 250+ projects and 1200+ students.',
    details: [
      'Built an AI investment analyst that connects to portfolios and watchlists, analyzes market movements, and sends personalized daily summaries.',
      'Developed the MVP and grew a 1000+ user waitlist.'
    ]
  },
  {
    title: 'HealthSync',
    href: 'https://devfolio.co/projects/datadoctor-056d',
    date: 'Feb 9-11, 2024',
    stack: 'Azure, OpenAI, ReactJS, MongoDB, Python, Flask',
    award: 'Winner of Best Healthcare Hack @ Hacklytics 2024, Georgia Tech, out of 200+ projects and 1000+ students.',
    details: [
      'Developed a platform for doctors to create custom chatbots for automated medical data extraction, analysis, and patient follow-up.',
      'Built multiple front-end views and designed the React/Flask/MongoDB architecture within 48 hours.'
    ]
  },
  {
    title: 'SignEZ',
    href: 'https://zinc-iterator-405117.ue.r.appspot.com/',
    date: 'Apr 21, 2023',
    stack: 'ReactJS, TensorFlowJS, MongoDB, Docker, GitLab, GCP',
    award: 'Awarded 3rd Place @ CSC Demo Day, Georgia State University, 2023.',
    details: [
      'Engineered a real-time sign-language recognition application with TensorFlowJS using the handpose model.',
      'Implemented a GitLab CI/CD pipeline with Docker containerization and GCP deployment.'
    ]
  },
  {
    title: 'KunstenAR',
    href: 'https://devpost.com/software/tbd-0bxgrv',
    date: 'Nov 17-19, 2023',
    stack: 'Xcode, Swift, Flask, Python, GCP, Redis',
    award: 'Winner of Best Use of Redis Award @ AI-ATL, Georgia Tech, 2023.',
    details: [
      'Built an iOS augmented-reality app that transforms hand-drawn sketches into 3D models.',
      'Connected Swift/ARKit front-end flows to Flask, GCP Vertex AI, and Redis-backed conversational context.'
    ]
  },
  {
    title: 'Transportation Renovation',
    href: 'https://github.com/pramitbhatia25/Hack-4-Good/blob/main/Transportation%20Renovation.pdf',
    date: '2022',
    stack: 'UI/UX, Data Analysis, Transit Safety, Machine Learning',
    award: 'Won $2K at Social Action Hack-a-thon 2022.',
    details: [
      'Redesigned MARTA\'s See & Say incident-reporting flow to address underreported health and safety incidents across Atlanta transit.',
      'Proposed a 50% reduction in report fields, nested dropdowns, optional contact capture, a safety banner, and better map-based incident transparency.',
      'Outlined ML-assisted incident categorization to improve rider UX while preserving the data needed for safety analysis.'
    ]
  },
  {
    title: 'GameJam',
    href: 'https://github.com/pramitbhatia25/GameJam',
    date: '2023',
    stack: 'Python, Flask, MongoDB, HTML/CSS',
    award: 'Won 1st Place @ Georgia State University Game Jam among 50 students.',
    details: [
      'Built a Flask-backed web game with player pages, leaderboard submission, and MongoDB score storage.',
      'Shipped a deployable Python web app with templates, static assets, and production server configuration during the game-jam window.'
    ]
  },
  {
    title: 'Code For Good 2022',
    href: 'https://github.com/pramitbhatia25/Code-For-Good-2022',
    date: 'Jun 25, 2022',
    stack: 'React, Express, MongoDB, Bootstrap, Chart.js',
    award: 'Competed in JPMorgan Chase Code for Good 2022 and was selected for a JPMorgan Chase internship from the India-wide process.',
    details: [
      'Built a full-stack platform with startup onboarding, application and funding flows, plus admin and user dashboards.',
      'Implemented React routes and Express/MongoDB APIs for application intake, approval-status updates, login, and funding requests.'
    ]
  }
];

const workExperience = [
  {
    company: 'ProSights (YC W24)',
    href: 'https://www.linkedin.com/company/prosightsco/',
    role: 'Founding Software Engineer',
    period: 'Jan 2026 - Present',
    place: 'New York, NY',
    photoLabel: 'ProSights team',
    photoSrc: '/work/prosights-team.png',
    summary:
      'Built and owned the Agent Evaluation Platform end-to-end, running 3000+ production agent executions across precision, recall, completeness, citation accuracy, runtime, token, and cost telemetry.',
    details: [
      'Built trace-level observability for AI agents, including command/Python/MCP tool analytics, reasoning-event trends, source-page usage, heatmaps, and model/config dashboards for Claude, Codex, and reasoning-effort comparisons.',
      'Shipped Python/FastAPI/Redis/PostgreSQL microservices for ingestion, OCR, layout modeling, exports, and external Excel VSTO SSO that unblocked 2 six-figure enterprise deals.'
    ]
  },
  {
    company: 'Cybriant',
    href: 'https://www.cybriant.com/',
    role: 'Software Engineer',
    period: 'May 2023 - December 2025',
    place: 'Atlanta, GA',
    positions: [
      {
        role: 'Software Engineer',
        period: 'May 2024 - December 2025',
        place: 'Atlanta, GA'
      },
      {
        role: 'Software Engineer Intern',
        period: 'May 2023 - Apr 2024',
        place: 'Atlanta, GA'
      }
    ],
    photoLabel: 'Cybriant team',
    photoSrc: '/work/cybriant-team.png',
    summary:
      'Shipped security automation products across Google SecOps, GCP, Auth0, React, Flask, and Python data pipelines.',
    details: [
      'Architected and deployed a multi-tenant SaaS platform for Google Security Operations, automating customer provisioning and onboarding to save 100+ hours/month and roughly $60K/year.',
      'Delivered GCP ETL/reporting, Google ADK agents, UDM log parsers, and AI attack-surface work that won 1st place among 500+ projects at KSU\'s 2024 Capstone Showcase.'
    ]
  },
  {
    company: 'BullrunAI',
    href: 'https://tinyurl.com/4erjxf5d',
    role: 'Co-Founder',
    period: 'May 2025 - Present',
    place: 'Remote',
    photoLabel: 'BullRun build diary',
    photoSrc: '/work/bullrun-team.png',
    summary:
      'Co-founded BullrunAI, an AI investment analyst for portfolios, watchlists, daily market summaries, and financial-goal context.',
    details: [
      'Won Best Generative AI Hack @ Hacklytics 2025 (Georgia Tech) out of 250+ projects and 1200+ students.',
      'Developed MVP and grew a 1000+ user waitlist.'
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
      'Built C++ command-line tooling for managing image experiments with ADIOS2, SQLite, and OpenCV at Georgia State University.',
    details: [
      'Integrated image processing and storage workflows for undergraduate research with Dr. Lipeng Wan.'
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

  if (type === 'hackathons') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4h8v3a4 4 0 0 1-8 0z" />
        <path d="M6 5H3v2a4 4 0 0 0 4 4M18 5h3v2a4 4 0 0 1-4 4" />
        <path d="M12 11v4M9 20h6M10 15h4v5h-4z" />
      </svg>
    );
  }

  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.52 2.87 8.36 6.84 9.72.5.09.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.97c.85 0 1.71.12 2.51.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.25C22 6.59 17.52 2 12 2z" />
      </svg>
    );
  }

  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.28zM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.1 20.45H3.54V8.98H7.1v11.47zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
      </svg>
    );
  }

  return null;
}

function useIsMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.matchMedia(mobileViewportQuery).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileViewportQuery);
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);

    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  return isMobileViewport;
}

function AppBackground({ isMobileViewport }) {
  return (
    <div className="ballpit-layer" aria-hidden="true">
      <Ballpit
        key={isMobileViewport ? 'mobile-ballpit' : 'desktop-ballpit'}
        className="ballpit-canvas"
        count={92}
        gravity={isMobileViewport ? ballpitMobileGravity : ballpitDesktopGravity}
        enableDeviceGravity={isMobileViewport}
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
        maxVelocity={isMobileViewport ? ballpitMobileMaxVelocity : ballpitDesktopMaxVelocity}
      />
    </div>
  );
}

function GravityPermissionPrompt({ isMobileViewport }) {
  const [status, setStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleStatus = (event) => {
      setStatus(event.detail?.status ?? 'idle');
    };

    window.addEventListener('ballpit-gravity-status', handleStatus);
    return () => window.removeEventListener('ballpit-gravity-status', handleStatus);
  }, []);

  useEffect(() => {
    if (!['enabled', 'denied', 'unsupported'].includes(status)) return undefined;

    setShowToast(true);
    const toastTimer = window.setTimeout(() => setShowToast(false), 2800);
    return () => window.clearTimeout(toastTimer);
  }, [status]);

  if (!isMobileViewport) return null;

  const statusCopy = {
    idle: '',
    asking: 'Allow motion access in the browser popup.',
    enabled: 'Tilt your phone to move the balls.',
    denied: 'Motion access was blocked. You can allow it in browser settings.',
    unsupported: 'Tilt control is not supported in this browser.'
  };

  const toggleTiltControl = () => {
    if (status === 'enabled') {
      setShowToast(false);
      window.dispatchEvent(new Event('disable-ballpit-gravity'));
      return;
    }

    setStatus('asking');
    window.dispatchEvent(new Event('request-ballpit-gravity'));
  };

  return (
    <div className={`gravity-permission gravity-permission-${status}`}>
      <button
        className="gravity-permission-button cursor-target"
        type="button"
        onClick={toggleTiltControl}
        disabled={status === 'asking'}
      >
        {status === 'enabled' ? 'disable tilt' : 'click me'}
      </button>
      {showToast || status === 'asking' ? (
        <p className="gravity-toast" role="status">
          {statusCopy[status]}
        </p>
      ) : null}
    </div>
  );
}

function PortfolioPage({ isMobileViewport }) {
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
      <section className="hero-section" aria-labelledby="hero-title">
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
          <div className="hero-credentials" aria-label="Highlights">
            {heroCredentials.map((credential) => (
              <p key={credential}>{credential}</p>
            ))}
          </div>
          <GravityPermissionPrompt isMobileViewport={isMobileViewport} />
        </div>

      </section>

      <section className="work-section" aria-labelledby="work-title">
        <div className="work-glass">
          <nav className="work-kicker" aria-label="Profile links">
            {workNavLinks.map((link) =>
              link.href ? (
                <a
                  className="cursor-target"
                  href={link.href}
                  target={link.href.startsWith('#') || link.href.startsWith('/') ? undefined : '_blank'}
                  rel={link.href.startsWith('#') || link.href.startsWith('/') ? undefined : 'noreferrer'}
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
          <header className="work-heading">
            <h2 id="work-title">Work</h2>
          </header>
          <div className="experience-list" id="work-experience">
            {workExperience.map((item, index) => (
              <article className="experience-row cursor-target" key={`${item.company}-${item.role}-${item.period}`}>
                <div className="experience-content">
                  <div className="experience-meta">
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.company}
                    </a>
                    {item.positions ? (
                      <div className="experience-positions">
                        {item.positions.map((position) => (
                          <div className="experience-position" key={`${position.role}-${position.period}`}>
                            <span>{position.role}</span>
                            <strong>{position.period}</strong>
                            <em>{position.place}</em>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <span>{item.role}</span>
                        <strong>{item.period}</strong>
                        <em>{item.place}</em>
                      </>
                    )}
                  </div>

                  <div className="experience-copy">
                    <ul>
                      {[item.summary, ...item.details].slice(0, 3).map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
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

          <section className="hackathons-panel" id="hackathons" aria-labelledby="hackathons-title">
            <header className="hackathons-heading">
              <h2 id="hackathons-title">Hackathons</h2>
            </header>
            <div className="hackathons-list">
              {hackathonProjects.map((project) => (
                <article className="hackathon-row cursor-target" key={project.title}>
                  <div className="hackathon-meta">
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.title}
                    </a>
                    <em>{project.date}</em>
                    <span>{project.stack}</span>
                    <strong>{project.award}</strong>
                  </div>
                  <div className="hackathon-copy">
                    <ul>
                      {project.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
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

function App() {
  const isMobileViewport = useIsMobileViewport();

  return (
    <>
      <TargetCursor
        targetSelector=".cursor-target"
        hoverDuration={0.22}
        cursorColor="#f6f4f0"
        cursorColorOnTarget="#e9a8ff"
        hideDefaultCursor
      />
      <AppBackground isMobileViewport={isMobileViewport} />
      <PortfolioPage isMobileViewport={isMobileViewport} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
