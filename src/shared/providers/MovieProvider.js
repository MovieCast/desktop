import axios from 'axios';

class MovieProvider {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://content.moviecast.xyz'
    });
  }

  getMovies({ page = 1, genre = 'all', sort = 'trending', keywords = null } = {}) {
    return this.api.get(`/movies/${page}`, {
      params: {
        genre,
        sort,
        keywords
      }
    });
  }

  getMovie(id) {
    return this.api.get(`/movies/detail/${id}`);
  }
}

export default new MovieProvider();
