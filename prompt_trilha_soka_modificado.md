# Projeto: Base de Conhecimento Interativa — Trilha Soka

## 1. Objetivo geral

Desenvolva uma aplicação web em HTML, CSS e JavaScript para organizar, explorar e visualizar os ensinamentos, conceitos, personagens e acontecimentos históricos abordados no curso Trilha Soka, relacionado ao Budismo de Nichiren Daishonin e à Soka Gakkai.

**Fonte única e obrigatória:** o arquivo `TRILHA SOKA.txt`, disponibilizado no projeto.

Todo o conteúdo da aplicação deve ser extraído exclusivamente desse arquivo. **Não pesquise na internet, não consulte outras fontes, não use conhecimento externo para completar lacunas e não acrescente datas, fatos, definições, citações ou interpretações que não estejam sustentados pelo TXT.** Isso vale para o mapa, a linha do tempo, os resumos, o glossário e as explicações das relações.

Quando uma informação não estiver no documento, deixe-a de fora ou indique claramente que o TXT não fornece aquele dado. Não tente corrigir, atualizar ou completar o material com conhecimento próprio.

O objetivo é construir uma ferramenta de estudo que permita compreender os conceitos apresentados no curso, suas conexões e a sequência histórica descrita no próprio material.

A aplicação deve conter três partes principais:

1. Mapas conceituais interativos, organizados em grupos de conceitos que efetivamente se relacionam.
2. Uma linha do tempo histórica única, reunindo os acontecimentos que constam no documento.
3. Uma seção textual complementar, com resumos dos módulos e definições dos conceitos.

Não produza apenas um fluxograma estático. Entretanto, mantenha o escopo de implementação proporcional: priorize uma aplicação funcional, clara e consistente, em vez de tentar implementar um sistema excessivamente complexo de edição e gerenciamento.

## 2. Estrutura geral e indicador da Trilha Soka

A interface deve apresentar um indicador central ou destacado identificado como:

**TRILHA SOKA**

A partir dele, apresente os sete módulos do treinamento. Cada módulo deve ser representado por um único objeto visual contendo o número e o título:

1. Módulo 1 — Compreender a época e o local em que vivemos.
2. Módulo 2 — Vencendo com o Gosho: O objeto de devoção para observar a mente.
3. Módulo 3 — A oração determinada muda toda uma vida.
4. Módulo 4 — Vencendo com o Gosho: O Daimoku do Sutra do Lótus.
5. Módulo 5 — Aspectos da vida iluminada.
6. Módulo 6 — Vencendo com o Gosho: Saldar as dívidas de gratidão.
7. Módulo 7 — Na companhia do Mestre, inspirar a transformação.

Os sete módulos devem funcionar como pontos de entrada e referências de origem do conteúdo, mas **não force todos os conceitos a formar um único grafo conectado**.

A partir da leitura do documento, identifique quais conceitos realmente se relacionam e organize-os em mapas ou grupos conceituais separados, conforme as orientações da seção seguinte.

## 3. Organização dos mapas conceituais: grafos por grupos de relações

Esta é a parte central do projeto.

Não quero um único mapa mental enorme no qual todos os conceitos estejam ligados artificialmente à Trilha Soka ou aos módulos. Quero que você analise o conteúdo e construa **um conjunto de grafos conceituais menores e coerentes**, agrupados por assunto e pelas relações que o próprio material permite estabelecer.

Um grafo deve reunir conceitos que formem uma sequência explicativa, uma estrutura doutrinária ou um conjunto de relações compreensível. Conceitos sem relação clara com os demais não devem ser inseridos à força em um grafo.

### 3.1. Critérios para dividir os grafos

Faça a divisão antes de implementar a visualização:

1. Leia o TXT integralmente e identifique os conceitos e as relações entre eles.
2. Agrupe os conceitos que participam de uma mesma estrutura explicativa.
3. Identifique os conceitos que aparecem em mais de um módulo e conecte-os transversalmente quando o documento sustentar essa conexão.
4. Separe estruturas conceituais independentes, mesmo que pertençam ao mesmo módulo.
5. Não conecte conceitos apenas porque aparecem próximos no texto ou pertencem ao mesmo módulo.
6. Não crie relações doutrinárias por suposição. Se uma conexão for uma síntese interpretativa necessária para organizar o conteúdo, identifique-a como **relação inferida a partir do texto**, e não como afirmação literal do curso.
7. Conceitos isolados ou sem relações suficientes devem permanecer no glossário e na seção textual, fora dos grafos.

