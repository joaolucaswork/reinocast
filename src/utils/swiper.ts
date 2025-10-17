/**
 * Swiper carousel utility
 * Integrates Swiper.js for creating touch-enabled carousels in Webflow
 * Optimized for video content (lite-youtube embeds)
 */

import { ChevronLeft, ChevronRight, createElement } from 'lucide';
import Swiper from 'swiper';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';

/**
 * Default Swiper configuration optimized for video carousels
 */
export interface SwiperVideoConfig {
  /** CSS selector for the swiper container */
  containerSelector?: string;
  /** Number of slides to show at once */
  slidesPerView?: number;
  /** Space between slides in pixels */
  spaceBetween?: number;
  /** Enable navigation arrows */
  navigation?: boolean;
  /** Enable pagination dots */
  pagination?: boolean;
  /** Enable keyboard navigation */
  keyboard?: boolean;
  /** Enable loop mode */
  loop?: boolean;
  /** Enable centered slides */
  centeredSlides?: boolean;
  /** Autoplay configuration */
  autoplay?: boolean | { delay: number; disableOnInteraction: boolean };
  /** Speed of transition in ms */
  speed?: number;
  /** Enable touch/drag on desktop */
  simulateTouch?: boolean;
  /** Preload adjacent slides for better performance */
  watchSlidesProgress?: boolean;
  /** Pause videos when slide changes */
  pauseVideosOnSlideChange?: boolean;
}

/**
 * SwiperCarousel class for managing Swiper instances
 */
export class SwiperCarousel {
  private swiper: Swiper | null = null;
  private container: HTMLElement | null = null;
  private config: SwiperVideoConfig;

  /**
   * Creates a new SwiperCarousel instance
   * @param config Configuration options for the Swiper carousel
   */
  constructor(config: SwiperVideoConfig = {}) {
    this.config = {
      containerSelector: '.swiper',
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: true,
      pagination: true,
      keyboard: true,
      loop: false,
      centeredSlides: false,
      autoplay: false,
      speed: 300,
      simulateTouch: true,
      watchSlidesProgress: true,
      pauseVideosOnSlideChange: true,
      ...config,
    };
  }

  /**
   * Initialize the Swiper carousel
   * @returns The Swiper instance or null if initialization failed
   */
  public init(): Swiper | null {
    this.container = document.querySelector(this.config.containerSelector!);

    if (!this.container) {
      console.error(`Swiper container not found: ${this.config.containerSelector}`);
      return null;
    }

    // Build Swiper configuration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperConfig: any = {
      modules: [Navigation, Pagination, Keyboard, A11y],
      slidesPerView: this.config.slidesPerView,
      spaceBetween: this.config.spaceBetween,
      speed: this.config.speed,
      simulateTouch: this.config.simulateTouch,
      watchSlidesProgress: this.config.watchSlidesProgress,
      centeredSlides: this.config.centeredSlides,
      loop: this.config.loop,

      // Navigation
      navigation: this.config.navigation
        ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        : false,

      // Pagination
      pagination: this.config.pagination
        ? {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          }
        : false,

      // Keyboard
      keyboard: this.config.keyboard
        ? {
            enabled: true,
            onlyInViewport: true,
          }
        : false,

      // Accessibility
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },

      // Autoplay (if enabled)
      ...(this.config.autoplay && {
        autoplay:
          typeof this.config.autoplay === 'boolean'
            ? { delay: 5000, disableOnInteraction: true }
            : this.config.autoplay,
      }),

