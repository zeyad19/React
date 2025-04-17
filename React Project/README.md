# Movie App

A modern movie application built with React, Redux, and Material-UI that allows users to browse movies, view details, manage a wishlist, and search for content using The Movie Database (TMDb) API.

## Features

- Browse now playing movies
- View movie details, reviews, and recommendations
- Search for movies
- Add/remove movies to/from wishlist
- Multi-language support (English, Arabic, French, Chinese)
- RTL support for Arabic language
- Responsive design
- Pagination support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDb API key (get it from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDb API key:
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React
- Redux Toolkit
- React Router
- Material-UI
- Axios
- Vite

## License

MIT 