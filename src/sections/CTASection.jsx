export const CTASection = () => {
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
