import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Shield,
  Database,
  Lock,
  Search,
  FileCheck,
  Scale,
  ChevronRight,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Particules animées en arrière-plan
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Compteur animé
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Navigation
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass py-4" : "py-6 bg-transparent"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            Fon<span className="text-yellow-500">cier</span>
            <span className="text-red-500">Chain</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300 ">
          <a href="#probleme" className="hover:text-red-500 transition-colors">
            Le Problème
          </a>
          <a
            href="#solution"
            className="hover:text-green-500 transition-colors"
          >
            Solution
          </a>
          <a href="#impact" className="hover:text-yellow-500 transition-colors">
            Impact
          </a>
        </div>

        <motion.button
          className="px-6 py-2.5 rounded-full bg-primary text-slate-950 font-semibold text-sm glow-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Rejoindre la Beta
        </motion.button>
      </div>
    </motion.nav>
  );
};

// Section Hero
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="hover:bg-amber-50 relative min-h-screen flex items-center justify-center overflow-hidden pt-20 duration-300">
      <ParticleBackground />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
        style={{ y: y1, opacity }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Blockchain pour l'Afrique
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-green-600"
          >
            Le foncier congolais
            <br />
            <span className="text-gradient">immuable.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Mettons fin aux litiges fonciers. Une parcelle, un propriétaire,
            pour toujours. La transparence blockchain au service des ODD 1, 11
            et 16.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <motion.button
              className="group px-8 py-4 rounded-full bg-primary text-slate-950 font-bold text-lg glow-button flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(34, 197, 94, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir la solution
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/**
         *     <motion.button 
              className="px-8 py-4 rounded-full glass text-white font-semibold text-lg glass-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Documentation technique
            </motion.button>
         */}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="pt-12 flex justify-center gap-12 text-slate-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span>Infalsifiable</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-primary" />
              <span>Vérifié</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// Section Statistique 60% (Choc émotionnel)
