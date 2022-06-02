import { refs } from './js/get-refs';
import { markupCards } from './js/markup-templeates';
import { ImagesApiService } from './js/fech-images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imagesApiService = new ImagesApiService();

const handleFormSubmit = async e => {
  try {
    e.preventDefault();
    clearGallery();

    imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    imagesApiService.resetPage();

    if (imagesApiService.query === '') {
      Notify.warning('Please, enter a query!');
      refs.loadMoreBtn.classList.add('is-hidden');

      return;
    }

    const { hits, totalHits } = await imagesApiService.fechImages();

    if (hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      refs.form.reset();
    }

    if (hits.length > 1) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      Notify.success(`Hooray!We found ${totalHits} images`);
      refs.form.reset();
    }

    if (hits.length < 40) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }

    markupCards(hits);

    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', () => {});
  } catch (error) {
    console.log(error);
  }
};

const handleLoadMoreClick = async () => {
  try {
    refs.loadMoreBtn.classList.add('is-hidden');
    const { hits, totalHits } = await imagesApiService.fechImages();

    markupCards(hits);

    refs.loadMoreBtn.classList.remove('is-hidden');

    if (imagesApiService.totalPage() > totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
};

const clearGallery = () => {
  refs.gallery.innerHTML = '';
};

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);
