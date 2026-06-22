import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PredictionForm } from "@/components/PredictionForm";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heart Disease Risk Predictor | AI Clinical Assessment" },
      { name: "description", content: "AI-powered heart disease risk assessment based on clinical parameters." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PredictionForm />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
