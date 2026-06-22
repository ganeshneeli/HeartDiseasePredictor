import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Activity, AlertCircle } from "lucide-react";
import { ResultCard } from "./ResultCard";

type FormValues = {
  Age: number;
  Sex: "M" | "F";
  ChestPainType: "ATA" | "NAP" | "TA" | "ASY";
  RestingBP: number;
  Cholesterol: number;
  FastingBS: 0 | 1;
  RestingECG: "Normal" | "ST" | "LVH";
  MaxHR: number;
  ExerciseAngina: "Y" | "N";
  Oldpeak: number;
  ST_Slope: "Up" | "Flat" | "Down";
};

const fieldClass =
  "w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

export function PredictionForm() {
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      Age: 45, Sex: "M", ChestPainType: "ATA", RestingBP: 120, Cholesterol: 200,
      FastingBS: 0, RestingECG: "Normal", MaxHR: 150, ExerciseAngina: "N",
      Oldpeak: 1.0, ST_Slope: "Up",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<0 | 1 | null>(null);
  const age = watch("Age");

  const onSubmit = async (data: FormValues) => {
    setLoading(true); setError(null); setPrediction(null);
    try {
      const res = await axios.post("http://localhost:8000/predict", {
        ...data,
        Age: Number(data.Age),
        RestingBP: Number(data.RestingBP),
        Cholesterol: Number(data.Cholesterol),
        FastingBS: Number(data.FastingBS),
        MaxHR: Number(data.MaxHR),
        Oldpeak: Number(data.Oldpeak),
      });
      setPrediction(res.data.prediction === 1 ? 1 : 0);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e?.message || "Unable to reach prediction service.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => { setPrediction(null); setError(null); reset(); };

  return (
    <section id="predict" className="mx-auto max-w-6xl px-4 py-10">
      <AnimatePresence mode="wait">
        {prediction !== null ? (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultCard prediction={prediction} onReset={resetAll} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl btn-hero">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">Clinical Parameters</h2>
                <p className="text-sm text-muted-foreground">Enter the patient's values for assessment</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Age slider */}
              <div className="sm:col-span-2">
                <div className="flex items-end justify-between">
                  <label className={labelClass}>Age</label>
                  <span className="text-2xl font-bold gradient-text">{age}</span>
                </div>
                <Controller
                  name="Age"
                  control={control}
                  rules={{ required: true, min: 18, max: 100 }}
                  render={({ field }) => (
                    <input
                      type="range" min={18} max={100} {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="mt-2 w-full accent-[var(--color-primary)]"
                    />
                  )}
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>18</span><span>100</span></div>
              </div>

              <div>
                <label className={labelClass}>Sex</label>
                <select {...register("Sex")} className={`${fieldClass} mt-2`}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Chest Pain Type</label>
                <select {...register("ChestPainType")} className={`${fieldClass} mt-2`}>
                  <option value="ATA">ATA — Atypical Angina</option>
                  <option value="NAP">NAP — Non-Anginal Pain</option>
                  <option value="TA">TA — Typical Angina</option>
                  <option value="ASY">ASY — Asymptomatic</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Resting BP (mm Hg)</label>
                <input type="number" {...register("RestingBP", { required: true, min: 60, max: 250 })}
                  className={`${fieldClass} mt-2`} />
                {errors.RestingBP && <p className="mt-1 text-xs text-destructive">Enter 60–250</p>}
              </div>

              <div>
                <label className={labelClass}>Cholesterol (mg/dL)</label>
                <input type="number" {...register("Cholesterol", { required: true, min: 0, max: 700 })}
                  className={`${fieldClass} mt-2`} />
                {errors.Cholesterol && <p className="mt-1 text-xs text-destructive">Enter 0–700</p>}
              </div>

              <div>
                <label className={labelClass}>Fasting Blood Sugar &gt; 120 mg/dL</label>
                <select {...register("FastingBS", { valueAsNumber: true })} className={`${fieldClass} mt-2`}>
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Resting ECG</label>
                <select {...register("RestingECG")} className={`${fieldClass} mt-2`}>
                  <option value="Normal">Normal</option>
                  <option value="ST">ST — ST-T abnormality</option>
                  <option value="LVH">LVH — Left Ventricular Hypertrophy</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Max Heart Rate</label>
                <input type="number" {...register("MaxHR", { required: true, min: 60, max: 230 })}
                  className={`${fieldClass} mt-2`} />
                {errors.MaxHR && <p className="mt-1 text-xs text-destructive">Enter 60–230</p>}
              </div>

              <div>
                <label className={labelClass}>Exercise-Induced Angina</label>
                <select {...register("ExerciseAngina")} className={`${fieldClass} mt-2`}>
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Oldpeak (ST Depression)</label>
                <input type="number" step="0.1" {...register("Oldpeak", { required: true, valueAsNumber: true })}
                  className={`${fieldClass} mt-2`} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>ST Slope</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(["Up", "Flat", "Down"] as const).map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" value={opt} {...register("ST_Slope")} className="peer sr-only" />
                      <div className="rounded-xl border border-border bg-background/40 px-3 py-2.5 text-center text-sm font-medium transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary">
                        {opt}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="sm:col-span-2 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="sm:col-span-2 mt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl btn-hero px-6 py-3.5 text-sm font-semibold disabled:opacity-70"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Activity className="h-4 w-4" /> Predict Risk</>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
