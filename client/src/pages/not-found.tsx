import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="text-6xl font-bold text-muted-foreground/20">404</div>
      <h2 className="text-xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground text-sm">The page you are looking for does not exist.</p>
      <Button variant="outline" className="gap-2" onClick={() => window.location.hash = "/"}>
        <Home className="w-4 h-4" />
        Back to Dashboard
      </Button>
    </div>
  );
}
