import { useEffect, useRef, useState } from "react";
import {
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Leaf,
  Lock,
  MapPin,
  Pause,
  Phone,
  Play,
  Ruler,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";

const PHONE_DISPLAY = "(301) 334-4727";
const PHONE_HREF = "tel:+13013344727";
const ADDRESS = "1470 Maryland Highway, Oakland, MD 21550";
const MAP_HREF =
  "https://www.google.com/maps/search/?api=1&query=1470+Maryland+Highway+Oakland+MD+21550";

const NAV = [
  ["services", "Services"],
  ["process", "Process"],
  ["results", "Results"],
  ["about", "About"],
  ["gallery", "Gallery"],
  ["owner", "Owner"],
  ["contact", "Contact"],
];

const SERVICES = [
  {
    Icon: Wrench,
    title: "Collision Repair",
    desc: "We repair collision damage and keep you updated from drop-off through pickup.",
  },
  {
    Icon: SprayGunIcon,
    title: "Paint & Refinishing",
    desc: "We prepare, color-match, paint, and clear-coat repaired areas using Valspar and DeBeer systems. Refinishing includes a 1-year paint warranty.",
  },
  {
    Icon: WindshieldIcon,
    title: "Glass Replacement",
    desc: "When glass replacement is needed, we coordinate the work and include it in your repair schedule.",
  },
  {
    Icon: Ruler,
    title: "Frame & Unibody Repair",
    desc: "We repair frame and unibody damage as part of the collision repair process.",
  },
  {
    Icon: ShieldCheck,
    title: "Insurance Claim Coordination",
    desc: "We help organize estimate paperwork and repair approvals with your insurance company.",
  },
  {
    Icon: PartnerServicesIcon,
    title: "Specialty Repair Coordination",
    desc: "When outside specialty work is needed, we coordinate it with a repair partner and keep it on the same schedule.",
  },
];

const SERVICE_TECH_TAGS = {
  "Collision Repair": ["Damage Repair", "Structure"],
  "Paint & Refinishing": ["Color Match", "Clear Coat"],
  "Glass Replacement": ["Coordinated Service", "Scheduling"],
  "Frame & Unibody Repair": ["Frame Repair", "Unibody Repair"],
  "Insurance Claim Coordination": ["Paperwork", "Approvals"],
  "Specialty Repair Coordination": ["Repair Partners", "Scheduling"],
};

const PROCESS = [
  {
    step: "01",
    title: "First Call & Damage Review",
    body: "Call or stop in so we can review the visible damage and explain the estimate process.",
  },
  {
    step: "02",
    title: "Inspection & Estimate",
    body: "We document the damage, plan the repair, and prepare the estimate for approval.",
  },
  {
    step: "03",
    title: "Approval & Scheduling",
    body: "Your insurance company approves the estimate, or you do if you're paying yourself. Then we order parts and schedule the repair.",
  },
  {
    step: "04",
    title: "Repair, Paint & Reassembly",
    body: "We complete the body repair, prepare and paint the repaired areas, and put the vehicle back together.",
  },
  {
    step: "05",
    title: "Final Check & Pickup",
    body: "We inspect the completed repair and clean the work area before pickup. Refinishing work includes a 1-year paint warranty.",
  },
];

const TIMELINE = [
  {
    year: "1986",
    text: "Nu Finish began serving local drivers and building its reputation for collision repair work in Garrett County.",
  },
  {
    year: "1997",
    text: "The shop moved to its current Maryland Highway location and continued expanding its repair capacity.",
  },
  {
    year: "2010s",
    text: "The shop continued serving local drivers from its Maryland Highway location.",
  },
  {
    year: "Today",
    text: 'John "Grover" Groves is leading the shop forward with the same emphasis on communication, workmanship, and community presence.',
  },
];

const FACILITY = [
  {
    Icon: GarageDoorIcon,
    title: "Repair Space",
    desc: "The shop has dedicated areas for the different stages of a collision repair.",
  },
  {
    Icon: Ruler,
    title: "Repair Planning",
    desc: "The team reviews damage and repair needs before work begins.",
  },
  {
    Icon: PaintBoothIcon,
    title: "Refinishing Environment",
    desc: "Paint preparation and refinishing are completed in a dedicated work area.",
  },
  {
    Icon: Lock,
    title: "Vehicle Care",
    desc: "Vehicles stay at the shop while scheduled repair work is underway.",
  },
  {
    Icon: Award,
    title: "Valspar & DeBeer Certified",
    desc: "Nu Finish is certified with the Valspar and DeBeer refinishing systems used at the shop.",
  },
  {
    Icon: Leaf,
    title: "Paint Handling",
    desc: "The team follows the shop's established preparation and paint-handling steps.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Being in an accident is stressful, but they made the entire process so much easier. They kept me updated every step of the way, answered all of my questions, and truly made me feel like they cared. When I picked up my vehicle, I was amazed. It looked absolutely perfect. The quality of the work is outstanding, and their attention to detail is matched by no other.",
    by: "Evelyn S. · via Yelp",
  },
];

const CONTACT_POINTS = [
  { Icon: MapPin, label: "Visit", value: ADDRESS },
  { Icon: Phone, label: "Call", value: PHONE_DISPLAY },
  { Icon: Clock, label: "Hours", value: "Mon-Fri 9:00 AM-5:00 PM" },
];

// Customer repairs photographed by the shop. Each photo is a 4:3 WebP in two
// widths (480 and 960) under public/gallery/before-after/<slug>-<stage>-<width>.webp.
const BEFORE_AFTER = [
  {
    slug: "f250",
    vehicle: "Ford F-250 Super Duty",
    repair: "Front corner: bumper, fender, and headlight",
    beforeAlt:
      "Black Ford F-250 with its front bumper torn away and the front fender crushed around the wheel",
    afterAlt:
      "The same Ford F-250 after repair, with a straight bumper, new headlight, and smooth fender",
  },
  {
    slug: "camaro",
    vehicle: "Chevrolet Camaro",
    repair: "Front fender and door edge",
    beforeAlt:
      "Gray Chevrolet Camaro with a deep crease in the front fender where it meets the door",
    afterAlt:
      "The same Camaro after repair, with smooth, matched paint across the fender and door",
  },
  {
    slug: "silverado",
    vehicle: "Chevrolet Silverado",
    repair: "Front grille and bumper",
    beforeAlt:
      "Black Chevrolet Silverado with a crushed lower grille and bent front bumper",
    afterAlt:
      "The same Silverado in the shop after repair, with an aligned grille and straight bumper",
  },
  {
    slug: "wrx",
    vehicle: "Subaru WRX",
    repair: "Front bumper and fender",
    beforeAlt:
      "Black Subaru WRX with scraped paint and a pushed-in bumper below the headlight",
    afterAlt:
      "The same Subaru WRX after repair, with clean bumper and fender lines",
  },
  {
    slug: "murano",
    vehicle: "Nissan Murano",
    repair: "Front fender and bumper",
    beforeAlt:
      "White Nissan Murano with a dent in the front fender above the wheel",
    afterAlt:
      "The same Murano after repair, parked in front of the Nu Finish shop",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/gallery/front-of-building.webp",
    alt: "Front of the Nu Finish Collision Center building",
    title: "Front Building",
    caption:
      "The Maryland Highway location serves customers throughout Garrett County and beyond.",
    layout: "sm:col-span-2 xl:col-span-3",
    frame: "aspect-[21/9]",
  },
  {
    src: "/gallery/grover-mixing-paint.webp",
    alt: "Grover mixing automotive paint in the shop",
    title: "Color Mixing",
    caption:
      "Careful paint mixing helps every refinishing job start with accuracy.",
    frame: "aspect-[4/5]",
  },
  {
    src: "/gallery/grover-mixing-paint-2.webp",
    alt: "Grover mixing paint at a workbench in the shop",
    title: "Paint Bench",
    caption:
      "Color match work is handled deliberately so panels blend cleanly and consistently.",
    frame: "aspect-[4/5]",
  },
  {
    src: "/gallery/hood-in-sealer-before-spraying-color.webp",
    alt: "Vehicle hood in sealer before color is sprayed",
    title: "Pre-Paint Prep",
    caption:
      "Preparation work sets the stage for a cleaner, more consistent finish.",
    frame: "aspect-[4/3]",
  },
  {
    src: "/gallery/fresh-clean-paint-booth.webp",
    alt: "Clean paint booth prepared for refinishing work",
    title: "Paint Booth",
    caption:
      "A dedicated paint booth is used during refinishing.",
    frame: "aspect-[4/3]",
  },
  {
    src: "/gallery/curtain-paint-booth.webp",
    alt: "Curtain paint booth area inside Nu Finish",
    title: "Repair Steps",
    caption:
      "Dedicated work zones help the team move vehicles through each repair stage efficiently.",
    frame: "aspect-[4/3]",
  },
  {
    src: "/gallery/side-down-draft-paint-booth.webp",
    alt: "Side down draft paint booth at Nu Finish",
    title: "Down Draft Booth",
    caption:
      "Ventilation and booth layout help maintain a cleaner refinishing environment.",
    frame: "aspect-[4/3]",
  },
  {
    src: "/gallery/parts-bay.webp",
    alt: "Parts bay with organized parts and components for repairs",
    title: "Parts & Coordination",
    caption: "Organized parts handling helps keep repair schedules on track.",
    frame: "aspect-[4/3]",
  },
  {
    src: "/gallery/primer.webp",
    alt: "Vehicle panel in primer during the refinishing process",
    title: "Refinish Stages",
    caption:
      "Each stage of refinishing is handled with attention to detail from start to finish.",
    frame: "aspect-[4/3]",
  },
  {
    src: "/gallery/grover-beginning-to-clear-a-vehicle.webp",
    alt: "Grover beginning to clear coat a vehicle",
    title: "Final Coats",
    caption:
      "Final stages are completed with steady process control before delivery prep.",
    frame: "aspect-[4/5]",
  },
  {
    src: "/gallery/body-side-of-shop.webp",
    alt: "Body side work area of the Nu Finish shop",
    title: "Body Repair Area",
    caption:
      "Body repair space is organized to keep each job moving through the right sequence.",
    frame: "aspect-[4/3]",
  },
];

const VIDEO_ASSETS = {
  hero: {
    still: "/gallery/front-of-building.webp",
  },
  process: {
    desktop: "/gallery/videos/web/paint-color-blend.mp4",
    mobileWebp: "/gallery/videos/mobile-webp/paint-color-blend.webp",
    still: "/gallery/body-side-of-shop.webp",
  },
  motorsports: {
    desktop: "/gallery/videos/web/motorsports-legacy.mp4",
    mobileWebp: "/gallery/videos/mobile-webp/motorsports-legacy.webp",
    still: "/gallery/videos/stills/motorsports-legacy.webp",
  },
  facility: {
    desktop: "/gallery/videos/web/clear-coat-booth.mp4",
    mobileWebp: "/gallery/videos/mobile-webp/clear-coat-booth.webp",
    still: "/gallery/grover-beginning-to-clear-a-vehicle.webp",
  },
  ownerTrack: {
    desktop: "/gallery/videos/web/track-action.mp4",
    mobileWebp: "/gallery/videos/mobile-webp/track-action.webp",
    still: "/gallery/videos/stills/track-action.webp",
  },
  ownerRace: {
    desktop: "/gallery/videos/web/hero-race.mp4",
    mobileWebp: "/gallery/videos/mobile-webp/hero-race.webp",
    still: "/gallery/videos/stills/hero-race.webp",
  },
};

const motionDelay = (delay) => ({ "--motion-delay": `${delay}ms` });

// Reveal below-fold elements only when they enter the viewport.
function useRevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function ResponsiveVideo({ asset, className = "h-full w-full object-cover" }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [nearViewport, setNearViewport] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isMobile !== false || prefersReducedMotion || !videoRef.current) return;
    if (!("IntersectionObserver" in window)) {
      const timer = window.setTimeout(() => setNearViewport(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px", threshold: 0.01 },
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (isMobile !== false || !nearViewport || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (paused) {
          video.pause();
        } else if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isMobile, nearViewport, paused]);

  const togglePlayback = () => {
    if (isMobile) {
      setPaused((value) => !value);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  if (prefersReducedMotion || isMobile === null) {
    return (
      <img
        src={asset.still}
        alt=""
        aria-hidden="true"
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  if (isMobile) {
    return (
      <>
        <img
          src={paused ? asset.still : asset.mobileWebp}
          alt=""
          aria-hidden="true"
          className={className}
          loading="lazy"
          decoding="async"
        />
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute right-3 top-3 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/40 bg-black/75 text-white transition hover:bg-black"
          aria-label={paused ? "Play motion" : "Pause motion"}
        >
          {paused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload={nearViewport ? "metadata" : "none"}
        poster={asset.still}
        aria-hidden="true"
      >
        {nearViewport ? <source src={asset.desktop} type="video/mp4" /> : null}
      </video>
      <button
        type="button"
        onClick={togglePlayback}
        className="absolute right-3 top-3 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/40 bg-black/75 text-white transition hover:bg-black"
        aria-label={paused ? "Play video" : "Pause video"}
      >
        {paused ? (
          <Play className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Pause className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="scroll-progress h-full origin-left"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function SprayGunIcon({ className }) {
  return (
    <img
      src="/spraygun-96.webp"
      alt=""
      className={className}
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{ objectFit: "contain" }}
    />
  );
}

function WindshieldIcon({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 45 19 22c1-4 4-7 8-7h10c4 0 7 3 8 7l5 23"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 45h28M23 27h18M21 36h22"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M12 50h40"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M24 49l5-5m11 5-5-5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GarageDoorIcon({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 54V19l4-4h32l4 4v35"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 24h26M19 31h26M19 38h26M19 45h26"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M30 51h4"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaintBoothIcon({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 52V18h40v34"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 18v-6h24v6M20 52h24"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M24 25h16M24 31h16M24 37h16"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="m50 29 6 3-6 3"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="20" r="1.35" fill="currentColor" />
    </svg>
  );
}

function PartnerServicesIcon({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 23h12l4 5-8 9H10l-4-5 8-9Z"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 41H38l-4-5 8-9h12l4 5-8 9Z"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 30h18"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M22 34l6 6m14-16-6-6"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({ kicker, title, body, align = "left", dark = true }) {
  const center = align === "center";
  const titleColor = dark ? "text-white" : "text-slate-950";
  const bodyColor = dark ? "text-slate-300" : "text-slate-600";
  return (
    <div
      className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} motion-enter`}
      style={motionDelay(80)}
    >
      <p
        className={`mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-brand ${dark ? "" : "text-brand-ink"}`}
      >
        {kicker}
      </p>
      <h2
        className={`text-3xl font-black leading-tight md:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-4 text-sm leading-7 md:text-base ${bodyColor}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

function CTAGroup({ compact = false, dark = true }) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "" : "mt-8"}`}>
      <a
        href={PHONE_HREF}
        className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-black text-black transition hover:bg-brand-hover"
      >
        <Phone className="h-4 w-4" />
        Call {PHONE_DISPLAY}
      </a>
      <a
        href={MAP_HREF}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${dark ? "border border-white/20 bg-white/5 text-white hover:bg-white/10" : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"}`}
      >
        <MapPin className="h-4 w-4" />
        Get Directions
      </a>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3"
          aria-label="Nu Finish home"
        >
          <img
            src="/nufinish-wordmark-360.webp"
            alt="Nu Finish Collision Center"
            className="h-10 w-auto drop-shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link whitespace-nowrap rounded-full px-2 py-2 text-sm font-semibold text-slate-200 transition hover:text-white lg:px-4"
            >
              {label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className="btn-shine ml-2 whitespace-nowrap rounded-full bg-brand px-4 py-2 text-sm font-black text-black transition hover:bg-brand-hover"
          >
            Call Now
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="min-h-11 rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 px-4 pb-4 md:hidden"
        >
          <div className="flex flex-col gap-2 pt-3">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200"
              >
                {label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              className="rounded-2xl bg-brand px-4 py-3 text-sm font-black text-black"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/10 bg-black text-white"
    >
      <div className="absolute inset-0">
        <img
          src={VIDEO_ASSETS.hero.still}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60 lg:w-[140%] lg:max-w-none lg:object-left-top"
        />
        <div
          className="shop-floor-overlay absolute inset-0"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,209,60,0.22),_transparent_36%),linear-gradient(135deg,_rgba(0,0,0,0.66),_rgba(0,0,0,0.44)_55%,_rgba(34,165,219,0.10))]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-24 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="motion-enter" style={motionDelay(0)}>
          <div className="motion-glow mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-brand">
            Oakland, MD • Since 1986
          </div>
          <h1 className="text-shimmer max-w-3xl text-[2.1rem] font-black leading-[1.02] md:text-5xl">
            Auto body collision and refinishing built on precise body fit,
            controlled paint work, and hometown trust.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Collision repair, painting, and help with your insurance claim. We
            keep you updated from start to finish.
          </p>

          <div className="motion-enter" style={motionDelay(180)}>
            <CTAGroup />
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
                ["Damage Review", "Inspection and repair planning"],
              ["Color Match", "Valspar & DeBeer certified refinishing"],
              [
                  "Before Pickup",
                "Final inspection with 1-year paint warranty",
              ],
            ].map(([label, item], index) => (
              <div
                key={item}
                className="motion-card rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                style={motionDelay(260 + index * 120)}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-8 rounded-full bg-brand" />
                  <span className="h-1.5 w-3 rounded-full bg-brand-cyan" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand">
                  {label}
                </p>
                <p className="mt-2 leading-6 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 self-end">
          <div
            className="motion-card motion-float rounded-[28px] border border-white/10 bg-white/[6%] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur"
            style={motionDelay(160)}
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              At a glance
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ["Since 1986", "Serving local drivers"],
                ["Certified", "Valspar & DeBeer"],
                ["1 Year", "Paint warranty"],
                ["9 AM–5 PM", "Mon–Fri"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-black/35 p-4">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="motion-card rounded-[28px] border border-brand/25 bg-brand/10 p-6 text-sm leading-7 text-slate-100"
            style={motionDelay(280)}
          >
            <p className="font-black uppercase tracking-[0.18em] text-brand">
              Start your repair
            </p>
            <p className="mt-3">
              Call the shop or stop by in person to talk through the damage, the
              estimate process, and the next step for either insurance or
              customer-pay repairs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    ["Color Match", "Valspar & DeBeer paint systems"],
    ["Collision Repair", "Frame and unibody repair"],
    ["Paint & Refinish", "Preparation, color, and clear coat"],
    ["Protected", "1-year paint warranty"],
    ["Local", "Garrett County roots since 1986"],
    ["Guided", "Insurance and customer-pay coordination"],
  ];
  return (
    <section
      className="marquee border-b border-black/5 bg-slate-100"
      aria-label="What Nu Finish stands for"
    >
      <div className="marquee-track py-6">
        {[...items, ...items].map(([title, detail], index) => (
          <div
            key={`${title}-${index}`}
            aria-hidden={index >= items.length ? "true" : undefined}
            className="flex min-w-[280px] items-center gap-3 rounded-2xl border border-black/[6%] bg-white px-5 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-900">
                {title}
              </p>
              <p className="mt-0.5 text-sm text-slate-600">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      id="services"
      className="bg-[linear-gradient(180deg,#ffffff,#f5f7fa)] px-4 py-12 md:px-6 md:py-18"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Auto Body & Paint Services"
          title="Collision repair and painting, explained in plain language."
          body="We repair collision damage, prepare and paint repaired areas, and help coordinate the estimate and approval process."
          dark={false}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {SERVICES.map(({ Icon, title, desc }, index) => (
            <article
              key={title}
              data-reveal
              className="automotive-card tilt-card group rounded-[24px] border border-black/[8%] bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_70px_rgba(15,23,42,0.1)] md:rounded-[28px] md:p-6"
              style={motionDelay(index * 90)}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-brand md:h-14 md:w-14">
                <Icon className="h-8 w-8 md:h-[2.15rem] md:w-[2.15rem]" />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950 md:mt-5 md:text-xl">
                {title}
              </h3>
              <div className={`${showDetails ? "block" : "hidden"} md:block`}>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SERVICE_TECH_TAGS[title]?.map((tag) => (
                    <span
                      key={tag}
                      className="auto-tech-badge rounded-full border border-black/10 bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowDetails((value) => !value)}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-bold text-slate-900 md:hidden"
          aria-expanded={showDetails}
        >
          {showDetails ? "Hide service details" : "Show service details"}
        </button>

        <div className="mt-10 rounded-[28px] border border-brand/25 bg-slate-950 p-8 text-white md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
              Insurance & customer-pay repairs
            </p>
            <h3 className="mt-3 text-2xl font-black">
              The same repair steps, with the right person approving the estimate.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Your insurance company approves an insurance estimate. If you are
              paying yourself, you approve it directly.
            </p>
          </div>
          <CTAGroup compact />
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [showProcessDetails, setShowProcessDetails] = useState(false);

  return (
    <section
      id="process"
      className="bg-black px-4 py-12 text-white md:px-6 md:py-18"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Repair Process"
          title="A clear repair process from first call to pickup."
          body="We review the damage, prepare an estimate, get approval, complete the repair, and check the vehicle before pickup."
        />

        <div
          data-reveal="zoom"
          className="mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/5"
          style={motionDelay(60)}
        >
          <div className="relative aspect-[16/8] w-full">
            <ResponsiveVideo asset={VIDEO_ASSETS.process} />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/55 to-transparent md:block" />
            <div className="absolute inset-0 flex items-end p-7 max-md:hidden">
              <p className="max-w-2xl text-base font-semibold leading-7 text-white">
                Color matching and blending before the final clear coat.
              </p>
            </div>
          </div>
          <p className="bg-slate-950 px-5 py-4 text-sm font-semibold leading-7 text-white md:hidden">
            Color matching and blending before the final clear coat.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {PROCESS.map(({ step, title, body }, index) => (
            <article
              key={step}
              data-reveal
              className="process-lane-card rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:border-brand/40 hover:bg-white/10 sm:rounded-[28px] sm:p-5"
              style={motionDelay(index * 100)}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Stage
              </p>
              <p className="text-3xl font-black text-brand">{step}</p>
              <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
              <p
                className={`${showProcessDetails ? "block" : "hidden"} mt-3 text-sm leading-7 text-slate-300 sm:block`}
              >
                {body}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowProcessDetails((value) => !value)}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-white/30 bg-white/5 px-5 text-sm font-bold text-white sm:hidden"
          aria-expanded={showProcessDetails}
        >
          {showProcessDetails ? "Hide process details" : "Show process details"}
        </button>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-300">
          <p className="font-black uppercase tracking-[0.18em] text-brand">
            Getting started
          </p>
          <p className="mt-3">
            The best way to get started is to call the shop or stop in so the
            team can explain the right next step for your repair.
          </p>
        </div>
      </div>
    </section>
  );
}

const BEFORE_AFTER_STAGES = [
  ["before", "Before"],
  ["after", "After"],
];

function BeforeAfterCard({ item, featured, index, hiddenOnMobile = false }) {
  // Phones show one photo at a time with a toggle; wider screens show both.
  const [stage, setStage] = useState("before");
  const sizes = featured
    ? "(min-width: 1152px) 560px, (min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
    : "(min-width: 1152px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

  return (
    <article
      data-reveal
      className={`overflow-hidden rounded-[28px] border border-black/[8%] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ${featured ? "lg:col-span-2" : ""} ${hiddenOnMobile ? "max-sm:hidden" : ""}`}
      style={motionDelay(index * 80)}
    >
      <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
        {BEFORE_AFTER_STAGES.map(([key, label]) => {
          const base = `/gallery/before-after/${item.slug}-${key}`;
          return (
            <figure
              key={key}
              className={`relative aspect-[4/3] bg-slate-100 ${stage === key ? "block" : "hidden"} sm:block`}
            >
              <img
                src={`${base}-960.webp`}
                srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`}
                sizes={sizes}
                width="960"
                height="720"
                alt={key === "before" ? item.beforeAlt : item.afterAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <figcaption
                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] ${key === "after" ? "bg-brand text-black" : "bg-black/75 text-white"}`}
              >
                {label}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[6%] px-5 py-4">
        <div>
          <h3 className="text-lg font-black text-slate-950">{item.vehicle}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {item.repair}
          </p>
        </div>
        <div
          role="group"
          aria-label={`Show ${item.vehicle} before or after repair`}
          className="inline-flex rounded-full border border-black/10 bg-slate-100 p-1 sm:hidden"
        >
          {BEFORE_AFTER_STAGES.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={stage === key}
              onClick={() => setStage(key)}
              className={`min-h-11 rounded-full px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/45 ${stage === key ? "bg-brand text-black" : "text-slate-600"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function BeforeAfterSection() {
  const [showAllResults, setShowAllResults] = useState(false);

  return (
    <section
      id="results"
      className="bg-[linear-gradient(180deg,#ffffff,#eef2f6)] px-4 py-12 md:px-6 md:py-18"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Before & After"
          title="Real repairs from our shop floor."
          body="Every vehicle below came through Nu Finish. The shop team photographed each one when it arrived and again when the repair was finished."
          dark={false}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {BEFORE_AFTER.map((item, index) => (
            <BeforeAfterCard
              key={item.slug}
              item={item}
              featured={index === 0}
              index={index}
              hiddenOnMobile={index >= 3 && !showAllResults}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAllResults((value) => !value)}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-bold text-slate-900 sm:hidden"
          aria-expanded={showAllResults}
        >
          {showAllResults ? "Show fewer results" : "Show all results"}
        </button>
        <p className="mt-8 text-sm leading-7 text-slate-600">
          Have damage like this?{" "}
          <a
            href={PHONE_HREF}
            className="font-bold text-slate-950 underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-ink"
          >
            Call {PHONE_DISPLAY}
          </a>{" "}
          to talk through your repair.
        </p>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="bg-slate-950 px-4 py-12 text-white md:px-6 md:py-18"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            kicker="Our Story"
            title="Serving Garrett County drivers with pride, experience, and personal care."
            body="For decades, Nu Finish has built its reputation on dependable collision work, straight answers, and treating every customer with respect."
          />

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
            <img
              src="/nufinish-logo-224.webp"
              alt="Nu Finish Collision Center logo"
              className="h-28 w-auto drop-shadow-[0_14px_30px_rgba(0,0,0,0.28)]"
            />
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Nu Finish has served Oakland and Garrett County since 1986. The
              shop moved to its current location in 1997 and continues to
              operate with an emphasis on craftsmanship, direct communication,
              and work that supports both insurance and customer-pay clients.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              John "Grover" Groves owns and runs Nu Finish today. The team keeps
              estimate, certification, and warranty information clear from the
              first conversation.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
              Timeline
            </p>
            <div className="mt-5 space-y-5 border-l border-brand/30 pl-6">
              {TIMELINE.map(({ year, text }) => (
                <div key={year} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-brand" />
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-brand">
                    {year}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
              Commitment
            </p>
            <p className="mt-4 text-base font-semibold leading-8 text-white">
              Every vehicle deserves clear communication, disciplined repair
              planning, and a finish customers can leave with confidence.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              From the first conversation to final pickup, the goal is simple:
              quality repairs, accurate expectations, and service customers can
              trust at every stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OwnerSpotlightSection() {
  return (
    <section
      id="owner"
      className="bg-[linear-gradient(180deg,#f8fafc,#eef3f8)] px-4 py-12 md:px-6 md:py-18"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Beyond The Shop"
          title="A closer look at owner John Groves and his connection to local motorsports."
          body="Outside Nu Finish, John races on local dirt tracks. The shop remains focused on collision repair and painting."
          dark={false}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            data-reveal="left"
            className="self-start overflow-hidden rounded-[30px] border border-black/10 bg-black shadow-[0_22px_60px_rgba(15,23,42,0.14)]"
            style={motionDelay(40)}
          >
            <div className="relative aspect-[16/9] w-full">
              <ResponsiveVideo asset={VIDEO_ASSETS.motorsports} />
              <div className="absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/55 to-transparent md:block" />
              <div className="absolute inset-x-0 bottom-0 hidden p-6 md:block">
                <p className="inline-flex rounded-full bg-black/80 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-brand">
                  John Groves · Owner Spotlight
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/90">
                  John on track with his race car.
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 bg-black px-5 py-4 md:hidden">
              <p className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-brand">
                John Groves · Owner Spotlight
              </p>
              <p className="mt-2 text-sm leading-7 text-white">
                John on track with his race car.
              </p>
            </div>
          </div>

          <div
            data-reveal="right"
            className="rounded-[30px] border border-black/10 bg-white p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)]"
            style={motionDelay(130)}
          >
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-ink">
              What It Means For Customers
            </p>
            <h3 className="mt-3 text-2xl font-black leading-tight text-slate-950">
              The shop's repair work remains the priority.
            </h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                Customers rely on Nu Finish for collision repair, painting, and
                clear updates from the first call through pickup.
              </p>
              <p>
                The focus stays on careful repairs, clear expectations, and a
                completed vehicle ready for pickup.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Regional Dirt Track Nights",
                  "John racing at a local dirt track.",
                  VIDEO_ASSETS.ownerTrack,
                ],
                [
                  "Race Day Background",
                  "Race day.",
                  VIDEO_ASSETS.ownerRace,
                ],
              ].map(([title, caption, asset]) => (
                <div
                  key={title}
                  className="overflow-hidden rounded-2xl border border-black/12 bg-slate-950"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <ResponsiveVideo asset={asset} />
                  </div>
                  <div className="border-t border-white/10 px-3 py-2 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand">
                      {title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      {caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilitySection() {
  const [showFacilityDetails, setShowFacilityDetails] = useState(false);

  return (
    <section
      id="facility"
      className="border-t border-white/10 bg-[#0b1220] px-4 py-12 text-white md:px-6 md:py-18"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Facility & Certifications"
          title="A shop set up for each stage of collision repair."
          body="The team uses dedicated repair and paint areas and works with Valspar and DeBeer refinishing systems."
        />

        <div
          data-reveal="zoom"
          className="mt-10 overflow-hidden rounded-[30px] border border-white/12 bg-white/5"
          style={motionDelay(30)}
        >
          <div className="relative aspect-[16/7] w-full">
            <ResponsiveVideo asset={VIDEO_ASSETS.facility} />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/55 to-transparent md:block" />
            <div className="absolute inset-0 flex items-end p-6 max-md:hidden">
              <p className="max-w-2xl text-base font-semibold leading-7 text-white">
                Final coats are applied in an enclosed paint booth.
              </p>
            </div>
          </div>
          <p className="bg-slate-950 px-5 py-4 text-sm font-semibold leading-7 text-white md:hidden">
            Final coats are applied in an enclosed paint booth.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {FACILITY.map(({ Icon, title, desc }, index) => (
            <article
              key={title}
              data-reveal={index % 2 === 0 ? "left" : "right"}
              className="facility-card tilt-card rounded-[22px] border border-white/12 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition hover:border-white/20 hover:shadow-[0_20px_48px_rgba(0,0,0,0.42)] md:rounded-[28px] md:p-6"
              style={motionDelay(index * 85)}
            >
              <div className="facility-icon-shell flex h-14 w-14 items-center justify-center rounded-2xl text-brand">
                <Icon className="h-8 w-8 md:h-[2.15rem] md:w-[2.15rem]" />
              </div>
              <h3 className="mt-4 text-base font-black text-white md:mt-5 md:text-xl">
                {title}
              </h3>
              <p
                className={`${showFacilityDetails ? "block" : "hidden"} mt-3 text-sm leading-7 text-slate-300 md:block`}
              >
                {desc}
              </p>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowFacilityDetails((value) => !value)}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-white/30 bg-white/5 px-5 text-sm font-bold text-white md:hidden"
          aria-expanded={showFacilityDetails}
        >
          {showFacilityDetails ? "Hide facility details" : "Show facility details"}
        </button>
      </div>
    </section>
  );
}

function GallerySection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxPhase, setLightboxPhase] = useState("closed");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const openerRef = useRef(null);
  const restoreFocusRef = useRef(false);

  const openImage = (index, event) => {
    openerRef.current = event.currentTarget;
    setLightboxPhase(prefersReducedMotion ? "open" : "enter");
    setSelectedImage(index);
  };
  const closeLightbox = () => {
    if (selectedImage === null || lightboxPhase === "closing") return;
    restoreFocusRef.current = true;
    if (prefersReducedMotion) {
      setSelectedImage(null);
      setLightboxPhase("closed");
      return;
    }
    setLightboxPhase("closing");
  };
  const showNext = () =>
    setSelectedImage((index) => (index + 1) % GALLERY_IMAGES.length);
  const showPrev = () =>
    setSelectedImage(
      (index) => (index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );

  useEffect(() => {
    if (selectedImage === null) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (lightboxPhase === "closing") return;
        restoreFocusRef.current = true;
        if (prefersReducedMotion) {
          setSelectedImage(null);
          setLightboxPhase("closed");
        } else {
          setLightboxPhase("closing");
        }
      } else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      } else if (event.key === "ArrowRight") {
        setSelectedImage((index) => (index + 1) % GALLERY_IMAGES.length);
      } else if (event.key === "ArrowLeft") {
        setSelectedImage(
          (index) =>
            (index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
        );
      }
    };

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedImage, lightboxPhase, prefersReducedMotion]);

  useEffect(() => {
    if (selectedImage !== null) {
      closeButtonRef.current?.focus();
      return;
    }
    if (!restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    openerRef.current?.focus();
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage === null || lightboxPhase !== "enter") return;
    const frame = window.requestAnimationFrame(() => {
      setLightboxPhase("open");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedImage, lightboxPhase]);

  useEffect(() => {
    if (lightboxPhase !== "closing") return;
    const timer = window.setTimeout(() => {
      setSelectedImage(null);
      setLightboxPhase("closed");
    }, 220);
    return () => window.clearTimeout(timer);
  }, [lightboxPhase]);

  const activeImage =
    selectedImage !== null ? GALLERY_IMAGES[selectedImage] : null;

  const onLightboxTouchStart = (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const onLightboxTouchEnd = (event) => {
    const touch = event.changedTouches?.[0];
    if (
      !touch ||
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const threshold = 48;

    touchStartX.current = null;
    touchStartY.current = null;

    if (absDx < threshold || absDx < absDy) return;
    if (dx < 0) showNext();
    else showPrev();
  };

  return (
    <section
      id="gallery"
      className="bg-[linear-gradient(180deg,#f5f7fa,#e8edf2)] px-4 py-12 md:px-6 md:py-18"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Photo Gallery"
          title="A closer look at the shop and repair work."
          body="These photos show the people, work areas, and repair steps at Nu Finish."
          dark={false}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
          {GALLERY_IMAGES.map(
            ({ src, alt, title, caption, layout, frame }, index) => (
              <figure
                key={src}
                data-reveal={index % 2 === 0 ? "left" : "right"}
                className={`group overflow-hidden rounded-[22px] border border-black/[8%] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:rounded-[30px] ${index >= 6 && !showAllPhotos ? "max-sm:hidden" : ""} ${layout ?? ""}`}
                style={motionDelay(index * 80)}
              >
                <button
                  type="button"
                  onClick={(event) => openImage(index, event)}
                  className={`relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/45 ${frame ?? "aspect-[4/3]"}`}
                  aria-label={`Open ${title} photo`}
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </button>
                <figcaption className="border-t border-black/[6%] px-3 py-3 sm:px-5 sm:py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-ink">
                    {title}
                  </p>
                  <p className="mt-2 hidden text-sm leading-7 text-slate-600 sm:block">
                    {caption}
                  </p>
                </figcaption>
              </figure>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowAllPhotos((value) => !value)}
          className="mt-5 inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-bold text-slate-900 sm:hidden"
          aria-expanded={showAllPhotos}
        >
          {showAllPhotos ? "Show fewer photos" : "Show all photos"}
        </button>

        {activeImage ? (
          <div
            ref={dialogRef}
            className={`fixed inset-0 z-[90] bg-slate-950/[88%] p-4 backdrop-blur-sm transition-opacity duration-200 md:p-8 ${lightboxPhase === "enter" || lightboxPhase === "closing" ? "opacity-0" : "opacity-100"}`}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeImage.title} image viewer`}
            onClick={closeLightbox}
          >
            <div
              className="mx-auto flex h-full w-full max-w-6xl items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/45"
                aria-label="Close image viewer"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/45 md:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <figure
                className={`w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/20 bg-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-all duration-200 ${lightboxPhase === "enter" ? "scale-[0.985] opacity-0" : ""} ${lightboxPhase === "closing" ? "scale-[0.985] opacity-0" : "scale-100 opacity-100"}`}
              >
                <div
                  className="relative max-h-[78vh] overflow-hidden"
                  onTouchStart={onLightboxTouchStart}
                  onTouchEnd={onLightboxTouchEnd}
                >
                  <img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    className="max-h-[78vh] w-full object-contain"
                  />
                </div>
                <figcaption className="border-t border-white/15 px-5 py-4 text-white md:px-7">
                  <p className="text-xs font-black uppercase tracking-[0.26em] text-brand">
                    {activeImage.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {activeImage.caption}
                  </p>
                </figcaption>
              </figure>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/45 md:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="bg-black px-4 py-12 text-white md:px-6 md:py-18"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Customer Confidence"
          title="What one customer said about the repair experience."
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-5">
          {TESTIMONIALS.map(({ quote, by }, index) => (
            <article
              key={quote}
              data-reveal={index === 0 ? "left" : "right"}
              className="rounded-[28px] border border-white/10 bg-white/5 p-7 transition hover:border-brand/30"
              style={motionDelay(index * 120)}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand">
                <span className="text-3xl font-black">“</span>
              </div>
              <p className="text-base leading-8 text-slate-200">{quote}</p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
                {by}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-white px-4 py-12 md:px-6 md:py-18">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[32px] bg-slate-950 p-8 text-white md:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
            Call us or stop by. We'll take it from there.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">
            Whether insurance is involved or you are paying directly, we will
            explain the estimate, approval, and repair steps.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CONTACT_POINTS.map(({ Icon, label, value }, index) => (
              <div
                key={label}
                className="motion-card rounded-2xl border border-white/10 bg-white/5 p-4"
                style={motionDelay(140 + index * 80)}
              >
                <Icon className="h-5 w-5 text-brand" />
                <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  {label}
                </p>
                {label === "Call" ? (
                  <a
                    href={PHONE_HREF}
                    className="mt-2 inline-flex text-sm leading-7 text-white hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-7 text-white">{value}</p>
                )}
              </div>
            ))}
          </div>

          <CTAGroup />
        </div>

        <div className="rounded-[32px] border border-black/[8%] bg-slate-50 p-8 md:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-ink">
            What to expect
          </p>
          <div className="mt-5 space-y-5 text-sm leading-7 text-slate-600">
            {[
              "Using insurance? Have your claim number and insurance company name handy.",
              "Paying yourself? Same steps. You approve the estimate.",
              "Car can't be driven? Call us first and we'll tell you your options.",
            ].map((item, index) => (
              <div
                key={item}
                className="motion-enter flex gap-3"
                style={motionDelay(180 + index * 70)}
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-ink">
                  <Check className="h-4 w-4" />
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <a
            href={MAP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-black text-brand-ink hover:underline"
          >
            Open directions in Google Maps
            <ChevronRight className="h-4 w-4" />
          </a>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
            <iframe
              title="Nu Finish Collision Center location map"
              src="https://www.google.com/maps?q=1470+Maryland+Highway,+Oakland,+MD+21550&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10 text-slate-400 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <img
            src="/nufinish-logo-192.webp"
            alt="Nu Finish Collision Center badge"
            className="h-24 w-24 object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.3)]"
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Collision repair, painting, and clear updates from the first call
            through pickup.
          </p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
            Explore
          </p>
          <div className="mt-4 space-y-2">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex min-h-11 items-center py-2 text-sm text-slate-400 transition hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
            Contact
          </p>
          <div className="mt-4 space-y-2 text-sm leading-7 text-slate-400">
            <p>{ADDRESS}</p>
            <p>
              <a href={PHONE_HREF} className="hover:text-white hover:underline">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p>Mon-Fri 9:00 AM-5:00 PM</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">
        © {new Date().getFullYear()} Nu Finish Collision Center. Serving Garrett
        County with collision repair, refinishing, and customer-focused care.
      </div>
    </footer>
  );
}

function FloatingCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <a
      href={PHONE_HREF}
      className="motion-glow fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-black text-black shadow-[0_18px_50px_rgba(79,209,60,0.45)] transition hover:bg-brand-hover md:hidden"
    >
      <Phone className="h-4 w-4" />
      Call Now
    </a>
  );
}

export default function NuFinishSite() {
  useRevealObserver();
  return (
    <div className="theme-shell min-h-screen overflow-x-clip bg-white text-slate-950">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <ServicesSection />
        <ProcessSection />
        <BeforeAfterSection />
        <AboutSection />
        <FacilitySection />
        <GallerySection />
        <TestimonialsSection />
        <OwnerSpotlightSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}
