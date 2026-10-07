"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="my-12 flex flex-col items-center gap-4 text-center">
      <h2 className="text-xl text-muted-foreground">
        No pudimos cargar la tienda
      </h2>
      <Button variant="brand" onClick={() => retry()}>
        Reintentar
      </Button>
    </div>
  );
}
