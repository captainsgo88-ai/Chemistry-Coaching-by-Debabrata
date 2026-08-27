import { useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import {
  ArrowRight,
  Atom,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronUp,
  Clock3,
  FlaskConical,
  Map,
  MapPin,
  Menu,
  Phone,
  Send,
  Star,
  Users,
  X,
} from 'lucide-react';
import NotFound from '@/pages/not-found';

const logoPath = '/assets/ccd-logo.png';

type Course = {
  level: string;
  title: string;
  detail: string;
  fee: string;
  cadence: string;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
};

const courseData: Course[] = [
  {
    level: 'Secondary · WBBSE',
    title: 'Class IX–X',
    detail: 'Concept building, school syllabus support, numericals and board-focused revision.',
    fee: '₹700',
    cadence: 'per month',
  },
  {
    level: 'Higher Secondary · WBCHSE',
    title: 'Class XI–XII',
    detail: 'Physical, organic and inorganic chemistry with problem-solving that prepares you for exams.',
    fee: '₹900',
    cadence: 'per month',
  },
  {
    level: 'Entrance preparation',
    title: 'JEE / NEET Chemistry',
    detail: 'Focused practice, reaction logic and regular tests for students ready to stretch further.',
    fee: '₹1,200',
    cadence: 'per month',
  },
];

const sampleReviews: Review[] = [
  {
    id: 'sample-1',
    name: 'Moumita S.',
    rating: 5,
    text: 'Sir makes the difficult chapters feel organised. The small batch means I can ask questions without hesitation.',
    date: 'Parent of a Class XII student',
  },
  {
    id: 'sample-2',
    name: 'Sayan D.',
    rating: 5,
    text: 'The weekly problem sheets changed how I study. I now understand why a reaction happens, not just what to memorise.',
    date: 'Class X student',
  },
  {
    id: 'sample-3',
    name: 'Anindita R.',
    rating: 4,
    text: 'A focused, friendly place in Makrampur. My daughter comes home with a plan for the next week every time.',
    date: 'Parent of a Class IX student',
  },
];

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${visible ? 'reveal' : ''} ${className}`}>
      {children}
    </div>
  );
}

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <div className="stars" aria-label={label ?? `${rating} out of 5 stars`} data-testid="display-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} aria-hidden="true" className={star <= rating ? '' : 'opacity-25'} />
      ))}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return (
    <header className="topbar">
      <div className="container-wide nav-inner">
        <a href="#home" className="brand-lockup" onClick={closeMenu} data-testid="link-brand-home">
          <img src={logoPath} alt="CCD Chemistry Coaching by Debabrata logo" />
          <span className="brand-copy">
            <span className="brand-name">Chemistry Coaching by Debabrata</span>
            <span className="brand-sub">Learn · Analyse · Excel</span>
          </span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu} data-testid="link-nav-about">About CCD</a>
          <a href="#courses" onClick={closeMenu} data-testid="link-nav-courses">Courses &amp; Fees</a>
          <a href="#highlights" onClick={closeMenu} data-testid="link-nav-highlights">Highlights</a>
          <a href="#reviews" onClick={closeMenu} data-testid="link-nav-reviews">Reviews</a>
          <a href="#contact" onClick={closeMenu} data-testid="link-nav-contact">Contact</a>
        </nav>
        <a className="nav-call" href="tel:7001894376" data-testid="link-header-call">
          <Phone size={14} aria-hidden="true" /> 70018 94376
        </a>
        <button
          className="mobile-menu"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <div className="container-wide hero-grid">
          <Reveal>
            <div className="eyebrow">Makrampur, Bolpur · Since day one</div>
            <h1 className="display">Chemistry that finally <em>clicks.</em></h1>
            <p className="hero-intro">
              Patient teaching, clear explanations and the right amount of practice for students who want to feel confident in the classroom and in the exam hall.
            </p>
            <div className="hero-actions">
              <a className="hero-call" href="tel:7001894376" data-testid="link-hero-call">
                <Phone size={16} aria-hidden="true" /> Call Debabrata
              </a>
              <a className="hero-link" href="#courses" data-testid="link-hero-courses">
                See courses <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <strong data-testid="text-small-batches">Small</strong>
                <span>groups where every question gets room</span>
              </div>
              <div>
                <strong data-testid="text-local-centre">Local</strong>
                <span>in-person support for Makrampur families</span>
              </div>
              <div>
                <strong data-testid="text-clear-fees">Clear</strong>
                <span>simple monthly fees, no surprises</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="hero-art">
            <img className="logo-hero" src={logoPath} alt="CCD circular logo with a chemistry flask mark" data-testid="img-hero-logo" />
            <span className="orbit orbit-one" aria-hidden="true">NaCl</span>
            <span className="orbit orbit-two" aria-hidden="true">pH 7</span>
            <span className="hero-label">A neighbourhood<br />classroom for curious minds</span>
          </Reveal>
        </div>
      </section>
      <div className="ticker" aria-label="CCD promises">
        <div className="container-wide ticker-inner">
          <span className="ticker-item"><FlaskConical size={16} aria-hidden="true" /> Learn from first principles</span>
          <span className="ticker-item"><BadgeCheck size={16} aria-hidden="true" /> Doubts welcome here</span>
          <span className="ticker-item"><Users size={16} aria-hidden="true" /> Parents stay informed</span>
        </div>
      </div>
    </>
  );
}

function About() {
  return (
    <section className="section-pad" id="about">
      <div className="container-wide about-grid">
        <Reveal>
          <div className="about-note" data-testid="card-about-note">
            <div className="note-mark">01</div>
            <h3>Not a crowded coaching factory. A place to get unstuck.</h3>
            <p>
              CCD is built around attentive teaching: notice the gap, explain it another way, and practise until the student can do it independently.
            </p>
            <small>THE CCD PROMISE</small>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <div className="eyebrow">About CCD</div>
          <h2 className="display section-heading">A stronger foundation makes the rest lighter.</h2>
          <p>
            Chemistry Coaching by Debabrata is a teacher-led centre for school and entrance chemistry in Makrampur, Bolpur. Lessons move between the blackboard, the textbook and the student&apos;s own questions — because real understanding is more useful than a page of memorised answers.
          </p>
          <div className="principles">
            <div className="principle">
              <span className="principle-number">01 /</span>
              <h4>Understand</h4>
              <p>Build a picture of the idea before adding formulae and exceptions.</p>
            </div>
            <div className="principle">
              <span className="principle-number">02 /</span>
              <h4>Analyse</h4>
              <p>Break every numerical and reaction into a process you can repeat.</p>
            </div>
            <div className="principle">
              <span className="principle-number">03 /</span>
              <h4>Excel</h4>
              <p>Use regular practice and feedback to make exam day feel familiar.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section className="section-pad courses-section" id="courses">
      <div className="container-wide">
        <Reveal>
          <div className="course-head">
            <div className="section-heading">
              <div className="eyebrow">Courses &amp; fees</div>
              <h2 className="display">Find the right starting point.</h2>
              <p>Every course includes guided lessons, doubt time and practice that follows the student&apos;s level.</p>
            </div>
            <span className="update-note">FEES SHOWN PER MONTH · UPDATED FOR 2025–26</span>
          </div>
        </Reveal>
        <div className="course-list" data-testid="list-courses">
          {courseData.map((course, index) => (
            <Reveal key={course.title}>
              <article className="course-row" data-testid={`card-course-${index}`}>
                <div className="course-title">
                  {course.title}
                  <small>{course.level}</small>
                </div>
                <div className="course-detail">{course.detail}</div>
                <div className="fee" data-testid={`text-fee-${index}`}>
                  {course.fee}
                  <span>{course.cadence}</span>
                </div>
                <a className="course-cta" href="#contact" data-testid={`link-course-enquire-${index}`}>
                  Enquire <ArrowRight size={15} aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="section-pad highlights-section" id="highlights">
      <div className="container-wide">
        <Reveal>
          <div className="section-heading">
            <div className="eyebrow">Inside the classroom</div>
            <h2 className="display">Small details. Noticeable progress.</h2>
            <p>What a week at CCD feels like: structured enough to move forward, personal enough to ask one more question.</p>
          </div>
        </Reveal>
        <div className="highlight-grid">
          <Reveal>
            <article className="chalk-card" data-testid="card-highlight-blackboard">
              <span className="chalk-label">CLASSROOM NOTE / 01</span>
              <span className="chalk-line" aria-hidden="true" />
              <h3>From “I don&apos;t get it” to “let me try.”</h3>
              <p>Lessons are paced for understanding, with the board work and practice sheet working together.</p>
              <span className="mono" style={{ color: 'hsl(var(--secondary))', fontSize: '.65rem' }}>CONCEPT → EXAMPLE → PRACTICE</span>
            </article>
          </Reveal>
          <div className="highlight-stack">
            <Reveal>
              <article className="highlight-tile yellow" data-testid="card-highlight-doubt">
                <div className="tile-top"><span className="tile-icon"><BookOpen size={17} aria-hidden="true" /></span><span>WEEKLY RHYTHM</span></div>
                <h4>Doubt time is part of the lesson, not an extra.</h4>
              </article>
            </Reveal>
            <Reveal>
              <article className="highlight-tile teal" data-testid="card-highlight-tests">
                <div className="tile-top"><span className="tile-icon"><Atom size={17} aria-hidden="true" /></span><span>STEADY PRACTICE</span></div>
                <h4>Short tests keep revision honest and useful.</h4>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card" data-testid={`card-review-${review.id}`}>
      <Stars rating={review.rating} />
      <blockquote>{review.text}</blockquote>
      <div className="review-author">
        <span className="author-mark">{review.name.slice(0, 1).toUpperCase()}</span>
        <span><strong>{review.name}</strong><br />{review.date}</span>
      </div>
    </article>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<{ name?: string; rating?: string; text?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ccd-visitor-reviews');
      if (saved) {
        const parsed = JSON.parse(saved) as Review[];
        if (Array.isArray(parsed)) setReviews([...parsed, ...sampleReviews]);
      }
    } catch {
      // Local storage may be unavailable in private browsing; the form still works for this visit.
    }
  }, []);

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: { name?: string; rating?: string; text?: string } = {};
    if (name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (rating === 0) nextErrors.rating = 'Please choose a star rating.';
    if (text.trim().length < 12) nextErrors.text = 'Please share at least a sentence.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newReview: Review = { id: `visitor-${Date.now()}`, name: name.trim(), rating, text: text.trim(), date: 'Visitor feedback' };
    const visitorReviews = reviews.filter((review) => review.id.startsWith('visitor-'));
    const updatedVisitors = [newReview, ...visitorReviews];
    setReviews([newReview, ...reviews]);
    try {
      window.localStorage.setItem('ccd-visitor-reviews', JSON.stringify(updatedVisitors));
    } catch {
      // Keep the submitted review visible even if persistence is unavailable.
    }
    setName('');
    setRating(0);
    setText('');
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section className="section-pad reviews-section" id="reviews">
      <div className="container-wide">
        <Reveal>
          <div className="section-heading">
            <div className="eyebrow">Reviews &amp; ratings</div>
            <h2 className="display">The best feedback is specific.</h2>
            <p>Read what families and students have shared, then leave a note of your own.</p>
          </div>
        </Reveal>
        <div className="reviews-grid">
          <div className="review-list" data-testid="list-reviews">
            {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
          <Reveal>
            <div className="review-form-wrap">
              <h3>Share your CCD experience.</h3>
              <p>It takes a minute, and helps another Makrampur family choose with confidence.</p>
              <form onSubmit={submitReview} noValidate data-testid="form-review">
                <label className="field-label" htmlFor="review-name">Your name</label>
                <input id="review-name" className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="For example, Riya or Mr. Sen" data-testid="input-review-name" />
                {errors.name && <p className="error-text" data-testid="error-review-name">{errors.name}</p>}
                <span className="field-label">Your rating</span>
                <div className="rating-input" role="radiogroup" aria-label="Choose a star rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`rating-button ${rating >= star ? 'active' : ''}`}
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      onClick={() => setRating(star)}
                      data-testid={`button-rating-${star}`}
                    >
                      <Star aria-hidden="true" />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="error-text" data-testid="error-review-rating">{errors.rating}</p>}
                <label className="field-label" htmlFor="review-text">Your review</label>
                <textarea id="review-text" className="field-input" value={text} onChange={(event) => setText(event.target.value)} placeholder="What helped you most?" data-testid="input-review-text" />
                {errors.text && <p className="error-text" data-testid="error-review-text">{errors.text}</p>}
                <button className="submit-review" type="submit" data-testid="button-submit-review"><Send size={15} aria-hidden="true" /> Submit visitor feedback</button>
                {submitted && <div className="form-success" role="status" data-testid="status-review-success"><Check size={14} aria-hidden="true" /> Thank you — your feedback is now shown above.</div>}
              </form>
              <p className="visitor-note">Reviews are visitor feedback and reflect individual experiences. They are not paid endorsements.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="container-wide">
        <div className="contact-grid">
          <Reveal>
            <div className="eyebrow">Start with a conversation</div>
            <h2 className="display">Ready to make chemistry clearer?</h2>
            <p className="contact-lead">Call to ask about the right batch, current timings or a first conversation about where your child needs support.</p>
            <div className="contact-actions">
              <a className="contact-button primary" href="tel:7001894376" data-testid="link-contact-call"><Phone size={16} aria-hidden="true" /> 70018 94376</a>
              <a className="contact-button" href="https://www.google.com/maps/search/?api=1&query=Makrampur%2C+Bolpur%2C+West+Bengal+731204" target="_blank" rel="noreferrer" data-testid="link-contact-map"><Map size={16} aria-hidden="true" /> Open in Maps</a>
            </div>
          </Reveal>
          <Reveal>
            <div className="contact-card" data-testid="card-contact-details">
              <div className="contact-row">
                <Phone size={18} aria-hidden="true" />
                <div><span>Call or WhatsApp</span><a href="tel:7001894376" data-testid="link-contact-phone">70018 94376</a></div>
              </div>
              <div className="contact-row">
                <MapPin size={18} aria-hidden="true" />
                <div><span>Find the centre</span><strong data-testid="text-contact-address">Makrampur, Bolpur<br />West Bengal 731204</strong></div>
              </div>
              <div className="contact-row">
                <Clock3 size={18} aria-hidden="true" />
                <div><span>Ask about batches</span><strong>Call for current class timings</strong></div>
              </div>
            </div>
          </Reveal>
        </div>
        <footer className="footer">
          <a href="#home" className="brand-lockup" data-testid="link-footer-home">
            <img src={logoPath} alt="CCD Chemistry Coaching by Debabrata logo" />
            <span className="brand-copy">
              <span className="brand-name">Chemistry Coaching by Debabrata</span>
              <span className="brand-sub">Learn · Analyse · Excel</span>
            </span>
          </a>
          <p data-testid="text-footer-location">A neighbourhood chemistry classroom in Makrampur, Bolpur.</p>
          <a className="back-top" href="#home" data-testid="link-back-top">Back to top <ChevronUp size={14} aria-hidden="true" /></a>
        </footer>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <About />
        <Courses />
        <Highlights />
        <Reviews />
        <Contact />
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;