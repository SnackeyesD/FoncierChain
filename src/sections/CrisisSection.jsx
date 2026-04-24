export const CrisisSection = () => {
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
