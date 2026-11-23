import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Book } from "@/types/Book";

type FavoritesContextValue = {
  favorites: Book[];
  isFavorite: (bookKey: string) => boolean;
  toggleFavorite: (book: Book) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<Book[]>([]);

  function isFavorite(bookKey: string) {
    return favorites.some((book) => book.key === bookKey);
  }

  function toggleFavorite(book: Book) {
    setFavorites((current) =>
      current.some((favorite) => favorite.key === book.key)
        ? current.filter((favorite) => favorite.key !== book.key)
        : [...current, book],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites precisa ser usado dentro de FavoritesProvider.");
  }
  return context;
}
