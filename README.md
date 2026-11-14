# Catálogo de Receitas

Aplicativo mobile de catálogo de receitas salgadas, desenvolvido em React Native com Expo para um trabalho acadêmico.

## Identificação

- **Aluno(a):** EVELYN CAMILA LIMA DE SOUZA
- **RGM:** 43505210
- **Curso:** ADS
- **Disciplina:** PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS
- **Professor(a):** EULLER DA SILVA FERREIRA
- **Instituição:** UNIVERSIDADE DE FRANCA, UNIFRAN

## Vídeo de demonstração

[PREENCHER LINK DO VÍDEO DE ATÉ 30 SEGUNDOS]

## Telas

1. **Início / Catálogo:** lista de receitas em cards, busca por nome, filtro por categoria e mensagem quando nada é encontrado. Dá acesso aos detalhes e ao cadastro.
2. **Detalhes da receita:** recebe a receita por parâmetro de navegação e mostra nome, descrição, categoria, tempo de preparo, porções, ingredientes e modo de preparo.
3. **Nova receita:** formulário com campos controlados, validação com mensagens de erro e cadastro. A nova receita aparece no topo do catálogo.

## Fonte de dados

As receitas iniciais ficam em `data/receitas.js`, um array de objetos com 6 receitas salgadas, sem uso de API externa. Cada receita tem id, nome, descrição, categoria, tempo de preparo, porções, emoji, lista de ingredientes e lista de passos.

As receitas cadastradas pelo formulário existem **apenas enquanto o aplicativo está aberto**. Não há banco de dados nem armazenamento persistente, então elas se perdem ao fechar ou recarregar o app.

## Tecnologias

- React Native com Expo (template `blank`), **Expo SDK 58**
- JavaScript (sem TypeScript)
- React Navigation 7 (`@react-navigation/native` e `@react-navigation/native-stack`)
- Hooks `useState` e `useEffect`

## Onde estão os requisitos

| Requisito | Onde |
|---|---|
| Navegação com `NavigationContainer` e `createNativeStackNavigator`, 3 telas | `App.js` |
| Passagem e leitura de parâmetros (`route.params`) | `screens/Home.js` (envia) e `screens/Detalhes.js` (lê) |
| Título do cabeçalho dinâmico | `App.js` (opções da tela Detalhes) |
| Estado compartilhado da lista e atualização imutável | `App.js` (`receitas` e `adicionarReceita`) |
| `useState` em várias situações | `screens/Home.js` (busca, busca aplicada e categoria), `screens/Formulario.js` (dados e erros) e `App.js` |
| `useEffect` com dependências e limpeza | `screens/Home.js` (debounce da busca, dependência `[busca]`, `clearTimeout`) |
| Campos controlados | `components/CampoTexto.js` e `screens/Formulario.js` |
| Validação dos campos | `screens/Formulario.js` (função `validar`) |
| Componentes próprios e reutilizáveis | `components/` (`Botao`, `CardReceita`, `Cabecalho`, `CampoTexto`, `ChipCategoria`) |
| Reuso de componentes | `Botao` (Home, Detalhes e Formulário), `ChipCategoria` (Home e Formulário), `CampoTexto` (Home e Formulário), `Cabecalho` (Home e Formulário), `CardReceita` (um por receita) |
| Função recebida por props | `aoPressionar` e `aoMudarTexto` nos componentes, `aoCadastrar` no formulário |
| Desestruturação, spread, template strings, `map`, `filter` | vários arquivos, por exemplo `screens/Home.js` e `screens/Formulario.js` |
| `StyleSheet.create` | em todos os componentes e telas |
| Lista vazia e mensagens de erro | `screens/Home.js` (`ListEmptyComponent`) e `screens/Formulario.js` |

## Como executar

Requisitos: Node.js 22.13 ou mais novo e o aplicativo **Expo Go** no celular (versão compatível com o SDK 58).

```bash
git clone https://github.com/evelyncamila6550-png/catalogo-receitas.git
cd catalogo-receitas
npm install
npx expo start
```

Depois, abra o aplicativo **Expo Go** e escolha o projeto na lista (o celular e o computador precisam estar na mesma rede Wi-Fi) ou leia o QR code que aparece no terminal.

**Atenção para iPhone:** nas versões recentes do Expo Go, o iPhone exige estar logado na mesma conta Expo do computador. Rode `npx expo login` no computador e entre com a mesma conta usada no Expo Go.

## Estrutura de pastas

```
.
├── App.js
├── app.json
├── package.json
├── components/
│   ├── Botao.js
│   ├── Cabecalho.js
│   ├── CampoTexto.js
│   ├── CardReceita.js
│   └── ChipCategoria.js
├── screens/
│   ├── Detalhes.js
│   ├── Formulario.js
│   └── Home.js
├── data/
│   ├── receitas.js
│   └── tema.js
└── assets/
```