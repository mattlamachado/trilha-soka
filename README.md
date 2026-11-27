# Guia de estudo Trilha Soka

Aplicação local para consultar resumos dos sete módulos, dez mapas conceituais independentes, uma cronologia única e um glossário. A base principal é `../TRILHA SOKA.txt`, complementada pelo arquivo fornecido `../dez-mundos.txt` e pela lista dos dez fatores enviada pelo usuário.

## Abrir a aplicação

A página lê `data/trilha-soka.json`. Para permitir que o navegador carregue esse arquivo, inicie o servidor local incluído:

1. Abra o PowerShell nesta pasta.
2. Execute `node serve.mjs`.
3. Acesse `http://127.0.0.1:4173` no navegador.
4. Para encerrar o servidor, volte ao PowerShell e pressione `Ctrl+C`.

O servidor usa apenas módulos já incluídos no Node.js. A aplicação não carrega bibliotecas ou fontes externas.

## Arquivos

- `index.html`: navegação e seções da aplicação.
- `styles.css`: cores, tipografia, cartões, grafos e adaptação para telas menores.
- `app.js`: interações e desenho dos grafos em SVG.
- `data/trilha-soka.json`: base única de módulos, conceitos, relações, citações e acontecimentos.
- `docs/organizacao-dos-grafos.md`: proposta de organização, objetivos e relações de cada mapa.
- `docs/mapa-geral.mindmap.md`: mapa mental hierárquico para abrir no VS Code com a extensão Markmap.

Para gerar uma versão Markmap em HTML com Node.js, execute nesta pasta: `npx --yes markmap-cli "docs/mapa-geral.mindmap.md" -o "docs/mapa-geral.mindmap.html" --no-open`.

## Editar o conteúdo

Edite `data/trilha-soka.json` com um editor de texto e mantenha os identificadores existentes. Cada conceito deve ter um `id` único, uma definição, contexto, módulos e `sourceRef` com as linhas do TXT. Um conceito aparece no glossário automaticamente; para mostrá-lo em um mapa, inclua seu identificador no `nodes` do grupo.

As conexões ficam em `edges`. Cada uma contém `from`, `to`, `label`, `status` e `sourceRef`. Use `status: "explícita"` para relações declaradas pelo material. Use `status: "inferida a partir do texto"` quando a relação for uma síntese para organizar o conteúdo. Depois, acrescente o ID da conexão à lista `edges` do mapa correspondente.

Os mapas são definidos em `graphs`; cada um registra assunto, objetivo, módulos relacionados, conceitos, relações e referência no TXT. Os resumos de módulo ficam em `modules`. A cronologia fica em `timeline`; mantenha a data exatamente como aparece na fonte. O aplicativo ordena os períodos, sem completar datas ausentes.

As definições do glossário e os detalhes dos nós usam a mesma entrada em `concepts`. Evite duplicar definições em outros campos. Depois de salvar o JSON, recarregue a página no navegador.

## Ajustar a apresentação

Os mapas usam cores pastel por categoria. A associação entre categorias e classes está em `categoryClass`, no início de `app.js`; as cores da legenda e dos nós correspondentes ficam juntas no fim de `styles.css`. Para incluir uma categoria nova, atualize os dois lugares. O tamanho dos nós e das letras é definido em `renderGraph`, em `app.js`, e nos estilos `.node-card` em `styles.css`. Use **Enquadrar mapa** para ajustar o grafo inteiro à área; Ctrl + roda do mouse aproxima ou afasta.

As dez definições de fatores vieram da lista enviada pelo usuário; os dez mundos e suas definições vêm de `../dez-mundos.txt`. Essas fontes complementares estão identificadas nas referências, separadas da transcrição de `TRILHA SOKA.txt`.

A cronologia reorganiza os acontecimentos em serpentina conforme a largura da janela. A grade e a linha de ligação ficam no bloco `.timeline` ao final de `styles.css`; os tamanhos da fonte dos cartões continuam nos estilos anteriores da mesma folha.

O arquivo `docs/organizacao-dos-grafos.md` é a proposta legível dos grupos; atualize-o quando criar ou reorganizar mapas. O Mindmap é uma visão hierárquica resumida, então atualize `docs/mapa-geral.mindmap.md` quando a estrutura geral do curso mudar.

## Limites do resumo

O TXT traz listas, explicações, quizzes, citações e datas com níveis diferentes de detalhe. Quando o material lista um conceito sem defini-lo, a aplicação informa essa lacuna. Nikko Shonin é apresentado no glossário, sem marco cronológico, porque o TXT não lhe atribui uma data nessa passagem. Algumas ligações entre ilusões, calamidades e transformação são inferidas para acompanhar a sequência pedida no prompt; elas aparecem pontilhadas nos mapas e marcadas no painel de detalhes.
