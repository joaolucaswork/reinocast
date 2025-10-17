import { greetUser } from '$utils/greet';
import { initLiteYouTube } from '$utils/lite-youtube';
import { initSwiper } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'John Doe';
  greetUser(name);

  // Initialize lite-youtube web component
  initLiteYouTube();

  // Initialize Swiper carousels
  // This will automatically find and initialize all .swiper containers
  initSwiper();
});
