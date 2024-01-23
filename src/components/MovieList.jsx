import React from 'react';

const MovieList = ({ movies, onSelectMovie }) => {
    const formatReleaseDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    };
  
    return (
      <div style={styles.movieListContainer}>
        <ul style={styles.movieList}>
          {movies.map((movie) => (
            <li key={movie.episode_id} style={styles.movieItem} onClick={() => onSelectMovie(movie)}>
              <span style={styles.movieInfo}>Episode {movie.episode_id}</span>
              {movie.title}
              <span style={styles.releaseDate}> {formatReleaseDate(movie.release_date)}</span>
            </li>
          ))}
        </ul>
       
      </div>
    );
  };

const styles = {
    movieListContainer: {
      height: '100vh',
      width: '100%',
      padding: '20px',
      backgroundColor: '#f2f2f2',
      borderRadius: '5px',
      marginBottom: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    movieList: {
      listStyle: 'none',
      padding: 0,
      cursor: 'pointer',
    },
    movieItem: {
      margin: '10px 0',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    movieInfo: {
      fontWeight: 'bold',
      marginRight: '10px',
      flex: '0.2',
    },
    movieTitle: {
      flex: '0.6',
    },
    releaseDate: {
      marginLeft: '10px',
      flex: '0.2',
    },
  };

export default MovieList;
