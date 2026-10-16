# TEC Planalto

Extensão do Chrome que dá às questões do [TEC Concursos](https://www.tecconcursos.com.br) a cara da Constituição no site do Planalto, como o modo hiperfoco do portal, e mostra o texto vigente de cada artigo citado.

## O que faz

- **Modo Planalto:** a página fica irreconhecível como TEC e parece a Constituição no site do Planalto. Minimalismo absoluto: fica só a questão.
  - No topo, "590 de 1281" em azul e o assunto como título de seção, em caixa alta ("UNIÃO: BENS E COMPETÊNCIAS…"). Embaixo, "(8) G": o número de posts do fórum, que abre o fórum, e G, que abre o gabarito comentado do professor.
  - O enunciado (justificado, com recuo) e as alternativas como parágrafos, sem as letras. A que você marcou fica sublinhada.
  - Antes de responder: "Resolver". Depois, uma marca sutil: a certa em **negrito**, a sua (se errada) em *itálico*, e a linha "Errou." ou "Acertou.".
  - Navegação: `<< < > >>` (tópico anterior, anterior, próxima, tópico seguinte). Os outros atalhos do TEC continuam valendo pelo teclado.
  - Fórum: o nome do autor em negrito e o texto, sem votos, pontos, datas nem ordenação.
  - Somem: barra do site, caminho, cronômetro, abas do caderno, "Questão", "( Exibir )", matéria, banca e concurso, número da questão no TEC, avisos (como "gabarito preliminar"), botões de teoria, favoritar, anotar e desempenho, letras das alternativas, rodapé, ícones, imagens, gráficos, linhas, sombras e fundos. Para usá-los, desligue o modo (¶ ou Alt+P).
  - Só preto, branco e o azul dos links e do título, como na página da CF.
  - Na aba do navegador: título "Constituição", como o da página da CF, e ícone §. Ao desligar, voltam o título e o ícone do site.
- **Referências clicáveis:** "art. 167, VII", "arts. 5º, XI", "artigo 24, V", "Art. 25, § 2º", "CE/SC, art. 85" no enunciado, nas alternativas, no comentário do professor, no fórum e na teoria. Passar o mouse mostra o texto num quadro sóbrio (só borda e texto); clicar fixa o quadro (Esc fecha).
  - Inciso e alínea vêm com o caput, o parágrafo ou o inciso que lhes dá sentido. Exemplo: "Art. 22. Compete privativamente à União legislar sobre: … VII - política de crédito…".
  - Não viram link: artigos de outras leis ("art. 7º da Lei 11.417", "CTN, art. 142", "do ADCT") e o cabeçalho de lei citada no enunciado ("“Art. 1º As concessionárias…").
  - Clicar numa referência dentro de uma alternativa não marca a alternativa.
- **Liga e desliga:** pelo botão ¶ no canto inferior direito, pelo ícone da extensão ou por **Alt+P**. A preferência vale para todas as abas. As referências funcionam nos dois modos.

Nada sai do seu navegador: a extensão não faz requisições a servidores, não lê suas respostas e não automatiza nada. O texto da lei vem do arquivo `lei.json`, que vai dentro da própria extensão: a CF (Planalto) e a Constituição de Santa Catarina (ALESC, até a EC 101/2026). O ADCT não está incluído.

## Instalar

1. Baixe esta pasta (`extensao-tec/`) para o seu computador. Por exemplo, pelo GitHub, em *Code → Download ZIP*, e descompacte.
2. No Chrome, abra `chrome://extensions` e ligue o **Modo do desenvolvedor**, no canto superior direito.
3. Clique em **Carregar sem compactação** e escolha a pasta `extensao-tec`.
4. Abra uma questão no TEC. Para atualizar a extensão depois, baixe a pasta de novo e clique em ↻ no cartão dela em `chrome://extensions`.

## Arquivos

| Arquivo | Papel |
|---|---|
| `manifest.json` | Manifest V3; roda só em `https://www.tecconcursos.com.br/*`; pede apenas `storage`. |
| `planalto.js` | Liga e desliga o modo, cria as referências e o quadro; acompanha a troca de questão (o TEC não recarrega a página). |
| `planalto.css` | O modo Planalto, todo sob `html.tecf`, e o estilo das referências e do quadro. |
| `fundo.js` | Clique no ícone da extensão alterna o modo. |
| `lei.json` | Texto vigente, artigo por artigo. Gerado por `ferramentas/gerar-lei.py`. |

## Manutenção

- **Seletores do TEC:** o site usa AngularJS com classes estáveis (`questao-enunciado-texto`, `questao-enunciado-alternativa-texto`, `discussao-comentario-post-texto`, `li.correcao`, `li.erro`, `questao-alternativa-selecionada`). Se o TEC mudar o layout, ajuste `ALVOS` em `planalto.js` e os seletores em `planalto.css`.
- **Atualizar a lei:** depois de uma nova emenda, gere `cf.txt` e `ce.txt` (uma linha por dispositivo, sem o texto revogado) e rode:

  ```
  python3 ferramentas/gerar-lei.py cf.txt ce.txt lei.json
  ```
