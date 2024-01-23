import React from 'react';

const MovieDetails = ({ selectedMovie }) => {
  return (
    <div style={styles.movieDetailsContainer}>
      {selectedMovie ? (
        <>
          <h2 style={styles.title}>{selectedMovie.title}</h2>
          <div style={styles.details}>
            <p style={styles.episode}>Episode {selectedMovie.episode_id}</p>
            <p style={styles.releaseDate}>
              Released on {new Date(selectedMovie.release_date).toLocaleDateString()}
            </p>
            <p style={styles.director}>Directed by {selectedMovie.director}</p>
            <p style={styles.openingCrawl}>{selectedMovie.opening_crawl}</p>
          </div>
        </>
      ) : (
        <p style={styles.defaultText}>Select a movie to see details</p>
      )}
    </div>
  );
};

const styles = {
    movieDetailsContainer: {
      height: '100vh',
      width: '100%',
      padding: '20px',
      backgroundColor: '#f2f2f2',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
      borderBottom: '2px solid #333',
      paddingBottom: '5px',
    },
    details: {
      marginTop: '10px',
    },
    episode: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    releaseDate: {
      marginBottom: '5px',
    },
    director: {
      marginBottom: '5px',
    },
    openingCrawl: {
      textAlign: 'justify',
    },
    defaultText: {
      fontStyle: 'italic',
    },
    line: {
      width: '100%',
      height: '2px',
      background: '#333',
      margin: '20px 0',
    },
  };
  


export default MovieDetails;
