const PRELOADER_SEEN_KEY = 'innoverce_initial_preloader_seen';

/**
 * Checks whether the user has already seen the initial full-screen preloader
 * in the current browser session.
 */
export function hasSeenInitialPreloader() {
  try {
    return sessionStorage.getItem(PRELOADER_SEEN_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Marks that the initial preloader has been completed for this session,
 * preventing it from showing on subsequent page navigations or returns to home.
 */
export function markInitialPreloaderSeen() {
  try {
    sessionStorage.setItem(PRELOADER_SEEN_KEY, 'true');
  } catch {
    // Ignore storage errors in restricted/private browsing modes
  }
}

/**
 * Resets the preloader flag (useful for testing or if manually requested).
 */
export function resetInitialPreloader() {
  try {
    sessionStorage.removeItem(PRELOADER_SEEN_KEY);
  } catch {
    // Ignore storage errors
  }
}

