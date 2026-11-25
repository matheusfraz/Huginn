import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

const STORAGE_KEY = "@huginn/reading-history";

export type ReadingSession = {
  sessionId: string;
  bookId: string;
  title: string;
  coverUrl: string | null;
  date: string;
  readingSeconds: number;
  completedCycles: number;
  comment: string;
};

type ReadingHistoryContextValue = {
  sessions: ReadingSession[];
  isLoading: boolean;
  loadError: boolean;
  reloadHistory: () => Promise<void>;
  addSession: (session: ReadingSession) => Promise<boolean>;
};

const ReadingHistoryContext =
  createContext<ReadingHistoryContextValue | undefined>(undefined);

function isReadingSession(value: unknown): value is ReadingSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<ReadingSession>;
  return (
    typeof session.sessionId === "string" &&
    typeof session.bookId === "string" &&
    typeof session.title === "string" &&
    (typeof session.coverUrl === "string" || session.coverUrl === null) &&
    typeof session.date === "string" &&
    typeof session.readingSeconds === "number" &&
    typeof session.completedCycles === "number" &&
    typeof session.comment === "string"
  );
}

function parseHistory(raw: string | null): ReadingSession[] {
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(isReadingSession);
}

function sortNewestFirst(sessions: ReadingSession[]) {
  const unique = new Map<string, ReadingSession>();
  for (const session of sessions) {
    if (!unique.has(session.sessionId)) unique.set(session.sessionId, session);
  }
  return [...unique.values()].sort(
    (first, second) => Date.parse(second.date) - Date.parse(first.date),
  );
}

export function ReadingHistoryProvider({ children }: PropsWithChildren) {
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const writeQueueRef = useRef<Promise<void>>(Promise.resolve());
  const hydrationRef = useRef<Promise<void>>(Promise.resolve());

  const reloadHistory = useCallback(async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const stored = parseHistory(await AsyncStorage.getItem(STORAGE_KEY));
      const sorted = sortNewestFirst(stored);
      setSessions(sorted);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrationRef.current = reloadHistory();
  }, [reloadHistory]);

  const addSession = useCallback((session: ReadingSession) => {
    const write = writeQueueRef.current.then(async () => {
      await hydrationRef.current;
      const stored = parseHistory(await AsyncStorage.getItem(STORAGE_KEY));
      const existing = stored.find((item) => item.sessionId === session.sessionId);
      if (existing) {
        const sorted = sortNewestFirst(stored);
        setSessions(sorted);
        return false;
      }

      const updated = sortNewestFirst([...stored, session]);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSessions(updated);
      setLoadError(false);
      return true;
    });

    writeQueueRef.current = write.then(
      () => undefined,
      () => undefined,
    );
    return write;
  }, []);

  return (
    <ReadingHistoryContext.Provider
      value={{ sessions, isLoading, loadError, reloadHistory, addSession }}
    >
      {children}
    </ReadingHistoryContext.Provider>
  );
}

export function useReadingHistory() {
  const context = useContext(ReadingHistoryContext);
  if (!context) {
    throw new Error(
      "useReadingHistory precisa ser usado dentro de ReadingHistoryProvider.",
    );
  }
  return context;
}
