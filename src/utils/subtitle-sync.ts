import SrtParser2 from 'srt-parser-2';

/**
 * Interface for parsed subtitle with speaker information
 */
interface SubtitleWithSpeaker {
  id: string;
  startSeconds: number;
  endSeconds: number;
  speaker: string;
  text: string;
}

/**
 * Subtitle Synchronization Manager
 * Simple class to manage speaker highlighting based on SRT timestamps
 * Structure and styling are handled by Webflow
 */
export class SubtitleSync {
  private subtitles: SubtitleWithSpeaker[] = [];
  private currentSpeaker: string | null = null;
  private peopleItems: NodeListOf<HTMLElement> | null = null;
  private liteYoutubeElement: HTMLElement | null = null;
  private youtubePlayer: YT.Player | null = null;
  private syncInterval: number | null = null;

  /**
   * Initialize the subtitle synchronization
   * @param srtFilePath - Path to the SRT file
   * @param peopleItemsSelector - CSS selector for speaker elements (default: '.people_item')
   * @param liteYoutubeSelector - CSS selector for lite-youtube element (default: 'lite-youtube')
   */
  async init(
    srtFilePath: string,
    peopleItemsSelector: string = '.people_item',
    liteYoutubeSelector: string = 'lite-youtube'
  ): Promise<void> {
    try {
      // Load and parse SRT file
      await this.loadSRT(srtFilePath);

      // Get all people items
      this.peopleItems = document.querySelectorAll(peopleItemsSelector);
      if (!this.peopleItems || this.peopleItems.length === 0) {
        console.warn(`No people items found: ${peopleItemsSelector}`);
        return;
      }

      // Get lite-youtube element
      this.liteYoutubeElement = document.querySelector(liteYoutubeSelector);
      if (!this.liteYoutubeElement) {
        console.warn(`Lite-youtube element not found: ${liteYoutubeSelector}`);
        return;
      }

      // Setup YouTube player integration
      this.setupYouTubeSync();

      console.log('Subtitle synchronization initialized successfully');
      console.log(`Loaded ${this.subtitles.length} subtitles`);
      console.log(`Found ${this.peopleItems.length} speaker elements`);
      console.log(`Speakers: ${this.getSpeakers().join(', ')}`);
    } catch (error) {
      console.error('Failed to initialize subtitle sync:', error);
    }
  }

  /**
   * Setup YouTube player synchronization
   */
  private setupYouTubeSync(): void {
    if (!this.liteYoutubeElement) return;

    // Listen for when lite-youtube creates the iframe
    this.liteYoutubeElement.addEventListener('liteYoutubeIframeLoaded', () => {
      this.initYouTubePlayer();
    });

    // Check if iframe already exists
    const iframe = this.liteYoutubeElement.shadowRoot?.querySelector('iframe');
    if (iframe) {
      this.initYouTubePlayer();
    }
  }

