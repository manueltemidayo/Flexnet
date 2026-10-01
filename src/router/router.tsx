import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/home/Home'
import Movies from '../pages/movies/Movies'
import TvSeries from '../pages/tv-series/TvSeries'
import Bookmarks from '../pages/bookmarks/Bookmarks'
import Search from '../pages/search/Search'
import MovieDetails from '../pages/movie-details/MovieDetails'
import TvDetails from '../pages/tv-details/TvDetails'
import Error from '../pages/error/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movies', element: <Movies /> },
      { path: 'tv-series', element: <TvSeries /> },
      { path: 'bookmarks', element: <Bookmarks /> },
      { path: 'search', element: <Search /> },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: 'tv/:id', element: <TvDetails /> },
      { path: '*', element: <Error /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
