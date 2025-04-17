import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Rating,
  Card,
  CardContent,
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import { getTVShowDetails, getImageUrl } from '../services/api';

const TVShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShowData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTVShowDetails(id);
        setShow(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShowData();
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

  if (!show) return null;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Show Details */}
        <Grid item xs={12} md={4}>
          <img
            src={getImageUrl(show.poster_path)}
            alt={show.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {show.name} ({new Date(show.first_air_date).getFullYear()})
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Rating value={show.vote_average / 2} precision={0.5} readOnly />
            <Typography component="span" sx={{ ml: 1 }}>
              {show.vote_average.toFixed(1)}/10
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {show.overview}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>First Air Date:</strong> {new Date(show.first_air_date).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Genres:</strong> {show.genres.map(genre => genre.name).join(', ')}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Number of Seasons:</strong> {show.number_of_seasons}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Number of Episodes:</strong> {show.number_of_episodes}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Status:</strong> {show.status}
          </Typography>
        </Grid>

        {/* Seasons Section */}
        {show.seasons && show.seasons.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Seasons
            </Typography>
            <Grid container spacing={2}>
              {show.seasons.map((season) => (
                <Grid item xs={12} key={season.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {season.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {season.episode_count} Episodes | Air Date: {
                          season.air_date ? new Date(season.air_date).toLocaleDateString() : 'TBA'
                        }
                      </Typography>
                      {season.overview && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {season.overview}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TVShowDetails; 