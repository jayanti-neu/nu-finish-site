import { useState, useEffect } from "react";
import {
  Wrench,
  SprayCan,
  Sparkles,
  CarFront,
  Ruler,
  ShieldCheck,
  Warehouse,
  Lock,
  Award,
  Leaf,
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
} from "lucide-react";

const NAV = ["Home", "Services", "About", "Contact", "Admin"];

const SERVICES = [
  {
    Icon: Wrench,
    title: "Collision Repair",
    desc: "Structural and cosmetic restoration using computerized measuring systems to bring your vehicle back to factory tolerances.",
  },
  {
    Icon: SprayCan,
    title: "Paint & Refinishing",
    desc: "Valspar and DeBeer certified refinishing with a 1-year paint warranty. Our color-match system guarantees a seamless finish.",
  },
  {
    Icon: Sparkles,
    title: "Paintless Dent Repair",
    desc: "Quick turnaround for minor dings and dents — no repainting needed.",
  },
  {
    Icon: CarFront,
    title: "Glass Replacement",
    desc: "OEM-grade windshields and calibrations for all makes and models.",
  },
  {
    Icon: Ruler,
    title: "Frame & Unibody Alignment",
    desc: "Our $30K laser measuring system restores structural integrity to exact manufacturer specifications.",
  },
  {
    Icon: ShieldCheck,
    title: "Insurance Claim Handling",
    desc: "We handle direct billing to all major carriers — you don't have to deal with the paperwork.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Bring It In",
    desc: "Drop off your vehicle anytime Monday–Friday. Walk-ins always welcome.",
  },
  {
    n: "02",
    title: "Free Estimate",
    desc: "We assess the damage and provide a detailed estimate at no cost.",
  },
  {
    n: "03",
    title: "We Handle Insurance",
    desc: "We work directly with your insurer and handle all the paperwork.",
  },
  {
    n: "04",
    title: "Expert Repair",
    desc: "Our I-CAR certified technicians get to work using Valspar and DeBeer products and computerized equipment.",
  },
  {
    n: "05",
    title: "Pick It Up",
    desc: "Drive away with confidence — all paint is backed by a 1-year warranty.",
  },
];

const TIMELINE = [
  { year: "1986", text: "Body shop founded in Oakland by Steve Davis." },
  {
    year: "1997",
    text: "Relocated to 1470 Maryland Hwy and expanded floor space.",
  },
  {
    year: "2000s",
    text: "Earned certified refinish-facility status with a nationwide paint warranty.",
  },
  {
    year: "2010s",
    text: "Grew into the largest collision center in Garrett County with 22 bays.",
  },
  {
    year: "2020",
    text: 'Long-time team leader John "Grover" Groves stepped into shop leadership, retaining all staff.',
  },
  {
    year: "2025",
    text: "Celebrating 39 years of service with 2 EPA 6H-certified painters and 5 repair technicians.",
  },
];

const JOB_STATUSES = [
  "Received / Awaiting Assessment",
  "Estimate Ready",
  "Waiting for Parts",
  "In Repair",
  "In Paint",
  "Final Inspection",
  "Ready for Pickup",
];
const STATUS_COLORS = [
  "bg-gray-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-purple-400",
  "bg-cyan-500",
  "bg-green-500",
];
const INIT_JOBS = [
  {
    id: "NF-1042",
    customer: "Maria Santos",
    phone: "301-555-0192",
    vehicle: "2019 Honda Civic - Silver",
    status: 4,
    eta: "Feb 24, 2026",
    note: "Waiting on bumper cover from supplier.",
  },
  {
    id: "NF-1041",
    customer: "Tom Bradley",
    phone: "301-555-0847",
    vehicle: "2021 Ford F-150 - Blue",
    status: 6,
    eta: "Feb 20, 2026",
    note: "Ready! Please call to schedule pickup.",
  },
  {
    id: "NF-1040",
    customer: "Diane Cho",
    phone: "301-555-0334",
    vehicle: "2017 Toyota Camry - White",
    status: 2,
    eta: "Feb 28, 2026",
    note: "Parts ordered, arriving Thursday.",
  },
];

