import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Typography,
  Pagination,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import { getTVShows } from '../services/api';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTVShows(page);
        setShows(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500)); // TMDb API limits to 500 pages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
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

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Popular TV Shows
      </Typography>
      <Grid container spacing={3}>
        {shows.map((show) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
            <MovieCard item={show} type="tv" />
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
    </Container>
  );
};

export default TVShows; 