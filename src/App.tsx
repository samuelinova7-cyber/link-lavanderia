import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, Phone, MapPin, Clock, CheckCircle2, 
  Instagram, Facebook, Star, ChevronDown, 
  Droplets, Wind, ShieldCheck, Zap, 
  Building2, Smartphone, CreditCard, 
  Volume2, VolumeX, ExternalLink, MessageCircle,
  Plus, Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const COLORS = {
  navy: '#0B1E3F',
  gold: '#FFD700',
};

const VIDEOS = {
  hero: "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/link%20grok%20video.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvbGluayBncm9rIHZpZGVvLm1wNCIsImlhdCI6MTc3MjQ1Nzc4MywiZXhwIjoxODY3MDY1NzgzfQ.xembXoIZWJBUEy1AkmzqjFv9PCOGs1wLGLyew7k8Dig",
  about: "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/SnapInsta.to_AQMTIpI3_j6w06_c_5S1hxBh6rnUKvVFNCGEudm3uhMp7CmPvPVXu81Dn_Tj-dFJwZMRl2Bf0yZ_ImFnP2qotBxrMUz8CvEcArH3L4o.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvU25hcEluc3RhLnRvX0FRTVRJcEkzX2o2dzA2X2NfNVMxaHhCaDZyblVLdlZGTkNHRXVkbTN1aE1wN0NtUHZQVlh1ODFEbl9Uai1kRkp3Wk1SbDJCZjB5Wl9JbUZuUDJxb3RCeHJNVXo4Q3ZFY0FySDNMNG8ubXA0IiwiaWF0IjoxNzcyNDU4MzE4LCJleHAiOjE4NjcwNjYzMTh9.mPcNpUHABbxw2zPlkGCjVF9pYPrynU6efyif3uExdr8",
  condo: "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/link%20condominio.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvbGluayBjb25kb21pbmlvLm1wNCIsImlhdCI6MTc3MjQ1OTczOSwiZXhwIjoxOTYxNjc1NzM5fQ.XBWGNWgB0hkT1V05l5iKR9vf9G_psmvWXzw1UWZ3uwA",
  insta1: "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/link%20insta.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvbGluayBpbnN0YS5tcDQiLCJpYXQiOjE3NzI0NTkyOTMsImV4cCI6MTk5MzIxMTI5M30.Ufkhmptxutv2lIyQ3TwqJZ_CzrmFPe41mt13FXYalXU",
  insta2: "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/link%20insta%202.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvbGluayBpbnN0YSAyLm1wNCIsImlhdCI6MTc3MjQ1OTMxNSwiZXhwIjoxOTMwMTM5MzE1fQ.ZQT59OFi-lBLFYmhqEi_FaoM-9fju9pnvxUCzm5SaX8",
  insta3: "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/link%20video%203.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvbGluayB2aWRlbyAzLm1wNCIsImlhdCI6MTc3MjQ1OTMzNSwiZXhwIjoxOTYxNjc1MzM1fQ.m6kpSHKXUg8nyo3iqE2uAeYPDZptE5aYBcNq1OH_bBA"
};

