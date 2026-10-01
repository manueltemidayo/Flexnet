import type { MediaItem } from '../types/movie'

const STORAGE_KEY = 'movieapp_bookmarks'

export function getBookmarks(): MediaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function isBookmarked(id: number): boolean {
  return getBookmarks().some((item) => item.id === id)
}

export function toggleBookmark(item: MediaItem): boolean {
  const bookmarks = getBookmarks()
  const index = bookmarks.findIndex((b) => b.id === item.id)

  if (index >= 0) {
    bookmarks.splice(index, 1)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    return false
  } else {
    bookmarks.push(item)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    return true
  }
}
