export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function media(name: string): string {
  return withBase(`media/${name}`);
}
