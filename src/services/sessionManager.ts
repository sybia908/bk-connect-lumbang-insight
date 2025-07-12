
export class SessionManager {
  private inactivityTimer: NodeJS.Timeout | null = null;
  private readonly INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  private onTimeout: (() => void) | null = null;

  constructor(onTimeoutCallback?: () => void) {
    this.onTimeout = onTimeoutCallback || null;
    this.setupActivityListeners();
  }

  private setupActivityListeners() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, this.resetTimer.bind(this), true);
    });
  }

  private cleanupActivityListeners() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.removeEventListener(event, this.resetTimer.bind(this), true);
    });
  }

  public resetTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    
    this.inactivityTimer = setTimeout(() => {
      if (this.onTimeout) {
        this.onTimeout();
      }
    }, this.INACTIVITY_TIMEOUT);
  }

  public startTimer() {
    this.resetTimer();
  }

  public stopTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
  }

  public cleanup() {
    this.stopTimer();
    this.cleanupActivityListeners();
  }
}
