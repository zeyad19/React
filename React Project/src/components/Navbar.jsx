import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  TextField,
  Select,
  MenuItem,
  Box,
  InputAdornment,
} from '@mui/material';
import { Search, Favorite, Movie, Tv } from '@mui/icons-material';
import { selectWishlistCount } from '../store/wishlistSlice';
import { selectCurrentLanguage, selectSupportedLanguages, changeLanguage } from '../store/languageSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const wishlistCount = useSelector(selectWishlistCount);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const supportedLanguages = useSelector(selectSupportedLanguages);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLanguageChange = (event) => {
    dispatch(changeLanguage(event.target.value));
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "#f1c40f" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 0 }}
          className="text-dark"
        >
          Movie App
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
          <IconButton color="inherit" component={Link} to="/" className="text-dark">
            <Movie />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/tv" className="text-dark">
            <Tv />
          </IconButton>
        </Box>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ flexGrow: 1, display: 'flex', mx: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            variant="outlined"
            sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Select
          size="small"
          value={currentLanguage}
          onChange={handleLanguageChange}
          sx={{ mx: 2, bgcolor: 'background.paper', width: 100 }}
        >
          {supportedLanguages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Select>

        <IconButton color="inherit" component={Link} to="/wishlist">
          <Badge badgeContent={wishlistCount} color="error">
            <Favorite className="text-dark" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 