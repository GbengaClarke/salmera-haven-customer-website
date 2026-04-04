

import { FaFacebookF,  FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
  return (
    <footer className="bg-indigo-950 text-slate-300 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <h2 className="font-cormorant text-3xl text-white tracking-widest uppercase">
              Salmera Haven
            </h2>
            <p className="font-light leading-relaxed text-sm text-slate-400 max-w-xs">
              Redefining luxury living through architectural elegance and 
              unparalleled service. Your sanctuary, meticulously crafted.
            </p>
            <div className="flex gap-5 text-slate-400">
              <a href="#" className="hover:text-white transition-colors"><FaFacebookF size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaInstagram size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaXTwitter size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaLinkedinIn size={18} /></a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-6">
            <h3 className="text-white text-sm uppercase tracking-[0.2em] font-semibold">Discovery</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm font-light hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h3 className="text-white text-sm uppercase tracking-[0.2em] font-semibold">Experience</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm font-light hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h3 className="text-white text-sm uppercase tracking-[0.2em] font-semibold">Newsletter</h3>
            <p className="text-sm font-light text-slate-400">
              Subscribe to receive updates on exclusive offers and new openings.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-indigo-900/50 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
              />
              <button className="bg-white text-indigo-950 px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-indigo-100 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-slate-500">
          <p>© 2026 Salmera Haven. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}