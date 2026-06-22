import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 sm:pt-24 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI-powered clinical assessment
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Heart Disease <span className="gradient-text">Risk Predictor</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          AI-powered heart disease risk assessment based on clinical parameters. Get instant insights with enterprise-grade accuracy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#predict" className="inline-flex items-center gap-2 rounded-xl btn-hero px-6 py-3 text-sm font-semibold">
            <Activity className="h-4 w-4" /> Start Assessment
          </a>
          <a href="#features" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/40 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-accent/20">
            Learn more
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "var(--gradient-hero)", filter: "blur(120px)", opacity: 0.35 }}
      />
    </section>
  );
}
