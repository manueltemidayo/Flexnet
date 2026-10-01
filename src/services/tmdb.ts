import type {
  MediaItem,
  MovieDetails,
  TVDetails,
  ApiResponse,
} from '../types/movie'

console.log("BASE URL:", import.meta.env.VITE_TMDB_BASE_URL);
console.log("API KEY:", import.meta.env.VITE_TMDB_API_KEY);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL as string
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL as string

{/*async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
  }
  return response.json() as Promise<T>
}
*/}

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {

  if (!BASE_URL) {
    throw new Error(
      "VITE_TMDB_BASE_URL is missing. Check your .env file."
    )
  }

  if (!API_KEY) {
    throw new Error(
      "VITE_TMDB_API_KEY is missing. Check your .env file."
    )
  }

  const url = new URL(`${BASE_URL}${endpoint}`)

  url.searchParams.set("api_key", API_KEY)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(
      `TMDB API error: ${response.status} ${response.statusText}`
    )
  }

  return response.json() as Promise<T>
}

function mapMediaItem(item: Record<string, unknown>): MediaItem {
  return {
    id: item.id as number,
    title: (item.title as string) || (item.name as string) || 'Untitled',
    poster_path: item.poster_path as string | null,
    backdrop_path: item.backdrop_path as string | null,
    vote_average: item.vote_average as number,
    release_date: (item.release_date as string) || '',
    first_air_date: (item.first_air_date as string) || '',
    media_type: (item.media_type as 'movie' | 'tv') || 'movie',
    overview: (item.overview as string) || '',
    genre_ids: (item.genre_ids as number[]) || [],
  }
}

export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Poster'
  return `${IMAGE_BASE_URL.replace(/\/w500$/, `/${size}`)}${path}`
}

export async function getTrendingMovies(): Promise<MediaItem[]> {
  const data = await fetchTMDB<ApiResponse<Record<string, unknown>>>(
    '/trending/movie/week'
  )
  return data.results.map(mapMediaItem)
}

export async function getPopularMovies(): Promise<MediaItem[]> {
  const data = await fetchTMDB<ApiResponse<Record<string, unknown>>>(
    '/movie/popular'
  )
  return data.results.map(mapMediaItem)
}

export async function getPopularTVShows(): Promise<MediaItem[]> {
  const data = await fetchTMDB<ApiResponse<Record<string, unknown>>>(
    '/tv/popular'
  )
  return data.results.map(mapMediaItem)
}

export async function searchMulti(query: string): Promise<MediaItem[]> {
  const data = await fetchTMDB<ApiResponse<Record<string, unknown>>>(
    '/search/multi',
    { query, include_adult: 'false' }
  )
  return data.results
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map(mapMediaItem)
}

export async function getMovieDetails(id: number | string): Promise<MovieDetails> {
  const item = await fetchTMDB<Record<string, unknown>>(`/movie/${id}`)
  return {
    ...mapMediaItem(item),
    runtime: item.runtime as number,
    genres: item.genres as MovieDetails['genres'],
    tagline: (item.tagline as string) || '',
  }
}

export async function getTVDetails(id: number | string): Promise<TVDetails> {
  const item = await fetchTMDB<Record<string, unknown>>(`/tv/${id}`)
  return {
    ...mapMediaItem(item),
    episode_run_time: (item.episode_run_time as number[]) || [],
    genres: item.genres as TVDetails['genres'],
    number_of_seasons: item.number_of_seasons as number,
  }
}
