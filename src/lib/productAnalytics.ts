export function emitProductEvent(event: string): void {
  const target = window as Window & { dataLayer?: Array<Record<string, string>> };
  target.dataLayer ??= [];
  target.dataLayer.push({ event });
}
