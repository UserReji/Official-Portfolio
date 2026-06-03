import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild variant="gradient">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              View projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
