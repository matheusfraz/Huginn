import { ProfileBookList } from "@/components/ProfileBookList";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Lendo() {
  const { reading } = useFavorites();

  return (
    <ProfileBookList
      title="Livros que estou lendo"
      books={reading}
      emptyText="Você não está lendo nenhum livro no momento."
    />
  );
}
