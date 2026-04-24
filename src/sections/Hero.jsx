import { useScroll, useTransform } from "framer-motion";

// Section Hero
export const Hero = ({ staggerContainer, fadeInUp }) => {
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
