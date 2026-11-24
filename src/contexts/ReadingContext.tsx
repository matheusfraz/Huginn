import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Book } from "@/types/Book";

type ReadingContextValue = {
  lastReadBook: Book | null;
  setLastReadBook: (book: Book) => void;
};

const ReadingContext = createContext<ReadingContextValue | undefined>(undefined);

export function ReadingProvider({ children }: PropsWithChildren) {
  const [lastReadBook, setLastReadBook] = useState<Book | null>(null);

  return (
    <ReadingContext.Provider value={{ lastReadBook, setLastReadBook }}>
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
