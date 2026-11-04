// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// El Hamdu Lillahi Rabbul Alemin
// Klasik edebiyat dergisi tarzı tanıtım sayfası

import Link from "next/link";

const services = [
  {
    no: "01",
    title: "Roman",
    desc: "Uzun soluklu anlatılar; tek bir hayatın içinden bütün bir dünyayı görme denemesi.",
  },
  {
    no: "02",
    title: "Öykü",
    desc: "Kısa metnin imkânıyla, bir anın bütün ağırlığını taşıyan hikâyeler.",
  },
  {
    no: "03",
    title: "Deneme",
    desc: "Düşünmenin peşine düşen, gündelik olanın içinden geçen yazılar.",
  },
  {
    no: "04",
    title: "Mektup & Günlük",
    desc: "Yokluk, bekleyiş ve hafıza üzerine, birisine yazılmış samimi metinler.",
  },
  {
    no: "05",
    title: "Eleştiri",
    desc: "Kitapların arasında yürüyen, okuma ufkunu genişleten kritikler.",
  },
  {
    no: "06",
    title: "Söyleşi",
    desc: "Yazarlarla, editörlerle ve okurlarla yapılan söyleşi ve buluşmalar.",
  },
  {
    no: "07",
    title: "Atölye",
    desc: "Yazmaya yeni başlayanlarla metni kurmayı öğrenmenin atölyesi.",
  },
  {
    no: "08",
    title: "Editörlük",
    desc: "Metinleri birlikte okumak, düzenlemek ve yayına hazırlamak.",
  },
];
const marqueeWord = "KELİME — HAFIZA — SAYFA — ";

export default function DentsuPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .service-row {
          transition: background .3s, padding-left .3s;
          cursor: pointer;
        }
        .service-row:hover {
          background: #ffffff;
          color: #0a0a0a;
          padding-left: 1.5rem;
        }
        .service-row:hover .service-desc { color: #0a0a0a; }
        .hover-line { position: relative; }
        .hover-line::after {
          content: "";
          position: absolute; left: 0; bottom: -4px;
          width: 0; height: 2px; background: currentColor;
          transition: width .3s;
        }
        .hover-line:hover::after { width: 100%; }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[#0a0a0a]/80 backdrop-blur">
        <div className="flex gap-6 md:gap-10 text-xs md:text-sm tracking-widest uppercase">
          <a href="#isler" className="hover-line">Kitaplar</a>
          <a href="#hizmetler" className="hover-line">Yazdıklarım</a>
          <a href="#hakkinda" className="hover-line">Hakkımda</a>
          <a href="#iletisim" className="hover-line">İletişim</a>
        </div>
        <Link href="/malper" className="text-sm font-bold tracking-[0.3em] uppercase no-underline">
          Emanet
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24">
        <div className="text-xs tracking-[0.4em] uppercase text-white/60 mb-6">
          Sözün peşine düşen, yavaş yazan bir edebiyat atölyesi
        </div>
        <h1 className="font-bold leading-[0.95] tracking-tight">
          <span className="block text-5xl md:text-8xl lg:text-9xl">İnsanı ve</span>
          <span className="block text-5xl md:text-8xl lg:text-9xl text-white/40">
            şehri
          </span>
          <span className="block text-5xl md:text-8xl lg:text-9xl">
            yeniden anlatan
          </span>
          <span className="block text-5xl md:text-8xl lg:text-9xl italic">
            edebiyat<span className="text-red-600">.</span>
          </span>
        </h1>
        <div className="mt-12 flex gap-4">
          <a
            href="#isler"
            className="px-8 py-4 border border-white/30 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
          >
Kitapları gör
          </a>
          <a
            href="#iletisim"
            className="px-8 py-4 bg-red-600 rounded-full text-sm tracking-widest uppercase hover:bg-red-500 transition-colors"
          >
Bana yaz
          </a>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-16 border-y border-white/10">
        <div className="marquee-track text-6xl md:text-8xl font-bold tracking-tight">
          {[0, 1].map((i) => (
            <span key={i} className="pr-8">
              {marqueeWord.repeat(4)}
            </span>
          ))}
        </div>
      </section>

      {/* LATEST BOOKS */}
      <section id="isler" className="px-6 md:px-10 py-24">
        <h2 className="text-4xl md:text-6xl font-bold mb-16">Son Kitaplar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Sessizliğin Alfabesi", "Sokağın Hafızası", "Kuşlar ve Kırık Saat", "Babanın Defteri"].map(
            (name, i) => (
              <div
                key={name}
                className="group relative aspect-[4/3] overflow-hidden bg-white/5 border border-white/10"
              >
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <h3 className="text-2xl font-semibold">{name}</h3>
                  <span className="text-sm text-white/50">Kitap</span>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="hizmetler" className="px-6 md:px-10 py-24 border-t border-white/10">
        <h2 className="text-4xl md:text-6xl font-bold mb-16">Yazdıklarım</h2>
        <div>
          {services.map((s) => (
            <div
              key={s.no}
              className="service-row border-t border-white/15 py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12 last:border-b"
            >
              <span className="text-sm text-white/40 font-mono">{s.no}</span>
              <h3 className="text-2xl md:text-4xl font-bold md:w-1/3">{s.title}</h3>
              <p className="service-desc md:w-1/2 text-white/60 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="iletisim" className="px-6 md:px-10 py-32 text-center">
        <h2 className="text-5xl md:text-8xl font-bold leading-tight">
Hikâyeni
          <br />
          <span className="text-red-600">birlikte yazalım</span>
        </h2>
        <Link
          href="/"
          className="inline-block mt-12 px-10 py-5 bg-white text-black rounded-full text-sm tracking-widest uppercase hover:bg-red-600 hover:text-white transition-colors"
        >
          İletişime geç
        </Link>
      </section>

      {/* FOOTER */}
      <footer
        id="hakkinda"
        className="px-6 md:px-10 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-sm text-white/50"
      >
        <div>© 2026 — El Hamdu Lillah ile yazıldı.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">X</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}
