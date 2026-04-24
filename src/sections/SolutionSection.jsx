export const SolutionSection = ({
  Database,
  Search,
  Scale,
  TrendingUp,
  Users,
  fadeInUp,
}) => {
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
