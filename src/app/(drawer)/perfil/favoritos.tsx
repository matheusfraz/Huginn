import { ProfileBookList } from "@/components/ProfileBookList";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <ProfileBookList
      title="Meus favoritos"
      books={favorites}
      emptyText="Você ainda não favoritou nenhum livro."
    />
  );
}
