import { createContext, useCallback, useContext, useReducer } from "react";
import type { PropsWithChildren } from "react";
import type { Book } from "@/types/Book";

export type ReadingPhase = "reading" | "rest" | "cycleComplete";

type SessionState = {
  lastReadBook: Book | null;
  phase: ReadingPhase;
  secondsRemaining: number;
  isRunning: boolean;
  readingSeconds: number;
  completedCycles: number;
  currentCycleSkipped: boolean;
  sessionEnded: boolean;
  comments: string[];
};

type SessionAction =
  | { type: "start"; book: Book }
  | { type: "tick" }
  | { type: "skipToRest" }
  | { type: "togglePause" }
  | { type: "newCycle" }
  | { type: "end" }
  | { type: "addComment"; comment: string };

const initialState: SessionState = {
  lastReadBook: null,
  phase: "reading",
  secondsRemaining: 25 * 60,
  isRunning: false,
  readingSeconds: 0,
  completedCycles: 0,
  currentCycleSkipped: false,
  sessionEnded: false,
  comments: [],
};

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "start":
      return {
        ...initialState,
        lastReadBook: action.book,
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
      return { ...state, isRunning: false, sessionEnded: true };
    case "addComment":
      return { ...state, comments: [...state.comments, action.comment] };
  }
}

type ReadingContextValue = SessionState & {
  startReading: (book: Book) => void;
  tick: () => void;
  skipToRest: () => void;
  togglePause: () => void;
  startNewCycle: () => void;
  endSession: () => void;
  addSessionComment: (comment: string) => void;
};

const ReadingContext = createContext<ReadingContextValue | undefined>(undefined);

export function ReadingProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  const startReading = useCallback((book: Book) => dispatch({ type: "start", book }), []);
  const tick = useCallback(() => dispatch({ type: "tick" }), []);
  const skipToRest = useCallback(() => dispatch({ type: "skipToRest" }), []);
  const togglePause = useCallback(() => dispatch({ type: "togglePause" }), []);
  const startNewCycle = useCallback(() => dispatch({ type: "newCycle" }), []);
  const endSession = useCallback(() => dispatch({ type: "end" }), []);
  const addSessionComment = useCallback(
    (comment: string) => dispatch({ type: "addComment", comment }),
    [],
  );

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
        addSessionComment,
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
