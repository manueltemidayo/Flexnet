export interface MediaItem {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  release_date: string
  first_air_date: string
  media_type: 'movie' | 'tv'
  overview: string
  genre_ids: number[]
}

export interface MovieDetails extends MediaItem {
  runtime: number
  genres: Genre[]
  tagline: string
}

export interface TVDetails extends MediaItem {
  episode_run_time: number[]
  genres: Genre[]
  number_of_seasons: number
}

export interface Genre {
  id: number
  name: string
}

export interface ApiResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
