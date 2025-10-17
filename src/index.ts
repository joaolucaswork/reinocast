import { greetUser } from '$utils/greet';
import { initLiteYouTube } from '$utils/lite-youtube';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'John Doe';
  greetUser(name);

  // Initialize lite-youtube web component
  initLiteYouTube();
});
