import { createContext, useCallback, useContext, useReducer } from "react";
import type { PropsWithChildren } from "react";
import type { Book } from "@/types/Book";

export type ReadingPhase = "reading" | "rest" | "cycleComplete";

type SessionState = {
  lastReadBook: Book | null;
  sessionId: string | null;
  phase: ReadingPhase;
  secondsRemaining: number;
  isRunning: boolean;
  readingSeconds: number;
  completedCycles: number;
  currentCycleSkipped: boolean;
  sessionEnded: boolean;
  sessionEndedAt: string | null;
  sessionSaved: boolean;
};

type SessionAction =
  | { type: "start"; book: Book; sessionId: string }
  | { type: "tick" }
  | { type: "skipToRest" }
  | { type: "togglePause" }
  | { type: "newCycle" }
  | { type: "end"; endedAt: string }
  | { type: "saved" };

const initialState: SessionState = {
  lastReadBook: null,
  sessionId: null,
  phase: "reading",
  secondsRemaining: 25 * 60,
  isRunning: false,
  readingSeconds: 0,
  completedCycles: 0,
  currentCycleSkipped: false,
  sessionEnded: false,
  sessionEndedAt: null,
  sessionSaved: false,
};

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "start":
      return {
        ...initialState,
        lastReadBook: action.book,
        sessionId: action.sessionId,
        isRunning: true,
      };
    case "tick":
      if (!state.isRunning || state.sessionEnded) return state;
      if (state.secondsRemaining > 1) {
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          readingSeconds:
            state.phase === "reading" ? state.readingSeconds + 1 : state.readingSeconds,
        };
      }
      if (state.phase === "reading") {
        return {
          ...state,
          phase: "rest",
          secondsRemaining: 5 * 60,
          readingSeconds: state.readingSeconds + 1,
          currentCycleSkipped: false,
        };
      }
      if (state.phase === "rest") {
        return {
          ...state,
          phase: "cycleComplete",
          secondsRemaining: 0,
          isRunning: false,
          completedCycles:
            state.completedCycles + (state.currentCycleSkipped ? 0 : 1),
          currentCycleSkipped: false,
        };
      }
      return state;
    case "skipToRest":
      if (state.sessionEnded || state.phase !== "reading") return state;
      return {
        ...state,
        phase: "rest",
        secondsRemaining: 5 * 60,
        isRunning: true,
        currentCycleSkipped: true,
      };
    case "togglePause":
      if (state.sessionEnded || state.phase === "cycleComplete") return state;
      return { ...state, isRunning: !state.isRunning };
    case "newCycle":
      if (state.sessionEnded) return state;
      return {
        ...state,
        phase: "reading",
        secondsRemaining: 25 * 60,
        isRunning: true,
        currentCycleSkipped: false,
      };
    case "end":
      return {
        ...state,
        isRunning: false,
        sessionEnded: true,
        sessionEndedAt: action.endedAt,
      };
    case "saved":
      return { ...state, sessionSaved: true };
  }
}

type ReadingContextValue = SessionState & {
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
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  const startReading = useCallback(
    (book: Book) =>
      dispatch({
        type: "start",
        book,
        sessionId: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      }),
    [],
  );
  const tick = useCallback(() => dispatch({ type: "tick" }), []);
  const skipToRest = useCallback(() => dispatch({ type: "skipToRest" }), []);
  const togglePause = useCallback(() => dispatch({ type: "togglePause" }), []);
  const startNewCycle = useCallback(() => dispatch({ type: "newCycle" }), []);
  const endSession = useCallback(
    () => dispatch({ type: "end", endedAt: new Date().toISOString() }),
    [],
  );
  const markSessionSaved = useCallback(() => dispatch({ type: "saved" }), []);

  return (
    <ReadingContext.Provider
      value={{
        ...state,
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
