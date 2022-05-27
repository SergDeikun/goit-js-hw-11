export const markupCard = ({ likes, views, comments, downloads, webformatURL, tags }) => {
  return `<div class="photo-card">
      <img src=${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes${likes}</b>
        </p>
        <p class="info-item">
          <b>Views${views}</b>
        </p>
        <p class="info-item">
          <b>Comments${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads${downloads}</b>
        </p>
      </div>
    </div>`;
};

//todo може можна замінити параметри функції на об'єкт
//todo не включив властивість largeImageURL - посилання на велике зображення.

// export const markupCard = (hist) => {
//   const list =hits.map(({likes, views, comments, downloads, webformatURL, tags }) =>{
//    `<div class="photo-card">
//       <img src=${webformatURL}" alt="${tags}" loading="lazy" />
//       <div class="info">
//         <p class="info-item">
//           <b>Likes${likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views${views}</b>
//         </p>
//         <p class="info-item">
//           <b>Comments${comments}</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads${downloads}</b>
//         </p>
//       </div>
//     </div>`)
// };

// const markupCard = ({ likes, views, comments, downloads, webformatURL, tags }) => {
//   return `<div class="photo-card">
// //       <img src=${webformatURL}" alt="${tags}" loading="lazy" />
// //       <div class="info">
// //         <p class="info-item">
// //           <b>Likes${likes}</b>
// //         </p>
// //         <p class="info-item">
// //           <b>Views${views}</b>
// //         </p>
// //         <p class="info-item">
// //           <b>Comments${comments}</b>
// //         </p>
// //         <p class="info-item">
// //           <b>Downloads${downloads}</b>
// //         </p>
// //       </div>
// //     </div>`;
// };
