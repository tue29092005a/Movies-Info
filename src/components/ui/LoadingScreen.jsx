import React from "react";
import { Loader2 } from "lucide-react";
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <h2 className="text-xl font-semibold animate-pulse text-foreground">
        Đang tải phim ...
      </h2>
    </div>
  );
}