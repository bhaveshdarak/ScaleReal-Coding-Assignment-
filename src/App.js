import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("episode");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("starWarsMovies");

        if (cachedData) {
          setMovies(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get(
            "https://swapi.dev/api/films/?format=json"
          );
          setMovies(response.data.results);

          localStorage.setItem(
            "starWarsMovies",
            JSON.stringify(response.data.results)
          );

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "episode") {
        return a.episode_id - b.episode_id;
      } else if (sortBy === "year") {
        return new Date(a.release_date) - new Date(b.release_date);
      }
      return 0;
    });

  return (
    <div style={styles.appContainer}>
      <div style={styles.searchSortContainer}>
        <label style={styles.sortLabel}>
          Sort By:
          <select
            style={styles.sortSelect}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="episode">Episode</option>
            <option value="year">Year</option>
          </select>
        </label>
        <div style={styles.searchInputContainer}>
          <div style={styles.searchIcon}>&#128269;</div>{" "}
          <input
            type="text"
            placeholder="Search by title"
            style={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.movieDetailsContainer}>
          <MovieList movies={filteredMovies} onSelectMovie={onSelectMovie} />
          <MovieDetails selectedMovie={selectedMovie} />
        </div>
      )}
    </div>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  searchSortContainer: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
  },
  sortLabel: {
    marginRight: "10px",
  },
  sortSelect: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  searchInputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flex: "1",
  },
  searchIcon: {
    position: "absolute",
    left: "10px",
    cursor: "pointer",
  },
  searchInput: {
    padding: "10px",
    paddingLeft: "30px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  movieDetailsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  
};

export default App;
