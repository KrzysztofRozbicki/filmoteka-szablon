import camera from '../assets/images/camera.png';
import film from '../assets/images/film.png';

export const loaderHTML = `
<div id="loager" class="loader">
  <div class="loader__container">
    <div class="loader__film">
      <img
        class="loader__film-img"
        src="${film}"
        alt=""
      />
      <img
        class="loader__film-img"
        src="${film}"
        alt=""
      />
    </div>
    <img
      class="loader__camera"
      src="${camera}"
      alt=""
    />
  </div>
</div>`;
