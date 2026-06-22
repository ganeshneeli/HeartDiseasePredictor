import { motion } from "framer-motion";
import { AlertTriangle, HeartPulse, CheckCircle2 } from "lucide-react";

interface Props {
  prediction: 0 | 1;
  onReset: () => void;
}

export function ResultCard({ prediction, onReset }: Props) {
  const high = prediction === 1;

  const recHigh = [
    "Consult a cardiologist promptly for clinical evaluation",
    "Monitor blood pressure and cholesterol regularly",
    "Adopt a heart-healthy diet (low sodium, low saturated fat)",
    "Begin a doctor-approved exercise routine",
    "Avoid smoking and limit alcohol intake",
  ];
  const recLow = [
    "Maintain a balanced, Mediterranean-style diet",
    "Stay active: 150+ minutes of moderate exercise weekly",
    "Get annual checkups and lipid screening",
    "Manage stress with mindfulness or sleep hygiene",
    "Keep BMI, blood pressure, and cholesterol in range",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass overflow-hidden rounded-3xl"
      style={{
        boxShadow: high
          ? "0 20px 60px -10px oklch(0.58 0.23 25 / 0.35)"
          : "0 20px 60px -10px oklch(0.62 0.16 155 / 0.35)",
      }}
    >
      <div
        className="px-6 py-5 sm:px-8 sm:py-6"
        style={{
          background: high
            ? "linear-gradient(135deg, oklch(0.65 0.22 25 / 0.15), oklch(0.55 0.2 15 / 0.05))"
            : "linear-gradient(135deg, oklch(0.7 0.18 155 / 0.15), oklch(0.6 0.16 180 / 0.05))",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
            style={{
              background: high
                ? "linear-gradient(135deg, oklch(0.65 0.23 25), oklch(0.55 0.22 15))"
                : "linear-gradient(135deg, oklch(0.62 0.16 155), oklch(0.7 0.18 180))",
              color: "white",
            }}
          >
            {high ? <AlertTriangle className="h-7 w-7" /> : <CheckCircle2 className="h-7 w-7" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Assessment Result
            </div>
            <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
              {high ? "High Risk of Heart Disease" : "Low Risk of Heart Disease"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {high
                ? "Your inputs suggest elevated cardiovascular risk. Please seek medical guidance."
                : "Your inputs suggest low cardiovascular risk. Keep up the healthy habits!"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <HeartPulse className="h-4 w-4 text-primary" />
          {high ? "Healthcare Recommendations" : "Preventive Recommendations"}
        </div>
        <ul className="space-y-2">
          {(high ? recHigh : recLow).map((r) => (
            <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: high ? "var(--color-destructive)" : "var(--color-success)" }}
              />
              {r}
            </li>
          ))}
        </ul>
        <button
          onClick={onReset}
          className="mt-6 inline-flex items-center justify-center rounded-xl border border-border bg-background/40 px-5 py-2.5 text-sm font-medium hover:bg-accent/20"
        >
          Run another assessment
        </button>
      </div>
    </motion.div>
  );
}
