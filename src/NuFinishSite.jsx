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
  Phone,
  Ruler,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";

const PHONE_DISPLAY = "(301) 334-4727";
const PHONE_HREF = "tel:3013344727";
const ADDRESS = "1470 Maryland Highway, Oakland, MD 21550";
const MAP_HREF =
  "https://www.google.com/maps/search/?api=1&query=1470+Maryland+Highway+Oakland+MD+21550";

const NAV = [
  ["services", "Services"],
  ["process", "Process"],
  ["about", "About"],
  ["gallery", "Gallery"],
  ["owner", "Owner"],
  ["contact", "Contact"],
];

const SERVICES = [
  {
    Icon: Wrench,
    title: "Collision Repair",
    desc: "Structural and cosmetic repairs completed with care, accuracy, and a clear communication process from intake through delivery.",
  },
  {
    Icon: SprayGunIcon,
    title: "Paint & Refinishing",
    desc: "Valspar and DeBeer certified refinishing with careful color match work and a 1-year paint warranty for added confidence after delivery.",
  },
  {
    Icon: WindshieldIcon,
    title: "Glass Replacement",
    desc: "Glass replacement is coordinated to keep repairs moving smoothly and to return vehicles safely and cleanly.",
  },
  {
    Icon: Ruler,
    title: "Frame & Unibody Repair",
    desc: "Computerized measuring and straightening tools help restore alignment and structural integrity to manufacturer expectations.",
  },
  {
    Icon: ShieldCheck,
    title: "Insurance Claim Coordination",
    desc: "We work with customers and insurance carriers throughout the repair process to help keep paperwork, approvals, and scheduling moving smoothly.",
  },
  {
    Icon: PartnerServicesIcon,
    title: "Specialty Repair Coordination",
    desc: "When outside specialty work is needed, we coordinate it clearly so you know what is being handled, when it is happening, and what to expect next.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Call or Stop In",
    body: "Bring the vehicle to the shop or call first so the team can begin the intake conversation and explain the next step for your situation.",
  },
  {
    step: "02",
    title: "Inspection & Documentation",
    body: "Damage is reviewed, documented, and organized into the estimate process through the proper insurance or customer-pay channel.",
  },
  {
    step: "03",
    title: "Approval & Scheduling",
    body: "Insurance jobs move forward once the carrier approves the repair plan. Customer-pay work follows the same path, with approval coming directly from the customer.",
  },
  {
    step: "04",
    title: "Repair, Refinish & Coordination",
    body: "Repairs, refinishing, and any needed specialty work are coordinated carefully so the customer knows what is happening and why.",
  },
  {
    step: "05",
    title: "Final Review & Pickup",
    body: "Each vehicle goes through final review before pickup, with completed refinishing work covered by a 1-year paint warranty.",
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
    text: "The facility grew into one of the largest collision-repair operations in the county, with the space and equipment to handle more complex work.",
  },
  {
    year: "Today",
    text: 'John "Grover" Groves is leading the shop forward with the same emphasis on communication, workmanship, and community presence.',
  },
];

const FACILITY = [
  {
    Icon: GarageDoorIcon,
    title: "22-Bay Facility",
    desc: "A large shop footprint helps the team keep work moving while maintaining a cleaner intake-to-delivery workflow.",
  },
  {
    Icon: Ruler,
    title: "Computerized Measuring",
    desc: "Frame and structural repair work is supported by computerized measurement tools for accuracy and repeatability.",
  },
  {
    Icon: PaintBoothIcon,
    title: "Refinishing Environment",
    desc: "Refinishing work is completed in a controlled environment designed to help deliver a cleaner, more consistent finish.",
  },
  {
    Icon: Lock,
    title: "Secure Vehicle Handling",
    desc: "Vehicles remain in a managed repair environment while work is in progress and communication stays centralized.",
  },
  {
    Icon: Award,
    title: "Valspar & DeBeer Certified",
    desc: "Nu Finish is certified with Valspar and DeBeer systems, giving customers confidence in the refinishing products used on their vehicle.",
  },
  {
    Icon: Leaf,
    title: "EPA 6H Paint Team",
    desc: "The refinishing operation highlights trained personnel and responsible paint-process handling across the repair workflow.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Being in an accident is stressful, but they made the entire process so much easier. They kept me updated every step of the way, answered all of my questions, and truly made me feel like they cared.",
    by: "Evelyn S. · Manassas, VA",
  },
  {
    quote:
      "When I picked up my vehicle, I was amazed. It looked absolutely perfect. The quality of the work is outstanding, and their attention to detail is matched by no other.",
    by: "Satisfied customer",
  },
];