const HOW_IT_WORKS_IMAGES = [
  "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/Captura%20de%20tela%202026-03-02%20110521.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvQ2FwdHVyYSBkZSB0ZWxhIDIwMjYtMDMtMDIgMTEwNTIxLnBuZyIsImlhdCI6MTc3MjQ2MDQwNSwiZXhwIjoyMDI0NzQ4NDA1fQ.A0RPQz5vzK_Dd1HHDn8GP3g5zdlcweBavNEaLgP58JQ",
  "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/Captura%20de%20tela%202026-03-02%20110459.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvQ2FwdHVyYSBkZSB0ZWxhIDIwMjYtMDMtMDIgMTEwNDU5LnBuZyIsImlhdCI6MTc3MjQ2MDQzNCwiZXhwIjoxOTYxNjc2NDM0fQ.6JgJBmqwmtusj6SmJcwfkgJvLMV3YQGxoTM_62S4xUA",
  // Passo 3 removido
  "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/Captura%20de%20tela%202026-03-02%20110417.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvQ2FwdHVyYSBkZSB0ZWxhIDIwMjYtMDMtMDIgMTEwNDE3LnBuZyIsImlhdCI6MTc3MjQ2MDQ4MCwiZXhwIjoxOTkzMjEyNDgwfQ.vVXZk6SqXLI1WDBsLTPfH-NT92gYo96XLCHH37OEO3Y",
  "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/Captura%20de%20tela%202026-03-02%20110348.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvQ2FwdHVyYSBkZSB0ZWxhIDIwMjYtMDMtMDIgMTEwMzQ4LnBuZyIsImlhdCI6MTc3MjQ2MDk5OSwiZXhwIjoxOTkzMjEyNDk5fQ.aaoKn4OHrSCd-SsSCp8dHXLsKZBEAzUTKiDfY7-hscE",
  "https://ophugihxmlphgcryuode.supabase.co/storage/v1/object/sign/inova7/Captura%20de%20tela%202026-03-02%20110303.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NjhkNTkyYi05MDM0LTRjNjgtYmI3Ny03YzYzYTA2NTM0OTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbm92YTcvQ2FwdHVyYSBkZSB0ZWxhIDIwMjYtMDMtMDIgMTEwMzAzLnBuZyIsImlhdCI6MTc3MjQ2MDUyMiwiZXhwIjoxOTYxNjc2NTIyfQ.Q2kcigzHh-dhAPN2n3-gCaW89V0HhA3JlwTa6txzaSo"
];

const REVIEWS = [
  { name: "Mariana Silva", text: "Melhor lavanderia da região! Rápido e as roupas saem cheirosas.", rating: 5 },
  { name: "João Pedro", text: "Praticidade total. Uso sempre o ciclo de secar e economizo muito tempo.", rating: 5 },
  { name: "Carla Oliveira", text: "Ambiente limpo e seguro. O totem de pagamento é super fácil de usar.", rating: 5 },
  { name: "Ricardo Santos", text: "Excelente custo-benefício. Recomendo para quem mora em apartamento.", rating: 5 },
  { name: "Fernanda Lima", text: "A Link facilitou minha vida. Lavar edredom nunca foi tão simples.", rating: 5 },
  { name: "Bruno Costa", text: "Unidade Lauro de Freitas é top! Estacionamento fácil e Wi-Fi rápido.", rating: 5 },
  { name: "Amanda Souza", text: "Adoro o cashback! Sempre ganho desconto nas próximas lavagens.", rating: 5 },
  { name: "Lucas Mendes", text: "Sistema moderno e máquinas de alta performance. Nota 10.", rating: 5 }
];

const UNITS = [
  { name: "Lauro de Freitas", address: "Av. Santos Dumont, 1234 - Shopping Link", status: "06:00h às 22:00h" },
  { name: "Bonocô", address: "Av. Mário Leal Ferreira, 567 - Posto Shell", status: "24 Horas" },
  { name: "Ipitanga", address: "Rua Praia de Ipitanga, 89 - Galeria Mar", status: "06:00h às 22:00h" }
];

const FAQS = [
  {
    question: "Como funciona o autoatendimento?",
    answer: "É muito simples! Você chega na unidade, mede suas roupas no cesto medidor, escolhe a máquina disponível, realiza o pagamento no totem (via cartão ou Pix) e inicia o ciclo desejado. Tudo de forma digital e intuitiva."
  },
  {
    question: "Preciso levar sabão e amaciante?",
    answer: "Não! Nossas máquinas já dosam automaticamente sabão OMO e amaciante Comfort em todos os ciclos de lavagem. Você não precisa se preocupar em levar nenhum produto."
  },
  {
    question: "Quanto tempo demora para lavar e secar?",
    answer: "O tempo médio total é de 75 minutos. O ciclo de lavagem dura cerca de 30 a 35 minutos, e o ciclo de secagem leva aproximadamente 40 a 45 minutos, dependendo do tipo de tecido."
  },
  {
    question: "Qual a capacidade das máquinas?",
    answer: "Nossas máquinas industriais suportam até 10kg de roupas secas por ciclo. Disponibilizamos um cesto medidor na loja para que você saiba exatamente a quantidade ideal para uma lavagem perfeita."
  },
  {
    question: "Posso lavar edredons e cobertores?",
    answer: "Sim! Nossas máquinas são ideais para lavar itens volumosos como edredons (até tamanho Queen), cobertores e tapetes leves. Lembre-se apenas de respeitar o limite do cesto medidor."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos pagamentos via Pix, cartões de crédito e débito diretamente no totem de autoatendimento da loja. Não aceitamos dinheiro em espécie por questões de segurança."
  },
  {
    question: "As unidades funcionam todos os dias?",
    answer: "Sim! Funcionamos de domingo a domingo. A unidade Bonocô é 24 horas, enquanto as unidades Lauro de Freitas e Ipitanga operam das 06:00h às 22:00h."
  },
  {
    question: "É seguro deixar minhas roupas lavando?",
    answer: "Sim. Nossas unidades contam com monitoramento por câmeras 24 horas e as máquinas travam a porta durante todo o ciclo de funcionamento, garantindo a segurança das suas peças."
  },
  {
    question: "O que não posso lavar nas máquinas?",
    answer: "Para garantir a higiene e o bom funcionamento, não é permitido lavar roupas com excesso de pelos de animais, tapetes pesados de borracha, calçados, panos de chão muito sujos ou itens com produtos inflamáveis."
  },
  {
    question: "Como funciona a Link para condomínios?",
    answer: "Instalamos e operamos uma lavanderia completa dentro do seu prédio sem custo para o condomínio. Os moradores ganham praticidade, o imóvel valoriza, e o condomínio ainda recebe cashback das lavagens para investir em melhorias."
  }
];

