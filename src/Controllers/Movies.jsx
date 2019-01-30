import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./Common/pagination";
import { paginate } from "../utils/paginate";
import Listgroup from "./Common/Listgroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./Common/searchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleSearch = query => {
    this.setState({ searchQuery: query, currentGenre: "", currentPage: 1 });
  };
  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.state;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (currentGenre && currentGenre._id) {
      filtered = currentGenre
        ? currentGenre.name === "All Genres"
          ? allMovies
          : allMovies.filter(m => m.genre._id === currentGenre._id)
        : allMovies;
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const _movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: _movies };
  };
  render() {
    console.log("Render in Movies");
    const { length: moviesCount } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.state;
    if (moviesCount === 0) return <p> There are no movies in the database.</p>;
    const { totalCount, data } = this.getPagedData();

    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <Listgroup
              items={genres}
              selectedItem={currentGenre}
              onSelectionChanged={this.handleGenreSelection}
            />
          </div>

          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <p>showing {totalCount} movies in the database.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onDelete={this.handleDeleteButton}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
  handleDeleteButton = movie => {
    const mvs = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: mvs });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelection = genre => {
    this.setState({ currentGenre: genre, currentPage: 1, searchQuery: "" });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
}

export default Movies;