Antes de gerar a interface, produza uma proposta de organização dos grafos: nome de cada grupo, objetivo, conceitos incluídos e relações previstas. Use essa análise para implementar os mapas.

### 3.2. Estruturas que devem receber destaque especial

Garanta que as seguintes estruturas sejam representadas de maneira clara, com os conceitos em sequência e as relações identificadas. Elas são prioridades do projeto.

**A. Estrutura do Ichinen Sanzen**

Representar explicitamente a sequência:

**Os dez mundos → possessão mútua dos dez mundos → dez fatores → três domínios da existência → Ichinen Sanzen.**

A visualização deve deixar claro o papel de cada elemento na estrutura apresentada pelo curso. Não transforme a sequência em uma simples lista: use setas rotuladas ou conexões com descrições que expliquem a relação entre os elementos.

**B. Três grandes leis secretas e os três tipos de aprendizado**

Representar:

**Três grandes leis secretas → preceitos, meditação e sabedoria.**

Deixe explícito como o material relaciona as três grandes leis secretas a esses três aspectos. Se o TXT não detalhar a correspondência individual entre cada lei e cada aspecto, não invente uma correspondência um a um: represente somente a relação geral que estiver sustentada pelo documento.

**C. Três venenos, ilusões e calamidades**

Representar a estrutura:

**Três venenos → ilusões → três calamidades → transformação.**

Incluir os três venenos individualmente:
- Avareza.
- Ira.
- Estupidez.

Incluir as três calamidades individualmente:
- Fome.
- Peste.
- Guerra.

Apresente as ilusões e a transformação conforme as explicações efetivamente disponíveis no TXT. Não atribua mecanismos causais mais específicos do que aqueles que o documento apresenta.

**D. Cinco componentes e os três domínios da existência**

Criar um grupo específico que mostre os cinco componentes:

- Forma.
- Percepção.
- Concepção.
- Volição.
- Consciência.

Relacioná-los ao **domínio dos seres vivos** e ao **domínio do meio ambiente**, preservando a estrutura dos três domínios da existência conforme apresentada no material.

O grupo deve tornar visível que os cinco componentes são um conjunto próprio e que os domínios dos seres vivos e do meio ambiente são outros elementos da estrutura. Não misture os cinco componentes com os dez fatores.

### 3.3. Outros grupos a identificar

Além das quatro estruturas prioritárias, procure no TXT outros conjuntos de conceitos que formem relações consistentes. Considere, entre outros, os seguintes assuntos, desde que estejam efetivamente presentes e relacionados no documento:

- Gohonzon, observar a mente, dez mundos e estado de Buda.
- Nam-myoho-renge-kyo, daimoku, fé e prática.
- Simultaneidade de causa e efeito, determinação, oração e ação.
- Os três significados de Myo: abrir, dotado de perfeição e reviver.
- As três grandes leis secretas e seus elementos.
- Verdadeiro aspecto de todos os fenômenos, vida eterna do Buda e kudoku.
- Gratidão, compaixão budista e saldar as dívidas de gratidão.
- Unicidade de mestre e discípulo, Três Mestres Soka e continuidade do kosen-rufu.
- Revolução humana, transformação individual e transformação social.

Esses são temas para investigar no documento, não uma ordem para criar conexões artificiais. Se algum tema não formar um conjunto coerente com os demais, mantenha-o separado.

### 3.4. Apresentação dos mapas

A aplicação deve ter uma visão geral que apresente o indicador Trilha Soka e os sete módulos, além de uma área de exploração dos diferentes grafos.

Não tente exibir todos os grafos simultaneamente em uma única tela. Isso tende a produzir excesso de informação e dificultar a leitura.

Apresente os grupos como mapas independentes, acessíveis por uma lista, índice ou navegação por temas. Ao selecionar um grupo, exiba apenas aquele grafo, com opção de retornar à visão geral.

Quando um conceito pertencer a mais de um grupo, mantenha uma identidade única para ele na base de dados e permita que apareça em mais de um grafo, sem duplicar sua definição.

## 4. Nós, conexões e interatividade

Cada grafo deve ser composto por:

- **Nós (nodes):** conceitos, princípios, práticas, personagens ou outros elementos relevantes para aquele grupo.
- **Conexões (edges):** relações entre os nós, com significado explícito.

Cada conexão deve ter um rótulo ou uma descrição curta. Não desenhe linhas sem explicar o que representam.

### 4.1. Categorias visuais

