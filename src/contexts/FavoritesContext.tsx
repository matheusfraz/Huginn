import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Book } from "@/types/Book";

type FavoritesContextValue = {
  favorites: Book[];
  reading: Book[];
  read: Book[];
  isFavorite: (bookKey: string) => boolean;
  isReading: (bookKey: string) => boolean;
  isRead: (bookKey: string) => boolean;
  toggleFavorite: (book: Book) => void;
  toggleReading: (book: Book) => void;
  toggleRead: (book: Book) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [reading, setReading] = useState<Book[]>([]);
  const [read, setRead] = useState<Book[]>([]);

  const isFavorite = (bookKey: string) => favorites.some((book) => book.key === bookKey);
  const isReading = (bookKey: string) => reading.some((book) => book.key === bookKey);
  const isRead = (bookKey: string) => read.some((book) => book.key === bookKey);

  function toggleFavorite(book: Book) {
    setFavorites((current) =>
      current.some((item) => item.key === book.key)
        ? current.filter((item) => item.key !== book.key)
        : [...current, book],
    );
  }

  function toggleReading(book: Book) {
    if (isReading(book.key)) setReading(reading.filter((item) => item.key !== book.key));
    else {
      setReading([...reading, book]);
      setRead(read.filter((item) => item.key !== book.key));
    }
  }

  function toggleRead(book: Book) {
    if (isRead(book.key)) setRead(read.filter((item) => item.key !== book.key));
    else {
      setRead([...read, book]);
      setReading(reading.filter((item) => item.key !== book.key));
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, reading, read, isFavorite, isReading, isRead, toggleFavorite, toggleReading, toggleRead }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites precisa ser usado dentro de FavoritesProvider.");
  return context;
}
