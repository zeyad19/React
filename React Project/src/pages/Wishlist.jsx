import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Alert,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { Movie, Tv } from '@mui/icons-material';
import MovieCard from '../components/MovieCard';
import { selectWishlist } from '../store/wishlistSlice';

const Wishlist = () => {
  const [activeTab, setActiveTab] = useState('all');
  const wishlistItems = useSelector(selectWishlist);

  const movies = wishlistItems.filter(item => item.type === 'movie');
  const tvShows = wishlistItems.filter(item => item.type === 'tv');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getFilteredItems = () => {
    switch (activeTab) {
      case 'movies':
        return movies;
      case 'tv':
        return tvShows;
      default:
        return wishlistItems;
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Wishlist
        </Typography>
        <Alert severity="info">Your wishlist is empty</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Wishlist
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="wishlist tabs"
        >
          <Tab
            label={`All (${wishlistItems.length})`}
            value="all"
          />
          <Tab
            icon={<Movie />}
            iconPosition="start"
            label={`Movies (${movies.length})`}
            value="movies"
          />
          <Tab
            icon={<Tv />}
            iconPosition="start"
            label={`TV Shows (${tvShows.length})`}
            value="tv"
          />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {getFilteredItems().map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <MovieCard item={item} type={item.type} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist; 