// CacheManager.js
// Client-side caching manager.

export function cacheData(key, value) {
  localStorage.setItem(key, value);
}
