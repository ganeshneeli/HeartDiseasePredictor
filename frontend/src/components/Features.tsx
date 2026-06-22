import { motion } from "framer-motion";
import { Zap, Brain, ShieldCheck, MousePointerClick } from "lucide-react";

const features = [
  { icon: Zap, title: "Fast Prediction", desc: "Sub-second inference with optimized model serving." },
  { icon: Brain, title: "AI Powered", desc: "Trained on clinical datasets for reliable insight." },
  { icon: ShieldCheck, title: "Secure", desc: "Your inputs never leave your session unencrypted." },
  { icon: MousePointerClick, title: "Easy to Use", desc: "Clean, intuitive form with smart defaults." },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl btn-hero">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