const CrisisSection = () => {
  return (
    <section
      id="probleme"
      className="relative py-32 hover:bg-red-100 bg-slate-950 overflow-hidden duration-300"
    >
      <div className="absolute inset-0 from-alert/5 via-slate-950 to-slate-950" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-alert font-semibold text-sm tracking-wider uppercase">
              <AlertTriangle className="w-4 h-4" />
              La crise foncière
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Plus de <span className="text-alert">60%</span> des terrains
              urbains à Brazzaville sont contestés
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed">
              Un même terrain vendu 3 à 5 fois à différents propriétaires. 45%
              des affaires civiles congolaises sont des litiges fonciers. 3 à 7
              ans pour résoudre un conflit, coût moyen de 500 000 à 3 000 000
              FCFA.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                {
                  label: "Litiges civils",
                  value: "45",
                  suffix: "%",
                  desc: "Affaires foncières",
                },
                {
                  label: "Durée moyenne",
                  value: "5",
                  suffix: " ans",
                  desc: "Résolution d'un litige",
                },
                {
                  label: "Coût moyen",
                  value: "1.75",
                  suffix: "M FCFA",
                  desc: "Par ménage",
                },
                {
                  label: "Propriétaires",
                  value: "3-5x",
                  desc: "Mêmes terrains",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-2xl bg-alert/5 border border-alert/10"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <div className="text-3xl font-bold text-alert mb-1">
                    <AnimatedCounter
                      target={parseFloat(stat.value)}
                      suffix={stat.suffix || ""}
                    />
                    {/**
                     *    {!stat.value.includes('-') && !stat.value.includes('.') && stat.value}
                     */}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-alert/20 blur-3xl rounded-full animate-pulse-slow" />
            <div className="relative glass rounded-3xl p-8 border-alert/20">
              <div className="text-center mb-8">
                <motion.div
                  className="text-8xl md:text-9xl font-bold text-alert mb-4"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 1.5, bounce: 0.3 }}
                >
                  <AnimatedCounter target={60} suffix="%" />
                </motion.div>
                <p className="text-slate-400 uppercase tracking-widest text-sm">
                  Taux de contestation
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-alert to-orange-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>Propriété sécurisée</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Section Solution
const SolutionSection = () => {
  const features = [
    {
      icon: Database,
      title: "Registre Immuable",
      desc: "Chaque parcelle enregistrée une seule fois. La double attribution est techniquement impossible.",
      color: "primary",
    },
    {
      icon: Lock,
      title: "Validation Cryptographique",
      desc: "Tout transfert de propriété nécessite la validation sécurisée du propriétaire légal.",
      color: "accent",
    },
    {
      icon: Search,
      title: "Transparence Totale",
      desc: "Vérifiez instantanément le propriétaire légal et l'historique complet d'une parcelle.",
      color: "primary",
    },
    {
      icon: Scale,
      title: "Justice Efficiente",
      desc: "Réduction drastique des litiges. Les tribunaux accèdent à des preuves vérifiables.",
      color: "accent",
    },
    {
      icon: TrendingUp,
      title: "Accès au Crédit",
      desc: "Les banques peuvent désormais accepter les terrains comme garanties sûres.",
      color: "primary",
    },
    {
      icon: Users,
      title: "Multi-Parties",
      desc: "Interfaces dédiées pour citoyens, agents fonciers, notaires et tribunaux.",
      color: "accent",
    },
  ];

  return (
    <section
      id="solution"
      className="relative py-32 hover:bg-green-100 duration-300"
    >
      <div className="absolute inset-0 from-slate-950 via-primary/5 to-slate-950" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            La <span className="text-gradient">Solution</span> Blockchain
          </h2>
          <p className="text-slate-400 text-lg">
            FoncierChain élimine la corruption et les erreurs humaines du
            registre foncier. Chaque transaction est traçable, vérifiable et
            permanente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative glass rounded-3xl p-8 h-full glass-hover border-white/5 group-hover:border-primary/30">
                <div
                  className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 glass rounded-3xl p-8 md:p-12 border-primary/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Pourquoi la Blockchain ?
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                L'immuabilité garantit qu'une parcelle, une fois enregistrée, ne
                peut pas être ré-enregistrée. Le contrat intelligent rejette
                automatiquement toute tentative d'enregistrement d'une parcelle
                déjà présente dans le registre.
              </p>
              <ul className="space-y-3">
                {[
                  "Consensus distribué",
                  "Cryptographie asymétrique",
                  "Smart contracts auto-exécutables",
                  "Historique immuable",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative glass rounded-2xl p-6 border border-primary/30">
                <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 font-mono">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="ml-2">foncierchain.congo</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded bg-slate-900/50 border border-slate-800">
                    <span className="text-primary">{">"}</span> Transaction:
                    0x7f8a9b...
                  </div>
                  <div className="p-3 rounded bg-slate-900/50 border border-slate-800">
                    <span className="text-accent">{">"}</span> Parcelle:
                    BZV-2024-08912
                  </div>
                  <div className="p-3 rounded bg-red-950/30 border border-red-900/50 text-red-400">
                    <span className="text-alert">✕</span> Double attribution
                    détectée
                  </div>
                  <div className="p-3 rounded bg-green-950/30 border border-green-900/50 text-green-400">
                    <span className="text-primary">✓</span> Rejet automatique -
                    Parcelle existante
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Section CTA Finale
const CTASection = () => {
  return (
    <section id="impact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-amber-100 from-primary/20 via-slate-950 to-slate-950" />

      <motion.div
        className="max-w-4xl mx-auto px-6 relative z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Construisons l'avenir
          <br />
          <span className="text-gradient">du foncier congolais</span>
        </h2>

        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Rejoignez la révolution blockchain pour un Congo où la propriété
          foncière est sécurisée, transparente et accessible à tous.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            className="px-10 py-5 rounded-full bg-primary text-slate-950 font-bold text-lg glow-button w-full sm:w-auto"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(34, 197, 94, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Déployer à Brazzaville
          </motion.button>

          <motion.button
            className="px-10 py-5 rounded-full glass text-white font-semibold text-lg glass-hover w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contacter l'équipe
          </motion.button>
        </div>

        <motion.div
          className="mt-12 flex justify-center gap-8 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Brazzaville, Pointe-Noire
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Conforme ODD 1, 11, 16
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="border-t border-white/5 py-12 bg-slate-950">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Database className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold">FoncierChain</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-500 text-sm">Miabe Hackathon 2026</span>
      </div>

      <div className="text-slate-600 text-sm">NEXT CODELITE TEAM © 2026</div>
    </div>
  </footer>
);

// App Principal
function AppUpdate() {
  return (
    <div className="bg-blend-darken min-h-screen selection:bg-primary/30">
      <Navigation />
      <Hero />
      <CrisisSection />
      <SolutionSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default AppUpdate;