// --- Components ---

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`transition-all duration-300 ${scrolled || isOpen ? 'bg-navy py-3 shadow-lg' : 'bg-white/90 backdrop-blur-md py-5 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold tracking-tighter transition-colors ${scrolled || isOpen ? 'text-white' : 'text-navy'}`}>
            LINK <span className="text-gold italic font-serif">LAVANDERIA</span>
          </span>
        </div>

        <div className={`hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-wider transition-colors ${scrolled || isOpen ? 'text-white/90' : 'text-navy/70'}`}>
          <a href="#sobre" className="hover:text-gold transition-colors">Sobre</a>
          <a href="#como-funciona" className="hover:text-gold transition-colors">Como Funciona</a>
          <a href="#precos" className="hover:text-gold transition-colors">Preços</a>
          <a href="#unidades" className="hover:text-gold transition-colors">Unidades</a>
          <button className="bg-gold text-navy px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-gold/20">
            <Phone size={16} /> Contato
          </button>
        </div>

        <button className={`md:hidden transition-colors ${scrolled || isOpen ? 'text-white' : 'text-navy'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-navy border-t border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#sobre" onClick={() => setIsOpen(false)} className="text-white text-lg font-medium">Sobre</a>
            <a href="#como-funciona" onClick={() => setIsOpen(false)} className="text-white text-lg font-medium">Como Funciona</a>
            <a href="#precos" onClick={() => setIsOpen(false)} className="text-white text-lg font-medium">Preços</a>
            <a href="#unidades" onClick={() => setIsOpen(false)} className="text-white text-lg font-medium">Unidades</a>
            <button className="bg-gold text-navy w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="bg-navy text-white py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-center overflow-hidden whitespace-nowrap border-b border-white/5">
        <div className="animate-marquee inline-block">
          RÁPIDO • PRÁTICO • ECONÔMICO • PRODUTOS OMO E COMFORT INCLUSOS • UNIDADES 24H E DAS 06H ÀS 22H • RÁPIDO • PRÁTICO • ECONÔMICO • PRODUTOS OMO E COMFORT INCLUSOS • UNIDADES 24H E DAS 06H ÀS 22H •
        </div>
      </div>
      <Navbar scrolled={scrolled} />
    </header>
  );
};

const Hero = () => (
  <section className="relative min-h-screen w-full flex items-center bg-white pt-20 overflow-hidden">
    {/* Background Decorative Elements */}
    <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-8 border border-gray-200">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-xs font-bold text-navy/60 uppercase tracking-widest">Experiência de lavanderia em suas mãos!</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-navy mb-8 leading-[1.1] tracking-tighter uppercase">
          CUIDADO COM SUAS <span className="text-gold">ROUPAS</span>, <br />
          PRATICIDADE NO SEU <span className="text-gold">DIA</span>, <br />
          E TEMPO LIVRE <br />
          PARA VOCÊ!
        </h1>

        <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-xl font-medium leading-relaxed">
          Com produtos de alta performance e um processo seguro para todos os tipos de roupa, você pode realizar a lavagem e secagem de forma rápida, prática e econômica.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gold hover:text-navy transition-all shadow-xl shadow-navy/10 flex items-center justify-center gap-2 group">
            Agendar pelo WhatsApp <ChevronDown className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          <button className="bg-white text-navy border-2 border-gray-100 px-10 py-5 rounded-2xl font-bold text-lg hover:border-gold transition-all flex items-center justify-center">
            Ver Planos
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full max-w-2xl mx-auto rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(11,30,63,0.3)] border-[12px] border-white">
          <video 
            autoPlay muted loop playsInline 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          >
            <source src={VIDEOS.hero} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          
          {/* Floating Badge */}
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
            <div className="flex items-center gap-4">
              <div className="bg-gold p-3 rounded-2xl text-navy">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest">Qualidade</p>
                <p className="text-xl font-black text-navy uppercase">OMO & COMFORT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Circles behind image */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 border border-navy/5 rounded-full pointer-events-none" />
        <div className="absolute top-[-5%] right-[-5%] w-64 h-64 border border-navy/5 rounded-full pointer-events-none" />
      </motion.div>
    </div>
  </section>
);

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-navy font-bold uppercase tracking-widest text-sm mb-4 block">Sobre a Link</span>
        <h2 className="text-4xl md:text-6xl font-bold text-navy mb-8 leading-tight">
          Devolvendo seu <span className="text-gold italic font-serif">tempo</span>.
        </h2>
        <p className="text-gray-600 text-lg mb-12 leading-relaxed max-w-3xl mx-auto">
          A Link Lavanderia Compartilhada foi criada para reinventar a rotina de lavar roupas, tornando-a uma experiência prática e conveniente. 
          Com nossas máquinas industriais de última geração, suas roupas são lavadas e secas em um tempo médio total de 75 minutos, liberando mais tempo para você aproveitar o que realmente importa.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12 text-left max-w-2xl mx-auto">
          <div className="flex flex-col gap-2 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <CheckCircle2 className="text-gold" size={32} />
            <h4 className="font-bold text-navy text-xl">Produtos Inclusos</h4>
            <p className="text-sm text-gray-500">Sabão e amaciante OMO e Comfort inclusos em todos os ciclos.</p>
          </div>
          <div className="flex flex-col gap-2 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <ShieldCheck className="text-gold" size={32} />
            <h4 className="font-bold text-navy text-xl">Higiene Total</h4>
            <p className="text-sm text-gray-500">Máquinas esterilizadas a cada ciclo para sua total segurança.</p>
          </div>
        </div>

        <button className="bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-navy/90 transition-colors flex items-center gap-2 mx-auto">
          Saiba Mais <ExternalLink size={18} />
        </button>
      </div>
    </section>
  );
};

const Condos = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-24 bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <span className="text-gold font-bold uppercase tracking-widest text-sm mb-4 block">Para Síndicos e Moradores</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Facilite o dia a dia no seu <span className="text-gold italic font-serif">condomínio</span>.
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Com a Link, a lavanderia se torna uma conveniência valorizada por todos os moradores. Ofereça um serviço prático e eficiente, enquanto o condomínio acumula cashback, que pode ser utilizado para melhorias nas áreas comuns. Invista na qualidade de vida da sua comunidade e valorize ainda mais seu patrimônio!
          </p>
          
          <div className="space-y-6 mb-10">
            <div className="flex gap-4 items-start">
              <div className="bg-white/10 p-3 rounded-lg text-gold">
                <Building2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl">Valorização Imobiliária</h4>
                <p className="text-white/50">Imóveis com lavanderia compartilhada são mais desejados e valorizados.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-white/10 p-3 rounded-lg text-gold">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl">Instalação Rápida</h4>
                <p className="text-white/50">Nós cuidamos de toda a infraestrutura, manutenção e operação.</p>
              </div>
            </div>
          </div>

          <button className="bg-gold text-navy px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
            Solicite uma proposta
          </button>
        </div>

        <div className="order-1 md:order-2 relative aspect-[9/16] max-w-sm mx-auto w-full rounded-3xl overflow-hidden shadow-2xl shadow-gold/10">
          <video 
            ref={videoRef}
            autoPlay muted loop playsInline 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          >
            <source src={VIDEOS.condo} type="video/mp4" />
          </video>
          <button 
            onClick={toggleMute}
            className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors z-20"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => (
  <section id="como-funciona" className="py-24 bg-gray-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
      <h2 className="text-4xl md:text-6xl font-bold text-navy mb-4">Como Funciona</h2>
      <p className="text-gray-500 text-lg max-w-2xl mx-auto">Simples, intuitivo e 100% digital. Veja como é fácil lavar suas roupas na Link.</p>
    </div>

    <div className="relative">
      <div className="flex overflow-x-auto no-scrollbar gap-6 px-4 pb-12 snap-x snap-mandatory animate-marquee">
        {[...HOW_IT_WORKS_IMAGES, ...HOW_IT_WORKS_IMAGES].map((img, idx) => (
          <div key={idx} className="flex-none w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-xl snap-center bg-gray-200 border-4 border-white">
            <img 
              src={img} 
              alt={`Passo ${idx + 1}`} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://picsum.photos/seed/laundry${idx}/1080/1920`;
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-2 mt-4 animate-pulse">
        <span className="text-navy/40 text-sm font-bold uppercase tracking-widest">Arraste para o lado</span>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8 mt-16">
      <div className="text-center">
        <div className="w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
        <h4 className="font-bold text-navy text-xl mb-2">Medir</h4>
        <p className="text-gray-500">Use nosso cesto medidor para verificar a carga ideal.</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
        <h4 className="font-bold text-navy text-xl mb-2">Escolher</h4>
        <p className="text-gray-500">Selecione o ciclo no totem e realize o pagamento.</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
        <h4 className="font-bold text-navy text-xl mb-2">Relaxar</h4>
        <p className="text-gray-500">Em 30 minutos suas roupas estarão prontas. Aproveite nosso Wi-Fi!</p>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="precos" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-navy mb-4">Preços Transparentes</h2>
        <p className="text-gray-500 text-lg">Sem surpresas. Valor fixo por ciclo de lavagem ou secagem.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-navy p-10 rounded-[2rem] text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-gold/10 transition-colors">
            <Droplets size={120} />
          </div>
          <span className="bg-gold text-navy px-4 py-1 rounded-full text-xs font-bold uppercase mb-6 inline-block">Ciclo Completo</span>
          <h3 className="text-3xl font-bold mb-2">Ciclo Lavar</h3>
          <p className="text-white/60 mb-8">Sabão e amaciante inclusos. Roupas limpas em 30 min.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-xl font-medium">R$</span>
            <span className="text-6xl font-bold">18,95</span>
          </div>
          <button className="w-full bg-white text-navy py-4 rounded-xl font-bold hover:bg-gold transition-colors">
            Lavar Agora
          </button>
        </motion.div>

        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-gray-100 p-10 rounded-[2rem] text-navy relative overflow-hidden group border border-gray-200"
        >
          <div className="absolute top-0 right-0 p-8 text-navy/5 group-hover:text-navy/10 transition-colors">
            <Wind size={120} />
          </div>
          <span className="bg-navy text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-6 inline-block">Alta Temperatura</span>
          <h3 className="text-3xl font-bold mb-2">Ciclo Secar</h3>
          <p className="text-gray-500 mb-8">Roupas secas e macias. Elimina ácaros e bactérias.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-xl font-medium">R$</span>
            <span className="text-6xl font-bold">18,95</span>
          </div>
          <button className="w-full bg-navy text-white py-4 rounded-xl font-bold hover:bg-navy/90 transition-colors">
            Secar Agora
          </button>
        </motion.div>
      </div>
    </div>
  </section>
);

const InstagramSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-navy mb-4">No Instagram</h2>
          <p className="text-gray-500 text-lg">Siga a @linklavanderia e fique por dentro das novidades.</p>
        </div>
        <button className="bg-navy text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-navy/90 transition-colors">
          <Instagram size={20} /> Seguir no Instagram
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[VIDEOS.insta2, VIDEOS.insta3].map((video, idx) => (
          <div key={idx} className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl group">
            <video 
              autoPlay muted loop playsInline 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            >
              <source src={video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <div className="text-white">
                <p className="font-bold flex items-center gap-2"><Instagram size={16} /> @linklavanderia</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const UnitsSection = () => (
  <section id="unidades" className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-navy mb-4">Nossas Unidades</h2>
        <p className="text-gray-500 text-lg">Encontre a Link mais próxima de você.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] relative border-8 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.349635445217!2d-38.3315!3d-12.885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUzJzA2LjAiUyAzOMKwMTknNTMuNCJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
          <div className="absolute top-6 left-6 bg-navy text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            Unidades Abertas Agora
          </div>
        </div>

        <div className="space-y-4">
          {UNITS.map((unit, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gold transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-navy text-lg group-hover:text-gold transition-colors">{unit.name}</h4>
                <span className="text-[10px] font-bold uppercase bg-green-100 text-green-700 px-2 py-1 rounded-md">{unit.status}</span>
              </div>
              <p className="text-gray-500 text-sm flex items-start gap-2 mb-4">
                <MapPin size={16} className="shrink-0 text-navy/30" /> {unit.address}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 text-navy py-2 rounded-lg text-xs font-bold hover:bg-navy hover:text-white transition-colors">Como Chegar</button>
                <button className="flex-1 bg-navy text-white py-2 rounded-lg text-xs font-bold hover:bg-gold hover:text-navy transition-colors">WhatsApp</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ReviewsMarquee = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <h2 className="text-4xl font-bold text-navy">O que dizem nossos clientes</h2>
      <button className="bg-navy text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gold hover:text-navy transition-colors">
        <Star size={18} fill="currentColor" /> Deixar avaliação no Google
      </button>
    </div>

    <div className="flex animate-marquee gap-6 py-4">
      {[...REVIEWS, ...REVIEWS].map((review, idx) => (
        <div key={idx} className="flex-none w-[350px] bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex gap-1 mb-4 text-gold">
            {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold">
              {review.name[0]}
            </div>
            <div>
              <h5 className="font-bold text-navy text-sm">{review.name}</h5>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Cliente Verificado</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">Dúvidas Frequentes</h2>
          <p className="text-gray-500 text-lg">Tudo o que você precisa saber sobre a Link Lavanderia.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === idx ? 'border-gold shadow-md' : 'border-gray-200 hover:border-navy/20'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-bold text-lg pr-8 ${openIndex === idx ? 'text-navy' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-gold text-navy' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-navy text-white py-20">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-16">
      <div className="md:col-span-2">
        <span className="text-3xl font-bold tracking-tighter mb-6 block">
          LINK <span className="text-gold italic font-serif">LAVANDERIA</span>
        </span>
        <p className="text-white/50 text-lg max-w-sm mb-8">
          A maior rede de lavanderias compartilhadas do Nordeste. Tecnologia, economia e sustentabilidade.
        </p>
        <div className="flex gap-4">
          <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-gold hover:text-navy transition-all"><Instagram size={20} /></a>
          <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-gold hover:text-navy transition-all"><Facebook size={20} /></a>
          <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-gold hover:text-navy transition-all"><MessageCircle size={20} /></a>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6">Links Úteis</h4>
        <ul className="space-y-4 text-white/60">
          <li><a href="#sobre" className="hover:text-gold transition-colors">Sobre Nós</a></li>
          <li><a href="#como-funciona" className="hover:text-gold transition-colors">Como Funciona</a></li>
          <li><a href="#precos" className="hover:text-gold transition-colors">Preços</a></li>
          <li><a href="#unidades" className="hover:text-gold transition-colors">Unidades</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6">Suporte</h4>
        <ul className="space-y-4 text-white/60">
          <li className="flex items-center gap-2"><Phone size={16} /> (71) 99688-7151</li>
          <li className="flex items-center gap-2"><Clock size={16} /> 06h às 22h (Bonocô 24h)</li>
          <li className="flex items-center gap-2"><ShieldCheck size={16} /> Termos de Uso</li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
      <p>© {new Date().getFullYear()} Link Lavanderia Compartilhada. Todos os direitos reservados.</p>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/5571996887151" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-navy px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
      Fale Conosco
    </span>
  </a>
);

// --- Main App ---

export default function App() {
  return (
    <div className="font-sans text-navy bg-white selection:bg-gold selection:text-navy">
      <Header />
      
      <Hero />
      <About />
      <Condos />
      <HowItWorks />
      <Pricing />
      <InstagramSection />
      <ReviewsMarquee />
      <FAQSection />
      <UnitsSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

