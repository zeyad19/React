import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Typography,
  Pagination,
  CircularProgress,
  Alert,
  Box,
  Button,
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../services/api';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching movies for page:', page);
        const response = await getMovies(page);
        console.log('Movies response:', response.data);
        
        if (!response.data || !Array.isArray(response.data.results)) {
          throw new Error('Invalid response format from API');
        }
        
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500)); // TMDb API limits to 500 pages
      } catch (err) {
        console.error('Error in MoviesList:', err);
        setError(err.message || 'Failed to fetch movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => setPage(1)}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Now Playing Movies
      </Typography>
      
      {movies.length === 0 ? (
        <Alert severity="info">No movies available at the moment.</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard item={movie} type="movie" />
              </Grid>
            ))}
          </Grid>
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default MoviesList; 