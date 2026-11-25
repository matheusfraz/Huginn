import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Book } from "@/types/Book";

export type ReadingPhase = "reading" | "rest" | "cycleComplete";

const READING_TIME = 25 * 60;
const REST_TIME = 5 * 60;

type ReadingContextValue = {
  lastReadBook: Book | null;
  sessionId: string | null;
  phase: ReadingPhase;
  secondsRemaining: number;
  isRunning: boolean;
  readingSeconds: number;
  completedCycles: number;
  sessionEnded: boolean;
  sessionEndedAt: string | null;
  sessionSaved: boolean;
  startReading: (book: Book) => void;
  tick: () => void;
  skipToRest: () => void;
  togglePause: () => void;
  startNewCycle: () => void;
  endSession: () => void;
  markSessionSaved: () => void;
};

const ReadingContext = createContext<ReadingContextValue | undefined>(undefined);

export function ReadingProvider({ children }: PropsWithChildren) {
  const [lastReadBook, setLastReadBook] = useState<Book | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [phase, setPhase] = useState<ReadingPhase>("reading");
  const [secondsRemaining, setSecondsRemaining] = useState(READING_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [skippedReading, setSkippedReading] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [sessionEndedAt, setSessionEndedAt] = useState<string | null>(null);
  const [sessionSaved, setSessionSaved] = useState(false);

  function startReading(book: Book) {
    setLastReadBook(book);
    setSessionId(String(Date.now()));
    setPhase("reading");
    setSecondsRemaining(READING_TIME);
    setIsRunning(true);
    setReadingSeconds(0);
    setCompletedCycles(0);
    setSkippedReading(false);
    setSessionEnded(false);
    setSessionEndedAt(null);
    setSessionSaved(false);
  }

  function tick() {
    if (!isRunning || sessionEnded) {
      return;
    }

    if (secondsRemaining > 1) {
      setSecondsRemaining(secondsRemaining - 1);
      if (phase === "reading") {
        setReadingSeconds(readingSeconds + 1);
      }
      return;
    }

    if (phase === "reading") {
      setReadingSeconds(readingSeconds + 1);
      setPhase("rest");
      setSecondsRemaining(REST_TIME);
      return;
    }

    if (phase === "rest") {
      setPhase("cycleComplete");
      setSecondsRemaining(0);
      setIsRunning(false);
      if (!skippedReading) {
        setCompletedCycles(completedCycles + 1);
      }
    }
  }

  function skipToRest() {
    if (sessionEnded || phase !== "reading") {
      return;
    }
    setPhase("rest");
    setSecondsRemaining(REST_TIME);
    setIsRunning(true);
    setSkippedReading(true);
  }

  function togglePause() {
    if (sessionEnded || phase === "cycleComplete") {
      return;
    }
    setIsRunning(!isRunning);
  }

  function startNewCycle() {
    if (sessionEnded) {
      return;
    }
    setPhase("reading");
    setSecondsRemaining(READING_TIME);
    setIsRunning(true);
    setSkippedReading(false);
  }

  function endSession() {
    setIsRunning(false);
    setSessionEnded(true);
    setSessionEndedAt(new Date().toISOString());
  }

  function markSessionSaved() {
    setSessionSaved(true);
  }

  return (
    <ReadingContext.Provider
      value={{
        lastReadBook,
        sessionId,
        phase,
        secondsRemaining,
        isRunning,
        readingSeconds,
        completedCycles,
        sessionEnded,
        sessionEndedAt,
        sessionSaved,
        startReading,
        tick,
        skipToRest,
        togglePause,
        startNewCycle,
        endSession,
        markSessionSaved,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}

export function useReading() {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("useReading precisa ser usado dentro de ReadingProvider.");
  }
  return context;
}
