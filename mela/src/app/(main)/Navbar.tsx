// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirahim
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala rasulina Muhammedin ve ala alihi ve sahbihi ecmain
// La ilahe illallah, Muhammedur Resulullah
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// Allah U Ekber ve lillahi'l-hamd

"use client";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import UserButton from "@/components/UserButton";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
///Her dem pêşeroj divê 
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-card shadow-sm">
      <div
        ref={navRef}
        className="mx-auto flex items-center justify-between max-w-7xl px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-bold text-primary">
            Emanet · Yönetim
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-secondary hover:text-primary">
            Ana Sayfa
          </Link>
          <Link href="/malper" className="text-sm font-medium text-secondary hover:text-primary">
            Malper Önizleme
          </Link>
          <Link href="/kullanicilar" className="text-sm font-medium text-secondary hover:text-primary">
            Kullanıcılar
          </Link>
          <Link href="/paylasimlar" className="text-sm font-medium text-secondary hover:text-primary">
            Paylaşımlar
          </Link>
          <Link href="/gorunum" className="text-sm font-medium text-secondary hover:text-primary">
            Görünüm
          </Link>

          <div className="flex items-center gap-3">
            <Dropdown>
              <Dropdown.Toggle variant="link" className="text-sm font-medium text-secondary hover:text-primary px-0">
                İçerik
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} href="/malper/isler">İşler</Dropdown.Item>
                <Dropdown.Item as={Link} href="/malper/hizmetler">Hizmetler</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="link" className="text-sm font-medium text-secondary hover:text-primary px-0">
                Yönetim
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} href="/kullanicilar">Kullanıcılar</Dropdown.Item>
                <Dropdown.Item as={Link} href="/paylasimlar">Paylaşımlar</Dropdown.Item>
                <Dropdown.Item as={Link} href="/gorunum">Görünüm</Dropdown.Item>
                <Dropdown.Item as={Link} href="/peyam">Peyam</Dropdown.Item>
                <Dropdown.Item as={Link} href="/malper/account">Hesap</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Link href="/malper/hakkinda" className="text-sm font-medium text-secondary hover:text-primary">
            Hakkında
          </Link>
          <Link href="/malper/iletisim" className="text-sm font-medium text-secondary hover:text-primary">
            İletişim
          </Link>
          <Link href="/peyam" className="text-sm font-medium text-secondary hover:text-primary">
            Peyam
          </Link>
        </nav>

        <div className="hidden sm:flex sm:items-center sm:ms-auto">
          <UserButton />
        </div>

        <button
          className="lg:hidden p-2 rounded text-green-500"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Kapat" : "Menüyü Aç"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu — no semi-opaque backdrop, responsive and scrollable */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[64px] z-30 transform transition-transform duration-200 ${
          menuOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* No opaque overlay here (bg-transparent) so menu appears without backdrop opacity */}
        <div
          className="absolute inset-0 bg-transparent"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="relative bg-card p-4 shadow-lg max-h-[calc(100vh-64px)] overflow-auto">
          <div className="flex flex-col gap-2">
            <Link href="/" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              Ana Sayfa
            </Link>
            <Link href="/malper" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              Malper Önizleme
            </Link>
            <Link href="/kullanicilar" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              Kullanıcılar
            </Link>
            <Link href="/paylasimlar" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              Paylaşımlar
            </Link>
            <Link href="/gorunum" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              Görünüm
            </Link>

            <div className="border-t my-2" />

            <div className="flex flex-col gap-1">
              <details className="group">
                <summary className="px-3 py-2 rounded cursor-pointer hover:bg-muted">İçerik</summary>
                <div className="pl-4">
                  <Link href="/malper/isler" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>İşler</Link>
                  <Link href="/malper/hizmetler" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>Hizmetler</Link>
                </div>
              </details>

              <details className="group">
                <summary className="px-3 py-2 rounded cursor-pointer hover:bg-muted">Yönetim</summary>
                <div className="pl-4">
                  <Link href="/kullanicilar" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>Kullanıcılar</Link>
                  <Link href="/paylasimlar" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>Paylaşımlar</Link>
                  <Link href="/gorunum" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>Görünüm</Link>
                  <Link href="/peyam" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>Peyam</Link>
                  <Link href="/malper/account" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>Hesap</Link>
                </div>
              </details>
            </div>

            <Link href="/malper/hakkinda" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              Hakkında
            </Link>
            <Link href="/malper/iletisim" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              İletişim
            </Link>
            <Link href="/peyam" className="block px-3 py-2 rounded hover:bg-muted" onClick={handleLinkClick}>
              Peyam
            </Link>

            <div className="mt-3 border-t pt-3">
              <UserButton />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}