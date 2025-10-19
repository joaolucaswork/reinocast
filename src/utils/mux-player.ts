/**
 * Mux Player Initialization Utility
 * Initializes the Mux Player web component for video playback
 * 
 * Mux Player is a drop-in web component for playing Mux video assets.
 * It supports on-demand assets, live streams, and low-latency live streams.
 * 
 * @see https://www.mux.com/docs/guides/mux-player-web
 */

import '@mux/mux-player';

/**
 * Initialize the Mux Player web component
 * Registers the custom element if not already registered
 * 
 * The Mux Player component is automatically registered when imported,
 * but this function provides a consistent initialization pattern
 * and can be extended with additional setup if needed.
 */
export const initMuxPlayer = (): void => {
  // The @mux/mux-player package automatically registers the custom element
  // when imported, so we just need to verify it's available
  if (!customElements.get('mux-player')) {
    console.warn('Mux Player custom element not registered. This should not happen.');
    return;
  }

  console.log('✓ Mux Player initialized successfully');
};

// Type declarations for Mux Player
declare global {
  interface HTMLElementTagNameMap {
    'mux-player': MuxPlayerElement;
  }

  interface MuxPlayerElement extends HTMLElement {
    // Media properties
    media: {
      nativeEl: HTMLVideoElement;
    };
    
    // Playback properties
    currentTime: number;
    duration: number;
    paused: boolean;
    muted: boolean;
    volume: number;
    playbackRate: number;
    
    // Mux-specific properties
    playbackId: string;
    streamType: 'on-demand' | 'live' | 'll-live';
    currentPdt: Date | null;
    
    // Methods
    play(): Promise<void>;
    pause(): void;
    
    // Event listeners (extends standard HTMLElement)
    addEventListener(
      type: 'timeupdate' | 'play' | 'pause' | 'ended' | 'loadedmetadata' | 'durationchange',
      listener: EventListener,
      options?: boolean | AddEventListenerOptions
    ): void;
  }
}

