export const Footer = () => (
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
