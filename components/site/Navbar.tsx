"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, site, whatsappLink, whatsappMessages } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Actieve sectie markeren
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobiel menu: scroll lock, Escape, focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Wacht één frame tot het menu zichtbaar is, dan focus naar de eerste link
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus({ preventScroll: true }));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        Naar de inhoud
      </a>
      <div
        className={`relative z-[2] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-[4.5rem] items-center justify-between gap-6" aria-label="Hoofdmenu">
          <a href="#home" className="group relative z-[2] flex items-baseline gap-2 leading-none" aria-label={`${site.fullName}, naar boven`}>
            <span className="heading text-[1.3rem] tracking-[-0.03em]">{site.brand}</span>
            <span className="h-[0.9rem] w-px translate-y-[1px] bg-line-strong" aria-hidden />
            <span className="text-[0.9rem] text-mist transition-colors group-hover:text-paper">{site.brandSuffix}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-300 ${
                    active === item.href ? "text-paper" : "text-mist hover:text-paper"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      active === item.href ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-[2] flex items-center gap-2">
            <a
              href={whatsappLink(whatsappMessages.quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden !min-h-[2.75rem] !px-5 !text-[0.9375rem] sm:inline-flex"
            >
              Vraag een website aan
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong lg:hidden"
            >
              <span className="sr-only">{open ? "Menu sluiten" : "Menu openen"}</span>
              <span className="relative block h-3 w-[18px]" aria-hidden>
                <span className={`absolute left-0 top-0 h-[1.5px] w-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobiel menu */}
      <div
        id="mobiel-menu"
        className={`fixed inset-0 z-[1] bg-ink/97 backdrop-blur-2xl lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        // Zichtbaarheid direct aan bij openen (zodat focus werkt), pas uit na de fade bij sluiten
        style={{ transition: open ? "opacity 0.5s ease" : "opacity 0.5s ease, visibility 0s linear 0.5s" }}
        aria-hidden={!open}
      >
        <div className="container-x flex h-full flex-col pb-8 pt-28">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-line">
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={`display flex items-baseline justify-between py-4 text-[2.5rem] transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] ${
                    open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`mt-auto transition-[opacity,transform] duration-700 ${open ? "translate-y-0 opacity-100 delay-500" : "translate-y-4 opacity-0"}`}
          >
            <a
              href={whatsappLink(whatsappMessages.quote)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="btn btn-primary w-full"
            >
              Vraag een website aan
              <span className="btn-icon">
                <WhatsAppIcon width={16} height={16} />
              </span>
            </a>
            <p className="mt-4 text-center text-sm text-mist">
              Of app direct: <a className="text-paper underline-offset-4 hover:underline" tabIndex={open ? 0 : -1} href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.whatsapp.display}</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
