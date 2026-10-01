import { createContext, useContext, useState, type ReactNode } from 'react'
import type { MediaItem } from '../types/movie'
import { getBookmarks, toggleBookmark } from '../utils/storage'

interface BookmarkContextType {
  bookmarks: MediaItem[]
  toggleBookmark: (item: MediaItem) => void
  isBookmarked: (id: number) => boolean
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<MediaItem[]>(getBookmarks)

  const handleToggleBookmark = (item: MediaItem) => {
    toggleBookmark(item)
    setBookmarks(getBookmarks())
  }

  const checkIsBookmarked = (id: number) => {
    return bookmarks.some((b) => b.id === id)
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        toggleBookmark: handleToggleBookmark,
        isBookmarked: checkIsBookmarked,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}
