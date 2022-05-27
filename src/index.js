import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import { fechImages } from './js/fech-images';
import { markupCard } from './js/markup-templeates';
import { ImagesApiService } from './js/fech-images';

const imagesApiService = new ImagesApiService();

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const handleFormSubmit = e => {
  e.preventDefault();
  //todo перевіряти чи клікнув іменно в img
  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPage();
  imagesApiService.fechImages().then(({ hits }) => {
    console.log(hits);
    // Перевірка на повернення пуcтого масиву
    if (JSON.stringify(hits) === JSON.stringify([])) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      refs.form.reset();
    }

    //малює розмітку
    const list = hits.map(card => markupCard(card));
    // refs.gallery.insertAdjacentHTML('beforeend', list.join(' '));
    refs.gallery.innerHTML = list.join('');

    // добавляє кнопку load-more
    if (JSON.stringify(hits) > JSON.stringify([])) {
      refs.loadMoreBtn.classList.remove('load-more');
    }
  });
};

//кнопкa load-more
const handleLoadMoreClick = () => {
  imagesApiService.fechImages().then(({ hits }) => {
    const list = hits.map(card => markupCard(card));

    refs.gallery.insertAdjacentHTML('beforeend', list.join(' '));
  });
};

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);
