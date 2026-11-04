// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Site verileri — tüm sayfalar buradan beslenir
export const AGENCY = {
  name: "Emanet",
  tagline: "Sade, reklamsız ve ticari olmayan bilgi sitesi",
  email: "merhaba@emanet.site",
  phone: "+90 555 000 00 00",
  address: "İstanbul, Türkiye",
};
export const STATS = [
  { n: "120+", l: "Kurulan Site" },
  { n: "9", l: "Helal Şablon" },
  { n: "%100", l: "Reklamsız" },
  { n: "7/24", l: "Destek" },
];

// Görseller yerel (public/uploads) — dış servis gecikmesi/engeli olmadan anında yüklenir.
export const CASES = [
  {
    brand: "Mescid-i Nur Camii",
    title: "Namaz vakitleri, duyurular ve vaaz arşivi tek sayfada",
    tag: "Cami",
    img: "/uploads/cmv86fsr20000wl0kifo8sigo.jpg",
  },
  {
    brand: "Ehl-i Sünnet Dergisi",
    title: "Makale arşivi, sayı galerisi ve abonelik sayfası",
    tag: "Yayın",
    img: "/uploads/cmv86umpb0000pdfxwe9dkrph.jpg",
  },
  {
    brand: "Darul Kurra Medresesi",
    title: "Hafızlık sınıfları, ders programı ve kayıt formu",
    tag: "Medrese",
    img: "/alarengin.webp",
  },
  {
    brand: "Gençlik Meclisi",
    title: "Gençler için haftalık program ve ilim halkaları",
    tag: "Gençlik",
    img: "/uploads/cmv86kvth0000fxs8y0kao9ri.webp",
  },
];

export const SERVICES = [
  { n: "01", t: "Cami Şablonu", d: "Namaz vakitleri, kandil ve cuma duyuruları, vaaz arşivi. Cemaat için sade ve hızlı bir sayfa." },
  { n: "02", t: "Cemaat & Dernek", d: "Faaliyet duyuruları, haftalık program, üye kaydı ve haber arşivi; sade ve hızlı bir düzen." },
  { n: "03", t: "Medrese & Kur", d: "Hafızlık ve ilim sınıfları, ders programı, öğretmen kadrosu ve ön kayıt formu." },
  { n: "04", t: "İslami Eğitim", d: "Ders notları, tefsir ve hadis arşivi, haftalık sohbet kayıtları tek bir düzen içinde." },
  { n: "05", t: "Helal Yaşam", d: "Aile, çevre ve günlük hayat üzerine bilgi; satış, reklam ve ticari bağlantı bulunmaz." },
  { n: "06", t: "Yayın & Duyuru", d: "Kitap, risale ve bülten yayını; helal içerik denetiminden geçmiş metinlerle." },
];

export const NEWS = [
  { cat: "Yeni Şablon", date: "Eylül 2026", title: "Hafızlık medreseleri için yeni şablon yayında", href: "#" },
  { cat: "Güncelleme", date: "Ağustos 2026", title: "Namaz vakitleri artık tek tıkla güncelleniyor", href: "#" },
  { cat: "Helal Denetim", date: "Temmuz 2026", title: "İçerik kuralları ve reklam denetimi genişletildi", href: "#" },
  { cat: "Eğitim", date: "Haziran 2026", title: "Panel kullanımı için ücretsiz canlı ders takvimi", href: "#" },
];

export const CLIENTS = ["CAMİ DERNEĞİ", "KURAN KURSU", "İLİM DERNEGİ", "YAYIN EVİ", "GENÇLİK MECLİSİ", "HAC VE UMRE REHBERİ"];

export const NAV_LINKS = [
  { href: "/malper", label: "Ana Sayfa" },
  { href: "/malper/hakkinda", label: "Hakkında" },
  { href: "/malper/hizmetler", label: "Hizmetler" },
  { href: "/malper/isler", label: "Yazılar" },
  { href: "/malper/kariyer", label: "Eğitim" },
  { href: "/malper/iletisim", label: "İletişim" },
];
