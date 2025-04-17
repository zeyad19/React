import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Box,
  Divider,
  Rating,
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import { getMovieDetails, getMovieReviews, getMovieRecommendations, getImageUrl } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [movieResponse, reviewsResponse, recommendationsResponse] = await Promise.all([
          getMovieDetails(id),
          getMovieReviews(id),
          getMovieRecommendations(id)
        ]);

        setMovie(movieResponse.data);
        setReviews(reviewsResponse.data.results.slice(0, 3)); // Show only first 3 reviews
        setRecommendations(recommendationsResponse.data.results.slice(0, 4)); // Show only first 4 recommendations
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

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

  if (!movie) return null;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Movie Details */}
        <Grid item xs={12} md={4}>
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <Typography component="span" sx={{ ml: 1 }}>
              {movie.vote_average.toFixed(1)}/10
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </Typography>
        </Grid>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Reviews
            </Typography>
            <Grid container spacing={2}>
              {reviews.map((review) => (
                <Grid item xs={12} key={review.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>{review.author}</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {review.content.length > 300
                          ? `${review.content.substring(0, 300)}...`
                          : review.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Recommendations
            </Typography>
            <Grid container spacing={2}>
              {recommendations.map((movie) => (
                <Grid item xs={12} sm={6} md={3} key={movie.id}>
                  <MovieCard item={movie} type="movie" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MovieDetails; 