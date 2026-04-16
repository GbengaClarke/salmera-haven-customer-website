import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import CompanyLogo from "./CompanyLogo";
import Image from "next/image";

const FOOTER_LINKS = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Featured Rooms", href: "#rooms" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Room Service", href: "#" },
    { name: "Event Spaces", href: "#" },
    { name: "Wellness Spa", href: "#" },
    { name: "Concierge", href: "#" },
  ],
};

export default function Footer() {
  const today = new Date().getFullYear();

  return (
    <footer className="mt-6 border-t border-white/5 bg-indigo-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-6">
            <div className="brdx flex items-center gap-1 md:items-start">
              <div className="relative h-12 w-15 overflow-hidden shadow-2xl md:-mt-3 lg:hidden">
                <Image
                  src="/icon.png"
                  alt="Luxury Interior Detail"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>
              <h2 className="font-cormorant text-2xl tracking-widest whitespace-nowrap text-white uppercase md:text-2xl">
                Salmera Haven
              </h2>
            </div>
            {/* <CompanyLogo contStyle="gap-2" imageSize="h-13 w-15" textStyle="font-cormorant whitespace-nowrap text-3xl text-white tracking-widest uppercase"/> */}

            <p className="max-w-xs text-sm leading-relaxed font-light text-slate-400">
              Redefining luxury living through architectural elegance and
              unparalleled service. Your sanctuary, meticulously crafted.
            </p>
            <div className="flex gap-5 text-slate-400">
              <a className="transition-colors hover:text-white">
                <FaFacebookF size={18} />
              </a>
              <a className="transition-colors hover:text-white">
                <FaInstagram size={18} />
              </a>
              <a className="transition-colors hover:text-white">
                <FaXTwitter size={18} />
              </a>
              <a className="transition-colors hover:text-white">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Discovery
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    // href={link.href}
                    className="text-sm font-light transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Experience
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <a
                    // href={link.href}
                    className="text-sm font-light transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Newsletter
            </h3>
            <p className="text-sm font-light text-slate-400">
              Subscribe to receive updates on exclusive offers and new openings.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="border border-white/10 bg-indigo-900/50 px-4 py-3 text-white transition-colors placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              />
              <button className="bg-white px-6 py-3 text-xs font-bold tracking-widest text-indigo-950 uppercase transition-colors hover:bg-indigo-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] tracking-[0.3em] text-slate-500 uppercase md:mt-24 md:flex-row">
          <p className="text-center">
            ©{today} Salmera Haven. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a className="transition-colors hover:text-white">Privacy Policy</a>
            <a className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
