import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const KEY = '27490276-ab5b5e1d2864396bd713e71df';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fechImages() {
    axios
      .get(
        `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
      )
      // .then(response => response.json())
      .then(({ data }) => {
        // console.log(data);
        this.page += 1;
        return data;
      });
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
//*=============async/await======================
// export class ImagesApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async fechImages() {
//     try {
//       const response = await fetch(
//         `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`,
//       );
//       const { hits } = await response.json();
//       const incrementPage = (this.page += 1);
//       return hits;
//     } catch (error) {
//       console.log(error);
//     }
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
