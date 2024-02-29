import GithubSlugger from 'github-slugger';

const slugger = new GithubSlugger();

export function slugify(value: string): string {
  return slugger.slug(value);
}
