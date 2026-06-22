import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-10">
      <div className="glass flex flex-col items-center justify-between gap-3 rounded-2xl px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 text-primary" fill="currentColor" />
          <span>CardioAI — for educational use only. Not a substitute for medical advice.</span>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} CardioAI</div>
      </div>
    </footer>
  );
}
