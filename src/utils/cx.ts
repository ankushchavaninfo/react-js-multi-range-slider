type ClassValue = string | Record<string, boolean> | undefined | null | false;

export const cx = (...values: ClassValue[]): string =>
  values
    .flatMap((v) => {
      if (!v) return [];
      if (typeof v === "string") return [v];
      return Object.keys(v).filter((k) => (v as Record<string, boolean>)[k]);
    })
    .join(" ");
