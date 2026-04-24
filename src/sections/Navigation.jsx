import { useEffect, useState } from "react";

export const Navigation = () => {
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
