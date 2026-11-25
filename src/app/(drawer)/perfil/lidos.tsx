import { ProfileBookList } from "@/components/ProfileBookList";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Lidos() {
  const { read } = useFavorites();

  return (
    <ProfileBookList
      title="Livros que já li"
      books={read}
      emptyText="Você ainda não marcou nenhum livro como lido."
    />
  );
}
