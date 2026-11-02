import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// The made-up data in fixture.ts is dated up to October 2026, so that is "today" whatever the real date is. Only Date
// is frozen, timers still run. At the top level because test files read the date as they load.
vi.useFakeTimers({ toFake: ['Date'] });
vi.setSystemTime(new Date(2026, 9, 15, 12));

// Recharts measures its container with ResizeObserver, which jsdom lacks.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver = ResizeObserverStub;

// jsdom does not implement window scrolling; the app scrolls when the page changes.
window.scrollTo = () => {};

// Every test starts on the Accounts page: the address bar now decides which page is shown.
beforeEach(() => history.replaceState(null, '', '/accounts'));
afterEach(() => cleanup());