const CONTACT_POINTS = [
  { Icon: MapPin, label: "Visit", value: ADDRESS },
  { Icon: Phone, label: "Call", value: PHONE_DISPLAY },
  { Icon: Clock, label: "Hours", value: "Mon-Fri 9:00 AM-5:00 PM" },
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
      "A controlled booth environment supports high-quality refinishing work.",
    frame: "aspect-[4/3]",
  },
  {
    src: "/gallery/curtain-paint-booth.webp",
    alt: "Curtain paint booth area inside Nu Finish",
    title: "Shop Workflow",
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
    still: "/gallery/front-of-building.webp",
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
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 18h14l10 10-7 7 8 8-6 6-8-8-5 5-9-9 5-5-4-14 2-2Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41 21l8-5m-2 13 9 1M18 41l-4 9m10-4 8 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
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
        d="M14 44 20 22c1-3 4-6 8-6h8c4 0 7 3 8 6l6 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 44h28M24 26h16M21 37h22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 48h40"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
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
        d="M12 54V18l4-4h32l4 4v36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24h24M20 31h24M20 38h24M20 45h24"
        stroke="currentColor"
        strokeWidth="3"
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
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 18V12h24v6M20 52h24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M28 26v12m8-12v12m8-12v12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="m50 28 6 4-6 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
        d="M19 20h10l4 5-9 11H14l-4-5 9-11Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 28H35l-4-5 9-11h10l4 5-9 11Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 31h14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22 47h20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
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
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-brand">
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="Nu Finish home"
        >
          <img
            src="/nufinish-wordmark-transparent.png"
            alt="Nu Finish Collision Center"
            className="h-10 w-auto drop-shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className="btn-shine ml-2 rounded-full bg-brand px-4 py-2 text-sm font-black text-black transition hover:bg-brand-hover"
          >
            Call Now
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
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
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,209,60,0.22),_transparent_36%),linear-gradient(135deg,_rgba(0,0,0,0.66),_rgba(0,0,0,0.44)_55%,_rgba(34,165,219,0.10))]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-18 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-24">
        <div className="motion-enter" style={motionDelay(0)}>
          <div className="motion-glow mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-brand">
            Serving Garrett County since 1986
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.02] text-white md:text-6xl">
            Collision repair built on{" "}
            <span className="text-shimmer">
              clear process, precise work, and local trust.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Nu Finish Collision Center has served Garrett County drivers since
            1986 with collision repair, refinishing, and claim coordination
            built around honest communication and quality workmanship.
          </p>

          <div className="motion-enter" style={motionDelay(180)}>
            <CTAGroup />
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Get Started", "Call or stop in to get started"],
              ["Refinishing", "Valspar & DeBeer certified refinishing"],
              ["Warranty", "1-year paint warranty"],
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
            className="motion-card motion-float rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur"
            style={motionDelay(160)}
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              At a glance
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ["22", "Bay facility"],
                ["1997", "Current location since"],
                ["1 Year", "Paint warranty"],
                ["Mon-Fri", "9 AM-5 PM"],
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
    ["Certified", "Valspar & DeBeer refinishing"],
    ["Coordinated", "Insurance and customer-pay workflows"],
    ["Protected", "1-year paint warranty"],
    ["Local", "Garrett County roots since 1986"],
    ["Repaired", "Frame & unibody precision"],
    ["Guided", "Phone-first intake process"],
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
            className="flex min-w-[260px] items-center gap-3 rounded-2xl border border-black/6 bg-white px-5 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
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
  return (
    <section
      id="services"
      className="bg-[linear-gradient(180deg,#ffffff,#f5f7fa)] px-4 py-18 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="What We Do"
          title="Collision repair services built around quality work and clear communication."
          body="From structural repair to refinishing and claim coordination, Nu Finish helps customers move through the repair process with confidence."
          dark={false}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map(({ Icon, title, desc }, index) => (
            <article
              key={title}
              data-reveal
              className="tilt-card group rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_70px_rgba(15,23,42,0.1)]"
              style={motionDelay(index * 90)}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-brand">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-brand/25 bg-slate-950 p-8 text-white md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
              Insurance & customer-pay repairs
            </p>
            <h3 className="mt-3 text-2xl font-black">
              We guide both insurance and customer-pay repairs from intake to
              pickup.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Insurance work and customer-pay work move through the same repair
              process. The difference is simply who approves the estimate before
              repairs begin.
            </p>
          </div>
          <CTAGroup compact />
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="process" className="bg-black px-4 py-18 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Intake & Repair Flow"
          title="A straightforward repair process from first call to final pickup."
          body="We believe customers should understand what happens next, who is responsible for approvals, and how the repair moves forward at each stage."
        />

        <div
          data-reveal="zoom"
          className="mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/5"
          style={motionDelay(60)}
        >
          <div className="relative aspect-[16/8] w-full">
            {prefersReducedMotion ? (
              <img
                src={VIDEO_ASSETS.process.still}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <img
                  src={VIDEO_ASSETS.process.mobileWebp}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover md:hidden"
                />
                <video
                  className="hidden h-full w-full object-cover md:block"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={VIDEO_ASSETS.process.still}
                  aria-hidden="true"
                >
                  <source src={VIDEO_ASSETS.process.desktop} type="video/mp4" />
                </video>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-end p-5 md:p-7">
              <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-100 md:text-base">
                Real work in motion: every repair moves through a documented,
                controlled process before final review and delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {PROCESS.map(({ step, title, body }, index) => (
            <article
              key={step}
              data-reveal
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-brand/40 hover:bg-white/10"
              style={motionDelay(index * 100)}
            >
              <p className="text-3xl font-black text-brand">{step}</p>
              <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
            </article>
          ))}
        </div>

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

function AboutSection() {
  return (
    <section id="about" className="bg-slate-950 px-4 py-18 text-white md:px-6">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            kicker="Our Story"
            title="Serving Garrett County drivers with pride, experience, and personal care."
            body="For decades, Nu Finish has built its reputation on dependable repair work, straight answers, and a commitment to treating every customer with respect."
          />

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
            <img
              src="/nufinish-logo.png"
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
              John "Grover" Groves is the owner presented on the public site,
              and the messaging now avoids outdated ownership, certification,
              and warranty language so customers receive the right information
              the first time.
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
              Every vehicle deserves honest communication, careful repair
              planning, and a finish the customer can drive away feeling
              confident in.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              From the first conversation to final pickup, the goal is simple:
              quality repairs, clear expectations, and service customers can
              trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OwnerSpotlightSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="owner"
      className="bg-[linear-gradient(180deg,#f8fafc,#eef3f8)] px-4 py-18 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Beyond The Shop"
          title="A closer look at owner John Groves and his connection to local motorsports."
          body="Outside Nu Finish, John competes with WG Motorsports on regional dirt tracks. It is a personal pursuit that reflects discipline and attention to detail, while the shop remains fully focused on collision repair and refinishing."
          dark={false}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            data-reveal="left"
            className="overflow-hidden rounded-[30px] border border-black/10 bg-black shadow-[0_22px_60px_rgba(15,23,42,0.14)]"
            style={motionDelay(40)}
          >
            <div className="relative aspect-[16/9] w-full">
              {prefersReducedMotion ? (
                <img
                  src={VIDEO_ASSETS.motorsports.still}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={VIDEO_ASSETS.motorsports.mobileWebp}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover md:hidden"
                  />
                  <video
                    className="hidden h-full w-full object-cover md:block"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={VIDEO_ASSETS.motorsports.still}
                    aria-hidden="true"
                  >
                    <source
                      src={VIDEO_ASSETS.motorsports.desktop}
                      type="video/mp4"
                    />
                  </video>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand">
                  John Groves · Owner Spotlight
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/90">
                  Motorsport is a personal chapter of John's story and a
                  reflection of his roots in the local community. It remains
                  separate from Nu Finish services and day-to-day shop work.
                </p>
              </div>
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
              The same standards customers value at Nu Finish remain the top
              priority.
            </h3>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                Customers rely on Nu Finish for precise collision repairs,
                professional refinishing, and clear communication from intake
                through delivery.
              </p>
              <p>
                Featuring this part of John's life provides context about the
                owner behind the business and his long-standing presence in
                Garrett County.
              </p>
              <p>
                The mission does not change: quality workmanship, dependable
                timelines, and a finished vehicle customers can leave with
                confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilitySection() {
  return (
    <section className="bg-white px-4 py-18 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Facility & Certifications"
          title="The tools, space, and training to handle repairs with confidence."
          body="Nu Finish combines facility capacity, refinishing certifications, and experienced repair personnel to help customers feel confident in the work being done."
          dark={false}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FACILITY.map(({ Icon, title, desc }, index) => (
            <article
              key={title}
              data-reveal={index % 2 === 0 ? "left" : "right"}
              className="tilt-card rounded-[28px] border border-black/8 bg-slate-50 p-6"
              style={motionDelay(index * 85)}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-brand">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxPhase, setLightboxPhase] = useState("closed");
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const openImage = (index) => {
    setLightboxPhase(prefersReducedMotion ? "open" : "enter");
    setSelectedImage(index);
  };
  const closeLightbox = () => {
    if (selectedImage === null || lightboxPhase === "closing") return;
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
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    };

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
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
      className="bg-[linear-gradient(180deg,#f5f7fa,#e8edf2)] px-4 py-18 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Photo Gallery"
          title="A closer look at the shop, the process, and the work environment."
          body="These photos give a closer look at the people, spaces, and repair stages that shape the work done every day at Nu Finish."
          dark={false}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {GALLERY_IMAGES.map(
            ({ src, alt, title, caption, layout, frame }, index) => (
              <figure
                key={src}
                data-reveal={index % 2 === 0 ? "left" : "right"}
                className={`group overflow-hidden rounded-[30px] border border-black/8 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ${layout ?? ""}`}
                style={motionDelay(index * 80)}
              >
                <button
                  type="button"
                  onClick={() => openImage(index)}
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
                <figcaption className="border-t border-black/6 px-5 py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-ink">
                    {title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {caption}
                  </p>
                </figcaption>
              </figure>
            ),
          )}
        </div>

        {activeImage ? (
          <div
            className={`fixed inset-0 z-[90] bg-slate-950/88 p-4 backdrop-blur-sm transition-opacity duration-200 md:p-8 ${lightboxPhase === "enter" || lightboxPhase === "closing" ? "opacity-0" : "opacity-100"}`}
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
    <section className="bg-black px-4 py-18 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Customer Confidence"
          title="The strongest proof is still the finished vehicle and the customer experience around it."
          align="center"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
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
    <section id="contact" className="bg-white px-4 py-18 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[32px] bg-slate-950 p-8 text-white md:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
            Contact & Intake
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
            Call first, stop in, and let the shop guide the process from there.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">
            Whether you are working through an insurance claim or paying for a
            repair directly, the team will walk you through the process and help
            you understand what comes next.
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
                <p className="mt-2 text-sm leading-7 text-white">{value}</p>
              </div>
            ))}
          </div>

          <CTAGroup />
        </div>

        <div className="rounded-[32px] border border-black/8 bg-slate-50 p-8 md:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand-ink">
            What to expect
          </p>
          <div className="mt-5 space-y-5 text-sm leading-7 text-slate-600">
            {[
              "Insurance customers should have claim details available when calling or visiting the shop.",
              "Customer-pay clients follow the same repair path, but estimate approval comes directly from the customer.",
              "If your vehicle is not drivable, call the shop so the team can explain the best next step for getting the repair process started.",
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
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-brand-ink hover:underline"
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
            src="/nufinish-logo.png"
            alt="Nu Finish Collision Center badge"
            className="h-24 w-24 object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.3)]"
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Our mission is to restore every vehicle with precision, communicate
            clearly at every step, and deliver repairs customers can trust from
            intake to pickup.
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
                className="block text-sm text-slate-400 transition hover:text-white"
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
            <p>{PHONE_DISPLAY}</p>
            <p>Mon-Fri 9:00 AM-5:00 PM</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">
        © {new Date().getFullYear()} Nu Finish Collision Center. Serving Garrett
        County with collision repair, refinishing, and customer care.
      </div>
    </footer>
  );
}

function FloatingCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll);
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
    <div className="theme-shell min-h-screen bg-white text-slate-950">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TrustBar />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <FacilitySection />
      <GallerySection />
      <TestimonialsSection />
      <OwnerSpotlightSection />
      <ContactSection />
      <Footer />
      <FloatingCallButton />
    </div>
  );
}
