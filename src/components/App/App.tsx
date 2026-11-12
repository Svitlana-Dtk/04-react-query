import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import { useQuery } from '@tanstack/react-query';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: searchQuery.trim() !== '',
  });

  useEffect(() => {
    if (isSuccess && data.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data, isSuccess]);

  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <Toaster />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {data && data.length > 0 && (
        <MovieGrid movies={data} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
