import { slug } from 'github-slugger';

export function slugify(value: string): string {
  return slug(value);
}
