import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '27490276-ab5b5e1d2864396bd713e71df';

// export class ImagesApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.perPage = 100;
//   }

//   fechImages() {
//     return axios
//       .get(
//         `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`,
//       )
//       .then(({ data }) => {
//         this.page += 1;
//         return data;
//       });
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
//*=============async/await======================
export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fechImages() {
    const { data } = await axios.get(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`,
    );
    this.page += 1;

    return data;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
