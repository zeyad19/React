import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Box, Pagination } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await searchMovies(query, currentPage);
        setResults(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500)); // TMDb API limits to 500 pages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage]);

  const handlePageChange = (event, value) => {
    setSearchParams({ query, page: value });
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!query) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Please enter a search query</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for "{query}"
      </Typography>
      
      {results.length === 0 ? (
        <Alert severity="info">No results found for "{query}"</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {results.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard item={movie} type="movie" />
              </Grid>
            ))}
          </Grid>
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
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

export default SearchResults; 