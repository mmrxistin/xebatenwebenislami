// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Elhamdulillahirabbulalemin
// Ve salatu ve selamu ala resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah,La ilahe illAllah u Allahu Ekber
// Estağfirullah El-Azim
// Allah u Ekber Ve Lillahil Hamd
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const NAV_LINKS = [
  { href: '/malper', label: 'Ana Sayfa' },
  { href: '/malper#work', label: 'Kitaplar' },
  { href: '/malper#services', label: 'Türler' },
  { href: '/malper#culture', label: 'Manifesto' },
  { href: '/malper#news', label: 'Duyurular' },
  { href: '/malper#careers', label: 'Atölye' },
  { href: '/malper#contact', label: 'İletişim' },
];


function Mmmnavbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch'i önlemek için mounted kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 text-[#18181b] dark:bg-zinc-950/90 dark:text-zinc-100 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">

        <div className="transition-colors duration-300">
          <div className="mx-auto flex min-h-[64px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

            <div className="flex min-w-[60px] items-center justify-start">
              <Link href="/malper" className="text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50">
EMANET
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">

              {/* MASAÜSTÜ MENÜ */}
              <nav className="hidden xl:block">
                <ul className="m-0 flex list-none items-center gap-5 p-0">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400 no-underline transition-colors hover:text-[#ff4d00] dark:hover:text-[#ff4d00]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {mounted && (
                <button
                  type="button"
                  aria-label="Tema değiştir"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex h-9 items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300 no-underline transition-all hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-[#111] dark:hover:text-white"
                >
                  <span className="flex items-center gap-1.5">
                    {theme === 'dark' ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>
                        AÇIK
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        KOYU
                      </>
                    )}
                  </span>
                </button>
              )}

              <a
                href="/#contact"
                className="hidden h-9 items-center rounded-full bg-[#ff4d00] px-5 text-xs font-black uppercase tracking-[0.14em] text-white no-underline transition-all hover:bg-zinc-900 sm:flex dark:hover:bg-white dark:hover:text-zinc-900"
              >
İletişim
              </a>

              {/* HAMBURGER — mobilde üç çizgi */}
              <button
                type="button"
                aria-label="Menüyü aç/kapat"
                aria-expanded={open}
                aria-controls="mm-main-menu"
                onClick={() => setOpen((v) => !v)}
                className="mm-burger flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-700 lg:hidden"
              >
                <div className={`mm-burger-lines ${open ? 'mm-burger-open' : ''} dark:invert`}>
                  <span className="dark:bg-white" /><span className="dark:bg-white" /><span className="dark:bg-white" />
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* MOBİL MENÜ */}
        <div className={`mm-menu-wrap ${open ? 'mm-menu-open' : ''} bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300`} id="mm-main-menu">
          <nav className="mx-auto w-full max-w-[1600px] px-0 lg:px-8">
            <ul className="m-0 flex w-full list-none flex-col p-0 lg:flex-row lg:items-center lg:flex-wrap">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="w-full lg:w-auto">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`nav-modern-link flex w-full items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 lg:hover:bg-transparent dark:lg:hover:bg-transparent transition-colors ${link.href === '/malper' ? 'active text-[#ff4d00] dark:text-[#ff4d00]' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Mmmnavbar;
//SubhanAllahi Rahmanir Rahim ve Bihamdihi
// SubhanAllah i Ehed ve Bihamdihi
// SubhanAllah i Samed i Azim ve Bihamdihi
// Suphan Allahi Kerim i Vehhab ve Bihamdihi
// SubhanAllahi Azim ve Bihamdihi
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbilalemin
// La ilahe illAllah Muhammden abduhu ve resuluhu
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbilalemin
// La ilahe illAllahu vahdehu (Esma Ul Husna)la sharika leh, lehu'l-mulku ve lehu'l-hamdu.

// yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir