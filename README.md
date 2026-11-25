# Huginn 📚

> *Apenas o conhecimento liberta.*

O **Huginn** é um app de leitura feito em React Native para o projeto final da disciplina de Desenvolvimento Móvel. A ideia é simples: ajudar quem lê a encontrar livros, organizar a própria estante e criar o hábito da leitura com a ajuda da Técnica Pomodoro.

O nome vem de Huginn, um dos corvos de Odin na mitologia nórdica, que representa o pensamento. Achamos que combinava com um app sobre leitura.

## O que dá para fazer

- Pesquisar livros pela [Open Library](https://openlibrary.org/) e ver capa, autor, ano e descrição
- Marcar livros como **Favorito**, **Lendo** ou **Lido**
- Deixar comentários nos livros
- Ler com um cronômetro Pomodoro (25 minutos de leitura e 5 de descanso)
- Salvar cada sessão de leitura com um comentário e consultar tudo depois no histórico
- Personalizar o perfil com foto e nome

Os favoritos, as listas, a foto de perfil, os comentários e o histórico ficam salvos no aparelho, então continuam lá mesmo depois de fechar o app.

## Telas

| Tela | Para que serve |
|---|---|
| **Login** | Entrada no app. As outras telas só ficam disponíveis depois do login. |
| **Início** | Mostra a última leitura e um atalho para continuar de onde parou. |
| **Catálogo** | Busca de livros na API, com marcações de favorito, lendo e lido. |
| **Detalhes** | Informações do livro, comentários e o botão para iniciar a leitura. |
| **Leitura** | O cronômetro Pomodoro, com pausa, descanso, novos ciclos e encerramento da sessão. |
| **Histórico** | Todas as sessões de leitura salvas, com tempo lido e comentários. |
| **Perfil** | Foto, nome e os livros separados em abas: Lendo, Favoritos e Lidos. |
| **Sobre** | Um pouco sobre o app e sobre nós. |

## Navegação

O app usa o **Expo Router**, com rotas baseadas em arquivos, e três tipos de navegador:

- **Stack** – Login, Detalhes, Leitura e Histórico
- **Drawer** (menu lateral) – Início, Catálogo, Perfil e Sobre
- **Tabs** (dentro do Perfil) – Lendo, Favoritos e Lidos

## Tecnologias

- React Native com Expo e TypeScript
- Expo Router
- Context API para compartilhar estado entre as telas (login, listas de livros, sessão de leitura e histórico)
- AsyncStorage para guardar os dados no aparelho
- Expo Image Picker para escolher a foto de perfil
- Open Library API

## Como rodar

Você vai precisar do [Node.js](https://nodejs.org/) instalado e do app **Expo Go** no celular.

```bash
git clone https://github.com/matheusfraz/Huginn.git
cd Huginn
npm install
npx expo start
```

Depois é só escanear o QR code com o Expo Go. O celular e o computador precisam estar na mesma rede. Se não conectar, tente `npx expo start --tunnel`.

## Estrutura do projeto

```
src/
  app/          telas e rotas (cada arquivo é uma tela)
  components/   componentes reutilizáveis (Screen, BookCard, TopBar...)
  contexts/     estados compartilhados (login, livros, leitura, histórico)
  types/        tipos do TypeScript
assets/         imagens e ícones
```

## Quem fez

- **Matheus** – [@matheusfraz](https://github.com/matheusfraz)
- **Bento** – [@bentocsf](https://github.com/bentocsf)