// ── SHARED ─────────────────────────────────────────────────────
function Badge({ children }) {
  return (
    <span className="inline-block bg-brand/15 text-brand-ink text-xs font-semibold px-3 py-1 rounded-full mb-3">
      {children}
    </span>
  );
}
function SectionTitle({ badge, title, sub }) {
  return (
    <div className="text-center mb-10">
      {badge && <Badge>{badge}</Badge>}
      <h2 className="text-3xl font-black text-gray-900">{title}</h2>
      {sub && (
        <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">{sub}</p>
      )}
    </div>
  );
}
function ProgressBar({ statusIdx, color }) {
  const pct = Math.round(((statusIdx + 1) / JOB_STATUSES.length) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
      <div
        className={`${color} h-2 rounded-full transition-all`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
function EstimateBtn() {
  return (
    <div className="text-center mt-10">
      <a
        href="tel:3013344727"
        className="inline-block bg-brand text-black font-bold px-8 py-3 rounded-lg hover:bg-brand-hover transition"
      >
        📞 Call (301) 334-4727
      </a>
    </div>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setPage("Home")}
          aria-label="Nu Finish Collision Center — home"
          className="cursor-pointer"
        >
          <img
            src="/nufinish-wordmark.png"
            alt="Nu Finish Collision Center"
            className="h-9 w-auto"
          />
        </button>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${page === n ? "bg-brand text-black" : "text-gray-300 hover:bg-white/10"} ${n === "Admin" ? "border border-white/20" : ""}`}
            >
              {n === "Admin" ? "🔧 Admin" : n}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 pb-3 space-y-1">
          {NAV.map((n) => (
            <button
              key={n}
              onClick={() => {
                setPage(n);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${page === n ? "bg-brand text-black" : "text-gray-300"}`}
            >
              {n === "Admin" ? "🔧 Admin" : n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── HOME ───────────────────────────────────────────────────────
function FloatingCallButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <a
      href="tel:3013344727"
      className="fixed bottom-5 right-5 bg-brand text-black font-bold px-5 py-3 rounded-full shadow-lg hover:bg-brand-hover transition z-50 flex items-center gap-2 md:hidden"
    >
      📞 Call Now
    </a>
  );
}

function Home({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom"
          style={{ backgroundImage: "url('/race-car.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/10"
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-40">
          <Badge>Serving Garrett County Since 1986</Badge>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3">
            Trusted Collision Repair
            <br />
            <span className="text-brand">in Garrett County Since 1986</span>
          </h1>
          <p className="text-gray-300 max-w-md mb-8 text-lg">
            Family-run, certified, and committed to a quality finish.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:3013344727"
              className="bg-brand hover:bg-brand-hover text-black font-bold px-6 py-3 rounded-lg transition text-lg"
            >
              📞 Call (301) 334-4727
            </a>
            <button
              onClick={() => setPage("Contact")}
              className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition text-lg"
            >
              📍 Visit the Shop
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-4">
            Mon–Fri 9am–5pm · Walk-ins welcome · (301) 334-4727
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-brand text-black">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ["39+", "Years in Business"],
            ["22", "Bay Facility"],
            ["1-Year", "Paint Warranty"],
            ["Insurance", "Direct Billing"],
          ].map(([val, lbl]) => (
            <div key={lbl}>
              <p className="text-2xl font-black">{val}</p>
              <p className="text-gray-800 text-sm">{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services preview */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            badge="What We Do"
            title="Our Services"
            sub="From minor dings to major collisions, our certified team handles it all."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {SERVICES.slice(0, 4).map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <s.Icon className="w-8 h-8 text-brand-ink" strokeWidth={1.75} />
                <h3 className="font-bold text-gray-800 mt-2 mb-1 text-sm">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setPage("Services")}
              className="text-brand-ink font-semibold text-sm hover:underline"
            >
              View all services →
            </button>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle badge="Simple Process" title="How It Works" />
          <div className="flex flex-col md:flex-row gap-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex-1 border border-gray-100 rounded-xl p-5 bg-gray-50"
              >
                <span className="text-brand-ink font-black text-2xl">
                  {s.n}
                </span>
                <h4 className="font-bold text-gray-800 mt-1 mb-1">{s.title}</h4>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
          <EstimateBtn />
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-black py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle badge="What Customers Say" title="Testimonials" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "Service was always good and quality of repairs were always great.",
                attr: "Verified Customer",
              },
              {
                quote:
                  "In operation 39 years — they gladly work with all insurance companies and do excellent work.",
                attr: "Verified Customer",
              },
            ].map(({ quote, attr }) => (
              <div
                key={attr + quote}
                className="bg-white/10 border border-white/20 rounded-2xl p-6"
              >
                <p className="text-white text-sm leading-relaxed italic">
                  "{quote}"
                </p>
                <p className="text-gray-400 text-xs mt-3">— {attr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Car Tracker Coming Soon */}
      <div className="bg-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-brand text-black text-xs font-black px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Coming Soon
            </span>
            <h2 className="text-3xl font-black text-white mb-3">
              Track Your Vehicle Online
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              Soon you'll be able to get automatic SMS updates on your repair —
              no phone call needed. We'll text you at every step of the process.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 max-w-sm">
              <p className="text-gray-400 text-xs mb-2 font-semibold uppercase">
                Get notified when it launches
              </p>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  placeholder="Your phone number"
                />
                <button className="bg-brand text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-hover transition">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
          {/* SMS mockup */}
          <div className="bg-gray-900 rounded-3xl p-4 shadow-xl max-w-xs mx-auto w-full border-4 border-gray-700">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <p className="text-gray-400 text-xs flex-1 text-center">
                Nu Finish Collision Center
              </p>
              <div className="w-2 h-2 rounded-full bg-gray-600" />
            </div>
            <div className="space-y-2">
              {[
                {
                  txt: "Hi Maria! Your 2019 Honda Civic is now IN PAINT. Est. ready: Feb 24. We'll text you when it's done!",
                  time: "9:14 AM",
                },
                {
                  txt: "Update: Your car has passed Final Inspection and is READY FOR PICKUP! Call us at (301) 334-4727. Thanks for choosing Nu Finish!",
                  time: "2:31 PM",
                },
              ].map((m, i) => (
                <div key={i} className="flex flex-col items-start">
                  <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-xs">
                    <p className="text-xs leading-relaxed">{m.txt}</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 ml-1">{m.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact strip */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <SectionTitle
            badge="Find Us"
            title="Come See Us"
            sub="Located on Maryland Highway in Oakland — easy to find, walk-ins always welcome."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              {
                Icon: MapPin,
                label: "Address",
                val: "1470 Maryland Hwy\nOakland, MD 21550",
              },
              { Icon: Phone, label: "Phone", val: "(301) 334-4727" },
              {
                Icon: Clock,
                label: "Hours",
                val: "Mon–Fri: 9am–5pm\nSat–Sun: Closed",
              },
            ].map(({ Icon, label, val }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-5">
                <Icon
                  className="w-6 h-6 text-brand-ink mx-auto"
                  strokeWidth={1.75}
                />
                <p className="font-bold text-gray-800 mt-2 mb-1 text-sm">
                  {label}
                </p>
                <p className="text-gray-500 text-xs whitespace-pre-line">
                  {val}
                </p>
              </div>
            ))}
          </div>
          <a
            href="tel:3013344727"
            className="inline-block mt-8 bg-brand text-black font-bold px-8 py-3 rounded-lg hover:bg-brand-hover transition"
          >
            📞 Call (301) 334-4727
          </a>
        </div>
      </div>

      <FloatingCallButton />
    </div>
  );
}

// ── SERVICES ───────────────────────────────────────────────────
function Services() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionTitle
        badge="Our Services"
        title="Everything We Offer"
        sub="Valspar & DeBeer certified, I-CAR trained, and equipped with a $30K laser frame system."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <s.Icon className="w-10 h-10 text-brand-ink" strokeWidth={1.75} />
            <h3 className="font-bold text-gray-800 mt-3 mb-2 text-lg">
              {s.title}
            </h3>
            <p className="text-gray-500 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-brand/10 border border-brand/30 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-black text-gray-900 mb-2">
          Not sure what you need?
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Give us a call and we'll point you in the right direction — no
          appointment needed Monday through Friday.
        </p>
        <a
          href="tel:3013344727"
          className="bg-brand text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-hover transition inline-block"
        >
          📞 (301) 334-4727
        </a>
      </div>
    </div>
  );
}

// ── ABOUT ──────────────────────────────────────────────────────
function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionTitle badge="Our Story" title="About Nu Finish" />

      <div className="flex justify-center mb-12">
        <img
          src="/nufinish-logo.png"
          alt="Nu Finish Collision Center logo"
          className="w-40 h-40 md:w-48 md:h-48 object-contain"
        />
      </div>

      {/* Narrative */}
      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            Nu Finish Collision Center has been serving Oakland, Maryland and
            Garrett County since <strong>1986</strong>, when founder Steve Davis
            opened the shop with a simple commitment: do the job right. Over the
            decades, the business relocated to its current 1470 Maryland Hwy
            facility, became a{" "}
            <strong>Valspar &amp; DeBeer Certified Refinish Facility</strong>,
            and grew into the largest collision center in Garrett County.
          </p>
          <p>
            In March 2020, long-time team leader{" "}
            <strong>John "Grover" Groves</strong> stepped into shop leadership —
            keeping every staff member and continuing the same standards that
            built the shop's reputation over 30+ years.
          </p>
          <p>
            Today the shop employs{" "}
            <strong>2 EPA 6H-certified paint technicians</strong> and{" "}
            <strong>5 I-CAR-certified collision technicians</strong>, operating
            out of a 22-bay facility equipped with computerized
            frame-straightening and downdraft paint booths.
          </p>
        </div>
        <div className="space-y-3">
          {[
            [
              "Valspar & DeBeer Certified Refinish Facility",
              "1-year nationwide paint warranty on every job.",
            ],
            [
              "I-CAR Certified Technicians",
              "Our team maintains Gold-Class–level training on the latest vehicle standards.",
            ],
            [
              "EPA 6H Compliant",
              "Environmentally responsible spray operations certified by the EPA.",
            ],
            [
              "All Insurance Welcome",
              "We handle direct billing to all major carriers — no hassle for you.",
            ],
            [
              "Community Sponsors",
              "Proud supporters of local racing and Garrett County events.",
            ],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-brand-ink text-lg mt-0.5">✓</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-14">
        <SectionTitle badge="Our History" title="39 Years in the Making" />
        <div className="relative border-l-2 border-brand/30 ml-4 space-y-6">
          {TIMELINE.map(({ year, text }) => (
            <div key={year} className="pl-6 relative">
              <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-brand border-2 border-white" />
              <p className="text-brand-ink font-black text-sm">{year}</p>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet the owner */}
      <div className="mb-14">
        <SectionTitle badge="The Team" title="Meet the Owner" />
        <div className="grid gap-6 max-w-md mx-auto">
          {[
            {
              name: 'John "Grover" Groves',
              role: "Owner · Production Director",
              bio: "A Swanton, MD native, Grover manages workflow and quality control on the shop floor. He's also a long-time sponsor of area motorsports and local Garrett County events.",
            },
          ].map(({ name, role, bio }) => (
            <div
              key={name}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-full bg-brand/15 flex items-center justify-center mb-4">
                <User className="w-7 h-7 text-brand-ink" strokeWidth={1.75} />
              </div>
              <h3 className="font-black text-gray-900 text-lg">{name}</h3>
              <p className="text-brand-ink text-xs font-semibold mb-2">{role}</p>
              <p className="text-gray-500 text-sm">{bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Facility */}
      <div className="mb-10">
        <SectionTitle badge="Our Facility" title="Built for the Work" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            [
              Warehouse,
              "22 Repair Bays",
              "12 oversized 10-ft doors handle everything from compact cars to full-size trucks.",
            ],
            [
              Ruler,
              "Laser Frame System",
              "$30K computerized frame-straightening restores structural integrity to factory specs.",
            ],
            [
              SprayCan,
              "Downdraft Paint Booths",
              "Valspar & DeBeer-equipped booths guarantee a dust-free, baked finish every time.",
            ],
            [
              Lock,
              "Secured Vehicle Storage",
              "Your vehicle is safe with us while repairs are underway.",
            ],
            [
              Award,
              "Valspar & DeBeer Certified",
              "A certified Valspar & DeBeer refinish facility serving the region.",
            ],
            [
              Leaf,
              "EPA 6H Compliant",
              "Environmentally responsible painting operations — certified and verified.",
            ],
          ].map(([Icon, title, desc]) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
            >
              <Icon className="w-8 h-8 text-brand-ink" strokeWidth={1.75} />
              <h4 className="font-bold text-gray-800 mt-2 mb-1 text-sm">
                {title}
              </h4>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community */}
      <div className="bg-brand/10 border border-brand/30 rounded-2xl p-8 text-center mb-10">
        <span className="text-3xl">🏁</span>
        <h3 className="font-black text-gray-900 text-xl mt-3 mb-2">
          Community Involvement
        </h3>
        <p className="text-gray-600 text-sm max-w-lg mx-auto">
          Nu Finish is proud to sponsor local racing teams and Garrett County
          events, including our #32 dirt late model. Supporting the community
          that has supported us for nearly 40 years.
        </p>
      </div>

      <EstimateBtn />
    </div>
  );
}

// ── CONTACT ────────────────────────────────────────────────────
function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionTitle
        badge="Get In Touch"
        title="Contact Us"
        sub="Give us a call or stop by the shop Monday through Friday. Walk-ins are always welcome."
      />
      <div className="grid md:grid-cols-2 gap-10">
        {/* Call / visit CTA */}
        <div className="bg-black rounded-2xl p-8 text-white flex flex-col justify-center">
          <h3 className="font-black text-2xl mb-2">Stop By the Shop</h3>
          <p className="text-gray-300 text-sm mb-6">
            Give us a call or bring your vehicle by and we'll take a look. We
            work directly with your insurance company and handle the claim from
            start to finish.
          </p>
          <a
            href="tel:3013344727"
            className="bg-brand text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-hover transition text-center text-lg mb-3"
          >
            📞 Call (301) 334-4727
          </a>
          <p className="text-gray-400 text-xs text-center">
            Mon–Fri 9am–5pm · Walk-ins welcome
          </p>
        </div>

        {/* Info cards */}
        <div className="space-y-4">
          {[
            {
              Icon: MapPin,
              title: "Address",
              body: "1470 Maryland Hwy\nOakland, MD 21550",
            },
            { Icon: Phone, title: "Shop Phone", body: "(301) 334-4727" },
            { Icon: Mail, title: "Email", body: "nufinish2020@gmail.com" },
            {
              Icon: Clock,
              title: "Business Hours",
              body: "Monday – Friday: 9:00 AM – 5:00 PM\nSaturday & Sunday: Closed",
            },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="flex gap-4 bg-gray-50 rounded-xl p-4">
              <Icon
                className="w-6 h-6 text-brand-ink shrink-0"
                strokeWidth={1.75}
              />
              <div>
                <p className="font-bold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-500 text-xs mt-0.5 whitespace-pre-line">
                  {body}
                </p>
              </div>
            </div>
          ))}
          <div className="bg-brand/10 border border-brand/30 rounded-xl p-4 text-sm text-brand-ink">
            <strong>Walk-ins welcome!</strong> Stop by anytime Mon–Fri — no
            appointment needed.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN ──────────────────────────────────────────────────────
function Admin() {
  const [jobs, setJobs] = useState(INIT_JOBS);
  const [selected, setSelected] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newJob, setNewJob] = useState({
    customer: "",
    phone: "",
    vehicle: "",
    eta: "",
  });

  const openJob = (j) => {
    setSelected(j);
    setEditNote(j.note);
  };
  const saveNote = () => {
    setJobs((js) =>
      js.map((j) => (j.id === selected.id ? { ...j, note: editNote } : j)),
    );
    setSelected((s) => ({ ...s, note: editNote }));
  };
  const updateStatus = (d) => {
    const ns = Math.min(
      JOB_STATUSES.length - 1,
      Math.max(0, selected.status + d),
    );
    setJobs((js) =>
      js.map((j) => (j.id === selected.id ? { ...j, status: ns } : j)),
    );
    setSelected((s) => ({ ...s, status: ns }));
  };
  const addJob = () => {
    if (!newJob.customer || !newJob.phone || !newJob.vehicle) return;
    const id = `NF-${1043 + jobs.length}`;
    setJobs((js) => [{ id, ...newJob, status: 0, note: "" }, ...js]);
    setNewJob({ customer: "", phone: "", vehicle: "", eta: "" });
    setShowAdd(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Job Tracker</h2>
          <p className="text-gray-500 text-sm">
            Admin Panel · {jobs.length} active jobs
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-brand text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-brand-hover transition"
        >
          + New Job
        </button>
      </div>

      {showAdd && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 space-y-3 shadow">
          <h3 className="font-bold text-gray-800">Add New Job</h3>
          {[
            ["customer", "Customer name"],
            ["phone", "Phone number"],
            ["vehicle", "Year, Make, Model, Color"],
            ["eta", "Est. ready date"],
          ].map(([k, ph]) => (
            <input
              key={k}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder={ph}
              value={newJob[k]}
              onChange={(e) =>
                setNewJob((n) => ({ ...n, [k]: e.target.value }))
              }
            />
          ))}
          <div className="flex gap-2">
            <button
              onClick={addJob}
              className="bg-brand text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-hover transition"
            >
              Add Job
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="text-gray-500 text-sm px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => openJob(job)}
            className={`bg-white rounded-2xl shadow-sm p-4 cursor-pointer hover:shadow-md transition border-2 ${selected?.id === job.id ? "border-brand" : "border-transparent"}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400 font-semibold">{job.id}</p>
                <p className="font-bold text-gray-800">{job.customer}</p>
                <p className="text-sm text-gray-500">{job.vehicle}</p>
                <p className="text-xs text-gray-400">{job.phone}</p>
              </div>
              <span
                className={`${STATUS_COLORS[job.status]} text-white text-xs font-semibold px-3 py-1 rounded-full`}
              >
                {JOB_STATUSES[job.status]}
              </span>
            </div>
            <ProgressBar
              statusIdx={job.status}
              color={STATUS_COLORS[job.status]}
            />
          </div>
        ))}
      </div>

      {selected && (
        <div className="bg-white rounded-2xl shadow border-2 border-brand p-6 space-y-5">
          <div>
            <p className="text-xs text-gray-400 font-semibold">{selected.id}</p>
            <h3 className="font-black text-gray-900 text-lg">
              {selected.customer}
            </h3>
            <p className="text-gray-500 text-sm">
              {selected.vehicle} · {selected.phone}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-2">
              Update Status
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => updateStatus(-1)}
                disabled={selected.status === 0}
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 font-bold px-3 py-1 rounded-lg text-xl transition"
              >
                ‹
              </button>
              <span
                className={`${STATUS_COLORS[selected.status]} text-white text-sm font-semibold px-3 py-1 rounded-full`}
              >
                {JOB_STATUSES[selected.status]}
              </span>
              <button
                onClick={() => updateStatus(1)}
                disabled={selected.status === JOB_STATUSES.length - 1}
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 font-bold px-3 py-1 rounded-lg text-xl transition"
              >
                ›
              </button>
            </div>
            <ProgressBar
              statusIdx={selected.status}
              color={STATUS_COLORS[selected.status]}
            />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold mb-2">
              Customer-Facing Note
            </p>
            <textarea
              rows={3}
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none"
              placeholder="Leave a note the customer will see..."
            />
            <button
              onClick={saveNote}
              className="mt-2 bg-brand text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-hover transition"
            >
              Save Note
            </button>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
            📱 In the real app, saving will automatically SMS{" "}
            <strong>{selected.phone}</strong> with the update.
          </div>
        </div>
      )}
    </div>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="bg-black text-gray-400 text-sm px-6 py-10">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 mb-8">
        <div>
          <img
            src="/nufinish-badge-dark.jpg"
            alt="Nu Finish Collision Center"
            className="w-24 h-24 rounded-full mb-3"
          />
          <p className="text-xs">
            Serving Garrett County since 1986.
            <br />
            Family-run. Certified. Committed.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Quick Links</p>
          {NAV.filter((n) => n !== "Admin").map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className="block text-xs text-gray-400 hover:text-white mb-1"
            >
              {n}
            </button>
          ))}
        </div>
        <div>
          <p className="text-white font-semibold mb-2">Contact</p>
          <p className="text-xs">1470 Maryland Hwy, Oakland, MD 21550</p>
          <p className="text-xs mt-1">📞 (301) 334-4727</p>
          <p className="text-xs">✉️ nufinish2020@gmail.com</p>
          <p className="text-xs mt-1">Mon–Fri: 9am–5pm</p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Nu Finish Collision Center. All rights
        reserved.
      </div>
    </footer>
  );
}

// ── ROOT ───────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const PAGES = { Home, Services, About, Contact, Admin };
  const PageComponent = PAGES[page];
  const setPageTop = (p) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };
  return (
    <div className="font-sans bg-white min-h-screen">
      <Navbar page={page} setPage={setPageTop} />
      <PageComponent setPage={setPageTop} />
      <Footer setPage={setPageTop} />
    </div>
  );
}