Quando aplicável, diferencie visualmente:

- Conceitos filosóficos.
- Princípios budistas.
- Práticas religiosas.
- Personagens históricos.
- Instituições.
- Acontecimentos históricos.
- Obras e escritos.
- Módulos.

Use cores, formatos ou estilos consistentes e inclua uma legenda discreta.

### 4.2. Interação com os nós e conexões

Todos os nós devem ser clicáveis.

Ao selecionar um nó, apresente um painel de detalhes com:

1. Nome.
2. Categoria.
3. Definição ou explicação disponível no TXT.
4. Contexto em que aparece no curso.
5. Módulos em que é abordado.
6. Citações literais relacionadas, quando existirem.
7. Referência bibliográfica, se constar no TXT.
8. Conceitos relacionados.
9. Relações que possui com os demais nós.

Ao selecionar uma conexão, apresente o significado da relação entre os dois elementos, usando somente o conteúdo do TXT e identificando eventuais sínteses inferidas.

### 4.3. Recursos de exploração

Implemente apenas as interações que forem úteis e viáveis para uma primeira versão:

- Zoom e movimentação do mapa.
- Arrastar nós, se a biblioteca escolhida permitir isso de maneira estável.
- Selecionar um nó para destacar suas conexões diretas.
- Expandir ou recolher grupos, quando fizer sentido.
- Pesquisar conceitos pelo nome.
- Filtrar ou localizar grafos por módulo ou tema.
- Retornar à visão completa do grafo selecionado.

Não é necessário implementar edição completa dos nós, criação de conexões pela interface, autenticação, banco de dados ou sistema avançado de curadoria. A prioridade é uma experiência de consulta e estudo funcional.

## 5. Extração dos conceitos do documento

Faça uma leitura abrangente do arquivo `TRILHA SOKA.txt`.

Extraia a maior quantidade possível de conceitos relevantes, sem simplificar excessivamente o conteúdo. Para cada módulo, identifique:

- Conceitos fundamentais e secundários.
- Termos japoneses e suas traduções.
- Personagens mencionados.
- Obras e escritos citados.
- Princípios filosóficos.
- Práticas religiosas.
- Exemplos e analogias importantes.
- Mensagens centrais do módulo.
- Relações entre conceitos.
- Citações e referências presentes.

Não se limite aos títulos das aulas. Analise explicações, transcrições, perguntas reflexivas e exemplos utilizados no material.

Quero uma primeira versão abrangente para poder revisar posteriormente. Entretanto, não confunda abrangência com inclusão indiscriminada no mapa: conceitos relevantes sem conexão clara devem constar no glossário, e não ser forçados para dentro de um grafo.

**Não invente definições para preencher lacunas.** Quando o documento apenas mencionar um termo, sem explicá-lo, registre-o como conceito mencionado e informe que o TXT não apresenta uma definição explícita.

Preserve a terminologia e a perspectiva do material do curso.

### 5.1. Citações

Sempre que possível, extraia citações literalmente do documento.

Diferencie:
- Citações atribuídas a Nichiren Daishonin.
- Citações atribuídas a Shakyamuni ou outros mestres budistas.
- Citações atribuídas a Tsunesaburo Makiguchi.
- Citações atribuídas a Josei Toda.
- Citações atribuídas a Daisaku Ikeda.
- Trechos explicativos produzidos pelo próprio material didático.

Não apresente paráfrases como citações literais. Preserve as referências bibliográficas disponíveis no TXT. Se não houver referência completa, informe que ela está incompleta, sem tentar completá-la externamente.

## 6. Linha do tempo histórica unificada

Crie uma única linha do tempo com os acontecimentos históricos e biográficos relevantes que estejam registrados no arquivo `TRILHA SOKA.txt`.

A linha do tempo não deve ser separada por personagem. Ela deve reunir, em ordem cronológica, os acontecimentos referentes às trajetórias de:

- Nichiren Daishonin.
- Nikko Shonin.
- Tsunesaburo Makiguchi.
- Josei Toda.
- Daisaku Ikeda.

**Regra obrigatória:** só inclua acontecimentos e datas que estejam efetivamente presentes no TXT. Não pesquise datas ausentes, não complete biografias com conhecimento externo e não infira datas a partir de outras informações. Se um personagem for citado, mas o documento não apresentar acontecimentos datados sobre ele, não invente entradas para preencher sua trajetória.