      // Breakpoints for responsive behavior
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: this.config.slidesPerView,
          spaceBetween: this.config.spaceBetween,
        },
      },

      // Event callbacks
      on: {
        init: this.onInit.bind(this),
        slideChange: this.onSlideChange.bind(this),
        slideChangeTransitionEnd: this.onSlideChangeEnd.bind(this),
      },
    };

    // Initialize Swiper
    this.swiper = new Swiper(this.container, swiperConfig);

    return this.swiper;
  }

  /**
   * Callback when Swiper is initialized
   */
  private onInit(): void {
    // Add custom class to indicate Swiper is ready
    this.container?.classList.add('swiper-initialized');

    // Initialize Lucide icons for navigation buttons
    this.initNavigationIcons();

    // Preload first slide's video thumbnail
    this.preloadSlideVideos(0);
  }

  /**
   * Initialize Lucide icons for navigation buttons
   */
  private initNavigationIcons(): void {
    if (!this.container || !this.config.navigation) return;

    const prevButton = this.container.querySelector('.swiper-button-prev');
    const nextButton = this.container.querySelector('.swiper-button-next');

    if (prevButton) {
      // Clear default content
      prevButton.innerHTML = '';
      // Create and append ChevronLeft icon (bem pequeno)
      const prevIcon = createElement(ChevronLeft);
      prevIcon.setAttribute('width', '16');
      prevIcon.setAttribute('height', '16');
      prevIcon.setAttribute('stroke-width', '2.5');
      prevButton.appendChild(prevIcon);
    }

    if (nextButton) {
      // Clear default content
      nextButton.innerHTML = '';
      // Create and append ChevronRight icon (bem pequeno)
      const nextIcon = createElement(ChevronRight);
      nextIcon.setAttribute('width', '16');
      nextIcon.setAttribute('height', '16');
      nextIcon.setAttribute('stroke-width', '2.5');
      nextButton.appendChild(nextIcon);
    }
  }

  /**
   * Callback when slide changes
   */
  private onSlideChange(): void {
    if (!this.swiper) return;

    // Pause videos on previous slide if enabled
    if (this.config.pauseVideosOnSlideChange) {
      this.pauseAllVideos();
    }

    // Preload adjacent slides
    const { activeIndex } = this.swiper;
    this.preloadSlideVideos(activeIndex);
    this.preloadSlideVideos(activeIndex + 1);
    this.preloadSlideVideos(activeIndex - 1);
  }

  /**
   * Callback when slide change transition ends
   */
  private onSlideChangeEnd(): void {
    // Additional actions after slide transition completes
    // Can be used for analytics, lazy loading, etc.
  }

  /**
   * Preload videos in a specific slide
   * @param slideIndex Index of the slide to preload
   */
  private preloadSlideVideos(slideIndex: number): void {
    if (!this.swiper) return;

    const { slides } = this.swiper;
    const slide = slides[slideIndex];
    if (!slide) return;

    // Find all lite-youtube elements in the slide
    const videos = slide.querySelectorAll('lite-youtube');
    videos.forEach((video) => {
      // The lite-youtube component handles its own lazy loading
      // We just ensure it's in the DOM and ready
      if (video.hasAttribute('autoload')) {
        // Video will auto-load when visible
      }
    });
  }

  /**
   * Pause all YouTube videos in all slides
   */
  private pauseAllVideos(): void {
    if (!this.swiper) return;

    this.swiper.slides.forEach((slide) => {
      const videos = slide.querySelectorAll('lite-youtube');
      videos.forEach((video) => {
        // Check if iframe is loaded
        const iframe = video.shadowRoot?.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          // Send pause command to YouTube iframe
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          );
        }
      });
    });
  }

  /**
   * Destroy the Swiper instance
   */
  public destroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }

  /**
   * Get the Swiper instance
   * @returns The Swiper instance or null
   */
  public getInstance(): Swiper | null {
    return this.swiper;
  }

  /**
   * Navigate to a specific slide
   * @param index Slide index to navigate to
   * @param speed Transition speed in ms
   */
  public slideTo(index: number, speed?: number): void {
    this.swiper?.slideTo(index, speed);
  }

  /**
   * Navigate to the next slide
   */
  public slideNext(): void {
    this.swiper?.slideNext();
  }

  /**
   * Navigate to the previous slide
   */
  public slidePrev(): void {
    this.swiper?.slidePrev();
  }
}

/**
 * Initialize Swiper carousels with default video-optimized settings
 * Automatically finds and initializes all Swiper containers on the page
 * @param customConfig Optional custom configuration to override defaults
 * @returns Array of initialized SwiperCarousel instances
 */
export const initSwiper = (customConfig?: SwiperVideoConfig): SwiperCarousel[] => {
  const instances: SwiperCarousel[] = [];

  // Find all swiper containers
  const containers = document.querySelectorAll<HTMLElement>('.swiper');

  if (containers.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(
      'No Swiper containers found. Make sure your HTML has elements with class "swiper"'
    );
    return instances;
  }

  containers.forEach((container, index) => {
    // Check if container has a specific combo class for custom config
    const isPodcast = container.classList.contains('is-podcast');

    // Create a unique selector for this specific container
    // Add a unique data attribute to identify this instance
    const uniqueId = `swiper-instance-${index}`;
    container.setAttribute('data-swiper-id', uniqueId);

    // Create config based on combo class
    const config: SwiperVideoConfig = {
      containerSelector: `[data-swiper-id="${uniqueId}"]`,
      ...customConfig,
    };

    // Special config for podcast carousel
    if (isPodcast) {
      config.slidesPerView = 1;
      config.spaceBetween = 30;
      config.navigation = true;
      config.pagination = true;
      config.keyboard = true;
      config.loop = false;
      config.pauseVideosOnSlideChange = true;
    }

    const carousel = new SwiperCarousel(config);
    const swiperInstance = carousel.init();

    if (swiperInstance) {
      instances.push(carousel);
    }
  });

  return instances;
};

/**
 * Initialize a single Swiper instance with custom selector
 * @param selector CSS selector for the swiper container
 * @param config Optional configuration
 * @returns SwiperCarousel instance or null
 */
export const initSwiperSingle = (
  selector: string,
  config?: SwiperVideoConfig
): SwiperCarousel | null => {
  const carousel = new SwiperCarousel({
    containerSelector: selector,
    ...config,
  });

  const instance = carousel.init();
  return instance ? carousel : null;
};
