export interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  description?: string;
  url: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
}