Priorize acontecimentos relacionados à transmissão dos ensinamentos, à formação e ao desenvolvimento da Soka Gakkai, à relação de mestre e discípulo, à propagação do budismo e às iniciativas de paz, cultura e educação, sempre que esses fatos estiverem descritos no documento.

### 6.1. Layout em zigue-zague, de cima para baixo

A linha do tempo deve utilizar um percurso em **zigue-zague vertical**, de cima para baixo, para aproveitar melhor a largura da tela e acomodar descrições sem criar uma faixa horizontal excessivamente longa.

Organize os acontecimentos cronologicamente ao longo de um eixo vertical. Alterne os cartões entre o lado esquerdo e o lado direito do eixo central, conectando-os visualmente na sequência temporal.

O percurso deve ser fácil de acompanhar: primeiro acontecimento no topo, depois alternância entre esquerda e direita, avançando continuamente para baixo.

Em telas menores, adapte o layout para uma única coluna vertical, mantendo a ordem cronológica.

Não separe a linha do tempo em trilhas independentes por personagem. Use cores, etiquetas ou pequenos identificadores para indicar quem está associado a cada acontecimento, preservando a cronologia única.

### 6.2. Conteúdo dos acontecimentos

Cada item da linha do tempo deve apresentar:

- Data ou período, exatamente conforme informado no TXT.
- Personagem ou personagens envolvidos.
- Título curto do acontecimento.
- Descrição breve, baseada no documento.
- Importância do acontecimento conforme o contexto apresentado no curso.

Se o TXT apresentar apenas um ano, não invente dia e mês. Se apresentar um período aproximado, preserve essa precisão.

### 6.3. Interatividade da linha do tempo

Cada acontecimento pode ser selecionado para abrir ou expandir sua descrição e mostrar o contexto disponível no documento.

Inclua, se viável:

- Filtro por personagem.
- Pesquisa por acontecimento.
- Navegação por períodos.
- Identificação visual dos personagens.

Os filtros devem apenas ocultar ou destacar itens da linha do tempo; a visualização padrão deve continuar sendo a cronologia unificada.

## 7. Conteúdo textual complementar

Abaixo ou em uma seção própria da aplicação, crie conteúdo textual para estudo.

### 7.1. Resumo dos sete módulos

Para cada módulo, apresente:

- Título.
- Resumo textual breve.
- Objetivo principal, conforme o material.
- Conceitos fundamentais.
- Mensagem central.
- Relações com outros módulos, quando sustentadas pelo TXT.

Os resumos devem ser claros e objetivos, sem extrapolar o conteúdo disponível.

### 7.2. Glossário de conceitos

Crie um glossário abrangente, organizado alfabeticamente ou por categoria.

Cada entrada deve apresentar:

- Nome do conceito.
- Termo original, quando informado.
- Definição ou explicação presente no TXT.
- Contexto em que aparece.
- Módulos relacionados.
- Outros conceitos relacionados, quando houver.
- Citações e referências disponíveis.

O glossário deve utilizar a mesma base de dados dos grafos. Não mantenha versões independentes das definições.

Conceitos sem relações suficientes para integrar um grafo devem permanecer disponíveis no glossário.

### 7.3. Explicação das principais estruturas conceituais

Crie uma seção textual que explique, de forma breve e didática, as principais estruturas encontradas no documento. Dê atenção especial às quatro estruturas prioritárias descritas na seção 3.2.

A explicação deve acompanhar a organização dos grafos, para que o usuário possa alternar entre a representação visual e a leitura textual.

## 8. Arquitetura dos dados

Separe os dados da interface. Não escreva os conceitos e as relações diretamente nos componentes de visualização.

Utilize uma estrutura organizada, preferencialmente JSON, contendo:

- Módulos.
- Grupos de grafos.
- Conceitos e demais nós.
- Relações entre nós.
- Personagens.
- Acontecimentos históricos.
- Citações.
- Referências e trechos de origem no TXT.

Cada elemento deve possuir um identificador único.

As relações devem conter:
- ID do nó de origem.
- ID do nó de destino.
- Tipo de relação.
- Descrição da relação.
- Indicação de que a relação é explicitamente apresentada no TXT ou inferida a partir do texto.
- Trecho ou referência interna que sustenta a relação, quando possível.

Cada conceito deve ter uma única definição na base de dados, mesmo que apareça em vários módulos ou grafos.

Utilize essa estrutura como fonte única para alimentar os mapas, o glossário, os resumos e a linha do tempo.

Não é necessário criar um sistema complexo de edição. Basta manter os dados em arquivos separados e organizados, de modo que seja possível fazer alterações futuras diretamente nos JSONs.

