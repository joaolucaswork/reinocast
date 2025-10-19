import { greetUser } from '$utils/greet';
import { initMuxPlayer } from '$utils/mux-player';
import { initPersonTooltips } from '$utils/person-tooltip';
import { initSubtitleSync } from '$utils/subtitle-sync';
import { initSwiper } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Joao Lucas';
  greetUser(name);

  // Initialize Mux Player web component
  initMuxPlayer();

  // Initialize Swiper carousels
  // This will automatically find and initialize all .swiper containers
  initSwiper();

  // Initialize person tooltips
  // This will automatically find and initialize tooltips on all elements with 'person' attribute
  initPersonTooltips();

  // Initialize subtitle synchronization
  // SRT file is served from Cloudflare Tunnel
  initSubtitleSync('https://reinocast.reinocapital.com.br/transcribe.srt').then((sync) => {
    // Expose sync instance globally so you can call updateSpeakerAtTime() from your player
    window.subtitleSync = sync;
  });
});

// Type declaration for global window object
declare global {
  interface Window {
    subtitleSync?: import('$utils/subtitle-sync').SubtitleSync;
  }
}
