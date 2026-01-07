export type Track = {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  album: {
    name: string;
    images: {
      url: string;
    }[];
    release_date: string;
  };
  artists: {
    name: string;
  }[];
};
