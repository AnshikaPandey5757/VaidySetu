/**
 * Local-First Offline Database Manager for VaidyaSetu
 * Saves case sheets and patient updates to localStorage / IndexedDB first,
 * and maintains a pending sync queue for automatic server sync when network restores.
 */

const LOCAL_CASES_KEY = 'vaidyasetu_local_cases';
const SYNC_QUEUE_KEY = 'vaidyasetu_sync_queue';

export const offlineDb = {
  // Get all locally saved cases
  getLocalCases() {
    try {
      const data = localStorage.getItem(LOCAL_CASES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read local cases', e);
      return [];
    }
  },

  // Save a case locally first
  saveCaseLocally(caseData) {
    const cases = this.getLocalCases();
    const existingIndex = cases.findIndex(c => c.id === caseData.id);
    
    if (existingIndex >= 0) {
      cases[existingIndex] = { ...caseData, updatedAt: new Date().toISOString() };
    } else {
      caseData.id = caseData.id || `LOCAL-CASE-${Date.now()}`;
      caseData.savedOffline = true;
      caseData.updatedAt = new Date().toISOString();
      cases.unshift(caseData);
    }
    
    localStorage.setItem(LOCAL_CASES_KEY, JSON.stringify(cases));
    
    // Add to sync queue
    this.addToSyncQueue(caseData);
    return caseData;
  },

  // Add to background sync queue
  addToSyncQueue(item) {
    try {
      const queue = this.getSyncQueue();
      const existing = queue.findIndex(q => q.id === item.id);
      if (existing >= 0) {
        queue[existing] = item;
      } else {
        queue.push(item);
      }
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.error('Sync queue error:', e);
    }
  },

  getSyncQueue() {
    try {
      const q = localStorage.getItem(SYNC_QUEUE_KEY);
      return q ? JSON.parse(q) : [];
    } catch (e) {
      return [];
    }
  },

  clearSyncedItem(id) {
    let queue = this.getSyncQueue();
    queue = queue.filter(item => item.id !== id);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  }
};