## 9. Interface e experiência do usuário

Crie uma interface organizada, moderna e adequada para estudo prolongado.

Sugestão de navegação principal:

1. Visão geral — Trilha Soka, sete módulos e índice dos mapas conceituais.
2. Mapas conceituais — grafos independentes organizados por tema.
3. Linha do tempo — cronologia histórica unificada em zigue-zague vertical.
4. Módulos — resumos individuais.
5. Glossário — conceitos e definições.

A visualização inicial deve apresentar a Trilha Soka, os sete módulos e os grupos de grafos disponíveis.

Não exiba todos os nós ao mesmo tempo. A pessoa deve escolher o grupo conceitual que deseja explorar.

O painel de detalhes deve aparecer somente quando um nó ou uma conexão for selecionado, evitando poluição visual.

A aplicação deve funcionar bem em computadores e tablets e adaptar-se a telas menores.

## 10. Tecnologias e implementação

Antes de implementar:

1. Inspecione a estrutura do projeto e as tecnologias já utilizadas.
2. Verifique as skills disponíveis para geração de grafos, diagramas e visualizações interativas.
3. Reutilize skills pertinentes, caso existam.
4. Avalie bibliotecas apropriadas para grafos interativos, como Cytoscape.js, D3.js ou vis-network.
5. Escolha uma solução que ofereça bom equilíbrio entre legibilidade, desempenho, interatividade e facilidade de manutenção.

Não escolha uma biblioteca apenas por familiaridade. Considere que os grafos serão divididos em grupos menores, o que deve facilitar a visualização e reduzir a complexidade.

Implemente primeiro uma versão funcional com:
- Navegação entre as seções.
- Índice dos grupos conceituais.
- Visualização dos grafos.
- Seleção de nós e exibição de detalhes.
- Linha do tempo em zigue-zague.
- Resumos e glossário.

Evite funcionalidades avançadas que não sejam essenciais para esse primeiro resultado. Não implemente editor visual completo, autenticação, backend ou persistência complexa sem necessidade.

Priorize código modular, simples e legível.

## 11. Organização e manutenção

Organize o projeto para permitir futuras alterações nos arquivos de dados:

- Adicionar conceitos.
- Editar definições.
- Incluir citações.
- Corrigir relações.
- Criar ou reorganizar grupos de grafos.
- Adicionar acontecimentos que já estejam documentados no TXT.
- Atualizar resumos.

As alterações nos dados não devem exigir reconstruir os componentes visuais.

## 12. Critérios de qualidade

Considere a primeira versão concluída quando:

- Os sete módulos estiverem representados na visão geral.
- Os conceitos relevantes estiverem extraídos do TXT.
- Os conceitos estiverem organizados em grafos temáticos coerentes, e não em um único grafo artificialmente conectado.
- As quatro estruturas prioritárias estiverem representadas com clareza.
- Conceitos sem conexão suficiente estiverem no glossário, fora dos grafos.
- As conexões tiverem rótulos ou descrições.
- Nós selecionáveis exibirem seus detalhes.
- O glossário e os grafos utilizarem a mesma base de dados.
- A linha do tempo reunir os acontecimentos em ordem cronológica.
- A linha do tempo utilizar o layout em zigue-zague vertical, adaptando-se a telas menores.
- Os resumos dos módulos estiverem disponíveis.
- As citações literais estiverem diferenciadas de paráfrases.
- Nenhuma informação externa ao TXT tiver sido acrescentada.
- Lacunas do documento não tiverem sido preenchidas por suposição.
- A interface funcionar em diferentes resoluções.

## 13. Diretriz final

A prioridade é produzir uma ferramenta de estudo clara e fiel ao material da Trilha Soka.

Seja abrangente na extração de conceitos, mas criterioso na construção dos grafos: **nem todo conceito precisa fazer parte de um mapa mental**. Os mapas devem mostrar estruturas e relações reais, enquanto conceitos isolados ou independentes podem ser consultados no glossário.

Dê prioridade à legibilidade e à compreensão das relações, não à quantidade de nós ou à complexidade da interface.

**Use exclusivamente o arquivo `TRILHA SOKA.txt` como fonte de conteúdo. Não faça pesquisas externas e não acrescente conhecimento que não esteja no documento.**

O resultado deve permitir estudar os conceitos, compreender como eles se conectam, acompanhar a história apresentada no curso e consultar definições e citações sem sair da aplicação.
