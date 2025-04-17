import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addToWishlist, removeFromWishlist, selectWishlist } from '../store/wishlistSlice';
import { getImageUrl } from '../services/api';

const MovieCard = ({ item, type = 'movie' }) => {
  if (!item) {
    return null;
  }

  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const isInWishlist = wishlist.some(i => i.id === item.id);

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent link navigation when clicking the wishlist button
    if (isInWishlist) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist({ ...item, type }));
    }
  };

  const releaseYear = item.release_date || item.first_air_date
    ? new Date(item.release_date || item.first_air_date).getFullYear()
    : 'N/A';

  return (
    <Card sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          zIndex: 1,
        }}
        onClick={handleWishlistClick}
      >
        {isInWishlist ? <Favorite color="primary" /> : <FavoriteBorder />}
      </IconButton>
      <Link to={`/${type}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
                position: "absolute",
                bottom: "110px",
                left: "30px",
                width: 40,
                height: 40,
                backgroundColor: "#081c22",
                borderRadius: "50%",
                padding: "2px"
              }}>
              <CircularProgressbar
                  value={item.vote_average * 10}
                  text={`${Math.round(item.vote_average * 10)}%`}
                  styles={buildStyles({
                    textSize: "28px",
                    textColor: "#fff",
                    pathColor: item.vote_average * 10 >= 70 ? "#21d07a" : "#d2d531",
                    trailColor: "#204529",
                  })}
                />
              </div>
        <CardMedia
          component="img"
          height="300"
          image={getImageUrl(item.poster_path)}
          alt={item.title || item.name || 'Movie poster'}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" component="div" noWrap>
            {item.title || item.name || 'Untitled'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {releaseYear}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⭐ {(item.vote_average || 0).toFixed(1)}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MovieCard; 