  /**
   * Initialize YouTube IFrame API and player
   */
  private initYouTubePlayer(): void {
    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Wait for API to load
      window.onYouTubeIframeAPIReady = () => {
        this.connectToYouTubePlayer();
      };
    } else {
      this.connectToYouTubePlayer();
    }
  }

  /**
   * Connect to the YouTube player iframe
   */
  private connectToYouTubePlayer(): void {
    const iframe = this.liteYoutubeElement?.shadowRoot?.querySelector('iframe');
    if (!iframe || !iframe.id) {
      // Set an ID if it doesn't have one
      if (iframe) {
        iframe.id = 'youtube-player-' + Math.random().toString(36).substr(2, 9);
      }
    }

    if (iframe?.id && window.YT) {
      this.youtubePlayer = new window.YT.Player(iframe.id, {
        events: {
          onStateChange: this.onPlayerStateChange.bind(this),
        },
      });
    }
  }

  /**
   * Handle YouTube player state changes
   */
  private onPlayerStateChange(event: YT.OnStateChangeEvent): void {
    // YT.PlayerState.PLAYING = 1
    // YT.PlayerState.PAUSED = 2
    if (event.data === 1) {
      // Playing - start sync
      this.startSync();
    } else {
      // Paused or ended - stop sync
      this.stopSync();
    }
  }

  /**
   * Start synchronization loop
   */
  private startSync(): void {
    if (this.syncInterval) return;

    // Update every 100ms for smooth transitions
    this.syncInterval = window.setInterval(() => {
      if (this.youtubePlayer && typeof this.youtubePlayer.getCurrentTime === 'function') {
        const currentTime = this.youtubePlayer.getCurrentTime();
        this.updateSpeakerAtTime(currentTime);
      }
    }, 100);
  }

  /**
   * Stop synchronization loop
   */
  private stopSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Load and parse SRT file
   */
  private async loadSRT(filePath: string): Promise<void> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load SRT file: ${response.statusText}`);
      }

      const srtContent = await response.text();
      const parser = new SrtParser2();
      const parsedSubtitles = parser.fromSrt(srtContent);

      // Extract speaker names from subtitle text [Speaker Name]: text
      this.subtitles = parsedSubtitles.map((subtitle) => {
        const speakerMatch = subtitle.text.match(/^\[([^\]]+)\]:/);
        const speaker = speakerMatch ? speakerMatch[1].trim() : '';
        const text = subtitle.text.replace(/^\[([^\]]+)\]:/, '').trim();

        return {
          id: subtitle.id,
          startSeconds: subtitle.startSeconds,
          endSeconds: subtitle.endSeconds,
          speaker,
          text,
        };
      });
    } catch (error) {
      console.error('Error loading SRT file:', error);
      throw error;
    }
  }

  /**
   * Update speaker highlighting based on current playback time
   * Call this method from your audio/video player's timeupdate event
   * @param currentTime - Current playback time in seconds
   */
  public updateSpeakerAtTime(currentTime: number): void {
    // Find the subtitle that matches the current time
    const currentSubtitle = this.subtitles.find(
      (sub) => currentTime >= sub.startSeconds && currentTime < sub.endSeconds
    );

    if (!currentSubtitle || !currentSubtitle.speaker) {
      // No subtitle at this time or no speaker, clear active speaker
      if (this.currentSpeaker !== null) {
        this.clearActiveSpeaker();
        this.currentSpeaker = null;
      }
      return;
    }

    // Check if speaker has changed
    if (currentSubtitle.speaker !== this.currentSpeaker) {
      this.currentSpeaker = currentSubtitle.speaker;
      this.setActiveSpeaker(this.currentSpeaker);
    }
  }

  /**
   * Set the active speaker by adding 'active' class
   * Removes 'active' class from all other speakers
   */
  private setActiveSpeaker(speakerName: string): void {
    if (!this.peopleItems) return;

    this.peopleItems.forEach((item) => {
      const personName = item.getAttribute('person');
      if (personName === speakerName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    console.log(`Active speaker: ${speakerName}`);
  }

  /**
   * Clear all active speakers (removes 'active' class from all)
   */
  private clearActiveSpeaker(): void {
    if (!this.peopleItems) return;

    this.peopleItems.forEach((item) => {
      item.classList.remove('active');
    });
  }

  /**
   * Get all unique speakers from subtitles
   * @returns Array of speaker names
   */
  public getSpeakers(): string[] {
    const speakers = new Set(this.subtitles.map((sub) => sub.speaker).filter((s) => s !== ''));
    return Array.from(speakers);
  }

  /**
   * Get all subtitles with speaker information
   * @returns Array of subtitles
   */
  public getSubtitles(): SubtitleWithSpeaker[] {
    return this.subtitles;
  }

  /**
   * Get subtitle at specific time
   * @param time - Time in seconds
   * @returns Subtitle at that time or undefined
   */
  public getSubtitleAtTime(time: number): SubtitleWithSpeaker | undefined {
    return this.subtitles.find((sub) => time >= sub.startSeconds && time < sub.endSeconds);
  }

  /**
   * Cleanup and destroy synchronization
   */
  public destroy(): void {
    this.stopSync();
    this.clearActiveSpeaker();
    this.youtubePlayer = null;
  }
}

/**
 * Initialize subtitle synchronization
 * @param srtFilePath - Path to the SRT file (default: '/transcribe.srt')
 * @param peopleItemsSelector - CSS selector for speaker elements (default: '.people_item')
 * @param liteYoutubeSelector - CSS selector for lite-youtube element (default: 'lite-youtube')
 * @returns SubtitleSync instance
 */
export async function initSubtitleSync(
  srtFilePath: string = '/transcribe.srt',
  peopleItemsSelector: string = '.people_item',
  liteYoutubeSelector: string = 'lite-youtube'
): Promise<SubtitleSync> {
  const sync = new SubtitleSync();
  await sync.init(srtFilePath, peopleItemsSelector, liteYoutubeSelector);
  return sync;
}

// Type declarations for YouTube IFrame API
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

namespace YT {
  export class Player {
    constructor(elementId: string, options: PlayerOptions);
    getCurrentTime(): number;
    playVideo(): void;
    pauseVideo(): void;
    destroy(): void;
  }

  export interface PlayerOptions {
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }

  export interface PlayerEvent {
    target: Player;
  }

  export interface OnStateChangeEvent extends PlayerEvent {
    data: number;
  }

  export enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }
}
