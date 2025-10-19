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
 *
 * Updated to work with Mux Player instead of Lite YouTube
 */
export class SubtitleSync {
  private subtitles: SubtitleWithSpeaker[] = [];
  private currentSpeaker: string | null = null;
  private peopleItems: NodeListOf<HTMLElement> | null = null;
  private muxPlayerElement: HTMLElement | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private syncInterval: number | null = null;

  /**
   * Initialize the subtitle synchronization
   * @param srtFilePath - Path to the SRT file
   * @param peopleItemsSelector - CSS selector for speaker elements (default: '.people_item')
   * @param muxPlayerSelector - CSS selector for mux-player element (default: 'mux-player')
   */
  async init(
    srtFilePath: string,
    peopleItemsSelector: string = '.people_item',
    muxPlayerSelector: string = 'mux-player'
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

      // Get mux-player element
      this.muxPlayerElement = document.querySelector(muxPlayerSelector);
      if (!this.muxPlayerElement) {
        console.warn(`Mux Player element not found: ${muxPlayerSelector}`);
        return;
      }

      // Setup Mux Player integration
      this.setupMuxPlayerSync();

      console.log('Subtitle synchronization initialized successfully');
      console.log(`Loaded ${this.subtitles.length} subtitles`);
      console.log(`Found ${this.peopleItems.length} speaker elements`);
      console.log(`Speakers: ${this.getSpeakers().join(', ')}`);
    } catch (error) {
      console.error('Failed to initialize subtitle sync:', error);
    }
  }

  /**
   * Setup Mux Player synchronization
   */
  private setupMuxPlayerSync(): void {
    if (!this.muxPlayerElement) return;

    // Access the native video element from Mux Player
    // Mux Player exposes the underlying HTML5 video element via media.nativeEl
    const muxPlayer = this.muxPlayerElement as any;

    // Wait for the player to be ready and have the video element available
    const checkVideoElement = () => {
      if (muxPlayer.media?.nativeEl) {
        this.videoElement = muxPlayer.media.nativeEl;
        this.attachVideoEventListeners();
      } else {
        // If not ready yet, wait for loadedmetadata event
        this.muxPlayerElement?.addEventListener(
          'loadedmetadata',
          () => {
            this.videoElement = muxPlayer.media?.nativeEl;
            this.attachVideoEventListeners();
          },
          { once: true }
        );
      }
    };

    // Check immediately or wait for the element to be ready
    if (muxPlayer.media) {
      checkVideoElement();
    } else {
      // Wait a bit for the Mux Player to initialize
      setTimeout(checkVideoElement, 100);
    }
  }

  /**
   * Attach event listeners to the video element
   */
  private attachVideoEventListeners(): void {
    if (!this.videoElement) return;

    // Listen for play event to start synchronization
    this.videoElement.addEventListener('play', () => {
      this.startSync();
    });

    // Listen for pause event to stop synchronization
    this.videoElement.addEventListener('pause', () => {
      this.stopSync();
    });

    // Listen for ended event to stop synchronization
    this.videoElement.addEventListener('ended', () => {
      this.stopSync();
    });

    console.log('✓ Video event listeners attached');
  }

  /**
   * Start synchronization loop
   */
  private startSync(): void {
    if (this.syncInterval) return;

    // Update every 100ms for smooth transitions
    this.syncInterval = window.setInterval(() => {
      if (this.videoElement) {
        const { currentTime } = this.videoElement;
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
    this.videoElement = null;
  }
}

/**
 * Initialize subtitle synchronization
 * @param srtFilePath - Path to the SRT file (default: '/transcribe.srt')
 * @param peopleItemsSelector - CSS selector for speaker elements (default: '.people_item')
 * @param muxPlayerSelector - CSS selector for mux-player element (default: 'mux-player')
 * @returns SubtitleSync instance
 */
export async function initSubtitleSync(
  srtFilePath: string = '/transcribe.srt',
  peopleItemsSelector: string = '.people_item',
  muxPlayerSelector: string = 'mux-player'
): Promise<SubtitleSync> {
  const sync = new SubtitleSync();
  await sync.init(srtFilePath, peopleItemsSelector, muxPlayerSelector);
  return sync;
}
