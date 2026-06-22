import { useEffect, useState } from "react";
import { Heart, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl btn-hero">
            <Heart className="h-5 w-5" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold">CardioAI</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk Predictor</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="#predict" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block">Predict</a>
          <a href="#features" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block">Features</a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background/40 transition-colors hover:bg-accent/20"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
