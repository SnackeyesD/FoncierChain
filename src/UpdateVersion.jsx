import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  Shield, Database, Lock, Search, Scale, ChevronRight, 
  MapPin, Users, TrendingUp, AlertTriangle, FileText, Fingerprint
} from 'lucide-react';

// ==========================================
// COMPOSANTS UI/UX EXPERTS
// ==========================================

// 1. Bouton Magnétique (Micro-interaction Premium)
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// 2. Carte avec effet Spotlight (Hover Web3)
const SpotlightCard = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 197, 94, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};

// ==========================================
// SECTIONS DU SITE
// ==========================================

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Solution Hackathon Miabe 2026
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.1]">
            Le foncier congolais <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent">
              devient immuable.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            Fini les doubles ventes par les chefs de terre. De Makélékélé à Talangaï, sécurisez votre Titre Foncier sur la blockchain. Une parcelle. Un propriétaire. Pour toujours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <MagneticButton className="px-8 py-4 rounded-full bg-primary text-slate-950 font-bold text-lg flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              Protéger ma parcelle
              <ChevronRight className="w-5 h-5" />
            </MagneticButton>
            
            <MagneticButton className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-lg backdrop-blur-md hover:bg-white/10 transition-colors">
              Consulter le registre public
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CongoleseContextSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} id="probleme" className="relative py-40 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div style={{ opacity }} className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 text-alert font-bold text-sm tracking-widest uppercase mb-6">
                <AlertTriangle className="w-5 h-5" />
                La Crise à Brazzaville
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-6">
                Le chaos des <span className="text-alert">doubles ventes</span>.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Actuellement au Congo, obtenir une attestation coutumière ne garantit rien. Les <strong>"propriétaires terriens"</strong> revendent souvent la même parcelle à plusieurs acheteurs. Les conséquences sont désastreuses pour les familles.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { data: "60%", label: "Des affaires civiles", desc: "Au Tribunal de Grande Instance de Brazzaville concernent des litiges fonciers." },
                { data: "3 à 7 ans", label: "De procédure", desc: "Temps moyen pour résoudre un conflit devant les juges congolais." },
                { data: "1.5M FCFA", label: "Coût minimum", desc: "Frais moyens (avocats, géomètres, Cadastre) pour régulariser une situation." }
              ].map((stat, i) => (
                <div key={i} className="flex gap-6 items-start p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-alert/30 transition-colors">
                  <div className="text-3xl font-black text-alert w-32 shrink-0">{stat.data}</div>
                  <div>
                    <div className="font-bold text-white mb-1">{stat.label}</div>
                    <div className="text-sm text-slate-400">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Carte Holographique 3D */}
          <motion.div style={{ scale, opacity }} className="relative h-[600px] w-full perspective-1000">
            <div className="absolute inset-0 bg-alert/20 blur-[100px] rounded-full" />
            <motion.div 
              className="relative h-full w-full rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 flex flex-col shadow-2xl"
              animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-alert/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-alert" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Conservation des Hypothèques</div>
                    <div className="text-xs text-slate-500">Registre Analogique (Actuel)</div>
                  </div>
                </div>
                <div className="text-alert text-sm font-mono bg-alert/10 px-3 py-1 rounded-full">VULNÉRABLE</div>
              </div>

              <div className="space-y-4 font-mono text-sm flex-1">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                  <div className="text-slate-500 mb-2">Parcelle: BZV-MAKELEKELE-Lot42</div>
                  <div className="text-white">Propriétaire 1: M. Nguimbi (Attestation coutumière)</div>
                  <div className="text-alert mt-2 pt-2 border-t border-slate-800">Propriétaire 2: Mme. Kimbembe (Titre Foncier en cours)</div>
                  <div className="text-alert mt-2 pt-2 border-t border-slate-800">Propriétaire 3: Société X (Permis d'occuper)</div>
                  
                  {/* Glitch effect on text */}
                  <div className="absolute inset-0 bg-alert/5 animate-pulse mix-blend-overlay pointer-events-none" />
                </div>
              </div>
              
              <div className="mt-auto p-4 bg-alert/10 rounded-xl border border-alert/20 text-alert text-center text-sm font-bold flex items-center justify-center gap-2">
                <Fingerprint className="w-4 h-4" />
                Falsification de signature détectée
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  return (
    <section id="solution" className="relative py-40 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Le <span className="text-primary">Cadastre Numérique</span> Incorruptible
          </h2>
          <p className="text-slate-400 text-lg">
            FoncierChain numérise le processus de la Conservation des Hypothèques. Chaque parcelle devient un NFT unique, lié aux coordonnées GPS exactes du Cadastre National.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Lock, title: "Zéro Double Vente", desc: "Le Smart Contract bloque automatiquement toute tentative d'enregistrement d'une parcelle ayant déjà un propriétaire légitime." },
            { icon: Search, title: "Vérification Instantanée", desc: "Avant d'acheter, l'acquéreur ou le notaire scanne le QR code de la parcelle pour voir son historique complet depuis sa création." },
            { icon: Scale, title: "Preuve Juridique", desc: "Les tribunaux congolais accèdent à une source de vérité absolue. Les litiges fonciers sont résolus en quelques jours, pas en années." },
            { icon: MapPin, title: "Couplage GPS Cadastral", desc: "Intégration avec les levés topographiques. Les bornes physiques sont liées cryptographiquement aux coordonnées numériques." },
            { icon: Shield, title: "Validation Multi-Signatures", desc: "Une mutation nécessite la signature numérique du vendeur, de l'acheteur et du conservateur des hypothèques." },
            { icon: TrendingUp, title: "Déblocage Économique", desc: "Les banques congolaises accordent des crédits plus facilement, le terrain devenant une garantie 100% fiable." }
          ].map((feature, idx) => (
            <SpotlightCard key={idx}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function UpdateVersion() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-primary/30 selection:text-white">
      {/* Navigation simplifiée pour l'exemple */}
      <nav className="fixed top-0 w-full z-50 py-6 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black text-white tracking-tighter">Foncier<span className="text-primary">Chain</span></div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-white/70">
            <a href="#probleme" className="hover:text-white transition-colors">Le Problème</a>
            <a href="#solution" className="hover:text-white transition-colors">La Solution</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <CongoleseContextSection />
        <SolutionSection />
      </main>

      <footer className="border-t border-white/10 py-12 bg-slate-950 text-center">
        <p className="text-slate-500 font-medium">Développé pour le Miabe Hackathon 2026 • Brazzaville, Congo</p>
      </footer>
    </div>
  );
}