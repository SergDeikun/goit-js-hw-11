import { refs } from './js/get-refs';
import { markupCards } from './js/markup-templeates';
import { ImagesApiService } from './js/fech-images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imagesApiService = new ImagesApiService();

// const handleFormSubmit = async e => {
//   e.preventDefault();
//   clearGallery();

//   imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
//   imagesApiService.resetPage();

//   if (imagesApiService.query === '') {
//     Notify.warning('Please, enter a query!');
//     // refs.loadMoreBtn.classList.add('is-hidden');//todo можна видалити
//     return;
//   }

//   imagesApiService
//     .fechImages()
//     .then(({ hits, totalHits }) => {
//       if (hits.length === 0) {
//         Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         refs.form.reset();
//       }

//       if (hits.length > 1) {
//         refs.submitBtn.disabled = true;
//         refs.loadMoreBtn.classList.remove('is-hidden');
//         Notify.success(`Hooray!We found ${totalHits} images`);
//       }

//       if (totalHits < 40) {
//         refs.loadMoreBtn.classList.add('is-hidden');
//       }

//       markupCards(hits);

//       const handleFormInput = e => {
//         if (e.currentTarget.elements.searchQuery.value === '') {
//           refs.submitBtn.disabled = false;
//           refs.loadMoreBtn.classList.add('is-hidden');
//         }
//       };

//       let gallery = new SimpleLightbox('.gallery a');
//       gallery.on('show.simplelightbox', () => {});

//       refs.form.addEventListener('input', handleFormInput);
//     })
//     .catch(error => console.log(error));
// };

// const handleLoadMoreClick = async () => {
//   refs.loadMoreBtn.classList.add('is-hidden');
//   try {
//     imagesApiService.fechImages().then(({ hits, totalHits }) => {
//       refs.loadMoreBtn.classList.remove('is-hidden');
//       markupCards(hits);
//     });
//   } catch (error) {
//     refs.loadMoreBtn.classList.remove('is-hidden');
//     Notify.info("We're sorry, but you've reached the end of search results.");
//   }

//   // imagesApiService.fechImages().then(({ hits, totalHits }) => {
//   //   refs.loadMoreBtn.classList.remove('is-hidden');
//   //   // markupCards(hits);

//   //   if (totalHits < 40) {
//   //     refs.loadMoreBtn.classList.add('is-hidden');
//   //   }
//   // });
// };

// const clearGallery = () => {
//   refs.gallery.innerHTML = '';
// };

// refs.form.addEventListener('submit', handleFormSubmit);
// refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);

// * async/away
const handleFormSubmit = async e => {
  try {
    e.preventDefault();
    clearGallery();

    imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    imagesApiService.resetPage();

    if (imagesApiService.query === '') {
      Notify.warning('Please, enter a query!');
      return;
    }
    const { hits, totalHits } = await imagesApiService.fechImages();

    if (hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      refs.form.reset();
    }

    if (hits.length > 1) {
      refs.submitBtn.disabled = true;
      refs.loadMoreBtn.classList.remove('is-hidden');
      Notify.success(`Hooray!We found ${totalHits} images`);
    }

    if (totalHits < 40) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    markupCards(hits);

    const handleFormInput = e => {
      if (e.currentTarget.elements.searchQuery.value === '') {
        refs.submitBtn.disabled = false;
        refs.loadMoreBtn.classList.add('is-hidden');
      }
    };

    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', () => {});

    refs.form.addEventListener('input', handleFormInput);
  } catch (error) {
    console.log(error);
  }
};

const handleLoadMoreClick = async () => {
  try {
    refs.loadMoreBtn.classList.add('is-hidden');
    const { hits, totalHits } = await imagesApiService.fechImages();
    refs.loadMoreBtn.classList.remove('is-hidden');
    markupCards(hits);
  } catch (error) {
    console.log(error);
  }
};

const clearGallery = () => {
  refs.gallery.innerHTML = '';
};

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);
