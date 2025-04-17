import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store';
import theme from './theme';


import Navbar from './components/Navbar';


import MoviesList from './pages/MoviesList';
import MovieDetails from './pages/MovieDetails';
import TVShows from './pages/TVShows';
import TVShowDetails from './pages/TVShowDetails';
import SearchResults from './pages/SearchResults';
import Wishlist from './pages/Wishlist';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<MoviesList />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/tv" element={<TVShows />} />
                <Route path="/tv/:id" element={<TVShowDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 