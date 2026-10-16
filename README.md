# TEC Planalto

Extensão do Chrome para quem resolve questões no [TEC Concursos](https://www.tecconcursos.com.br) e quer ler cada questão como se estivesse lendo a lei: preto no branco, sem distrações, com a cara da [Constituição no site do Planalto](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm).

E mais: todo artigo citado ("art. 22, VII", "CE/SC, art. 85") vira um link. Passe o mouse e leia o texto vigente na hora, sem abrir outra aba.

## Instalação

A extensão não está na Chrome Web Store. A instalação é manual, leva um minuto e só precisa ser feita uma vez.

1. **Baixe a extensão.** Nesta página do GitHub, clique no botão verde **Code** e depois em **Download ZIP**. Descompacte o arquivo numa pasta que você não vá apagar (por exemplo, `Documentos/tec-planalto`). O Chrome lê a extensão dessa pasta: se ela sumir, a extensão para de funcionar.
2. **Abra a página de extensões.** Digite `chrome://extensions` na barra de endereço e tecle Enter.
3. **Ligue o Modo do desenvolvedor.** É a chave no canto superior direito da página.
4. **Carregue a extensão.** Clique em **Carregar sem compactação** (no topo, à esquerda) e escolha a pasta que você descompactou, a que tem o arquivo `manifest.json` dentro. O cartão "TEC Planalto" aparece na lista.
5. **Fixe o ícone (opcional).** Clique no ícone de quebra-cabeça ao lado da barra de endereço e no alfinete ao lado de "TEC Planalto". Assim o botão de liga/desliga fica sempre à vista.

Pronto. Abra qualquer questão no TEC Concursos: o modo Planalto já vem ligado.

> Edge, Brave e outros navegadores baseados no Chromium têm a mesma opção: `edge://extensions`, `brave://extensions`.

## Como usar

### 1. Abra uma questão

Entre no TEC, faça login e abra um caderno ou uma questão como sempre. A página muda de cara: fundo branco, letra Arial, texto justificado. Na aba do navegador, o título passa a ser "Constituição" e o ícone vira um §.

A tela fica assim, de cima para baixo:

```
590 de 1281                                   ← posição no caderno
UNIÃO: BENS E COMPETÊNCIAS                    ← assunto da questão
(8) G %                                       ← fórum, gabarito comentado, estatísticas

    Compete privativamente à União legislar sobre…   ← enunciado

    direito civil, comercial, penal…                 ← alternativas, sem as letras
    desapropriação…
    …

Resolver

<< < > >>                                     ← navegação
```

### 2. Responda

- **Marque** clicando no texto da alternativa. A marcada fica sublinhada.
- **Confira** clicando em **Resolver**.
- **Veja o resultado:** aparece "Acertou." ou "Errou."; a alternativa certa fica em **negrito** e a sua, se estiver errada, em *itálico*. Sem verde, sem vermelho, sem confete.

### 3. Navegue

| Link | Vai para |
|---|---|
| `<<` | o tópico anterior |
| `<` | a questão anterior |
| `>` | a próxima questão |
| `>>` | o próximo tópico |

Os atalhos de teclado do próprio TEC continuam funcionando.

### 4. Consulte a lei sem sair da questão

Referências à CF e à Constituição de Santa Catarina aparecem como links no enunciado, nas alternativas, no comentário do professor, no fórum e na teoria. Por exemplo: "art. 167, VII", "arts. 5º, XI", "artigo 24, V", "Art. 25, § 2º", "CE/SC, art. 85".

- **Passe o mouse** sobre a referência para ver o texto num quadro simples.
- **Clique** para fixar o quadro e ler com calma. **Esc** fecha.
- Se a referência é a um inciso ou alínea, o quadro mostra também o caput (ou o parágrafo) que lhe dá sentido. Exemplo: "Art. 22. Compete privativamente à União legislar sobre: … VII - política de crédito, câmbio, seguros e transferência de valores;".
- Clicar numa referência dentro de uma alternativa **não** marca a alternativa.

Artigos de outras leis não viram link ("art. 7º da Lei 11.417", "CTN, art. 142", "art. 2º do ADCT"), para você não ler o artigo errado. As referências funcionam com o modo Planalto ligado ou desligado.

### 5. Fórum, gabarito e estatísticas

Na linha `(8) G %`, logo abaixo do assunto:

- **(8)** abre o fórum da questão (o número é a quantidade de posts). Cada post aparece só com o nome do autor, em negrito, e o texto. Sem votos, pontos nem datas.
- **G** abre o gabarito comentado do professor.
- **%** mostra as estatísticas: "acertos 36% · erros 64%" sob o cabeçalho e, no fim de cada alternativa, quantas pessoas a marcaram, como "(36%)". Clique de novo para esconder. O TEC lembra a escolha, então os números seguem aparecendo nas próximas questões até você desligar.

### 6. Ligue e desligue

Há três jeitos de alternar entre o modo Planalto e o TEC normal:

- **Alt+P** no teclado (no Mac, **Option+P**);
- o botão **¶** no canto inferior direito da página;
- o ícone da extensão, ao lado da barra de endereço.

A escolha vale para todas as abas e fica salva para a próxima vez. Desligue sempre que precisar de algo que o modo esconde: abas do caderno, cronômetro, favoritar, anotações, matéria, banca e concurso, imagens e gráficos.

## Perguntas frequentes

**A questão tem uma imagem e ela sumiu.**
O modo Planalto esconde imagens e gráficos. Tecle Alt+P para ver a questão no TEC normal e Alt+P de novo para voltar.

**Uma referência não virou link.**
Só viram link artigos da CF e da Constituição de SC. Artigos do ADCT e de outras leis ficam como texto, de propósito. Se uma referência à CF não virou link, abra uma issue com o texto da questão.

**A página do TEC ficou estranha ou quebrada.**
O TEC pode ter mudado o layout. Desligue o modo (Alt+P) para continuar estudando e abra uma issue contando em qual página aconteceu.

**O texto da lei está atualizado?**
O texto vem do arquivo `lei.json`, que vai dentro da extensão: a CF conforme o site do Planalto e a Constituição de Santa Catarina conforme a ALESC, até a EC 101/2026. Ele só muda quando a extensão é atualizada.

**Funciona em outro site de questões?**
Não. A extensão só roda em `www.tecconcursos.com.br` e não tem acesso a nenhum outro site.

## Atualizar

1. Baixe o ZIP de novo (passo 1 da instalação) e substitua o conteúdo da pasta antiga pelo novo.
2. Em `chrome://extensions`, clique em ↻ no cartão "TEC Planalto".
3. Recarregue a aba do TEC.

## Desinstalar

Em `chrome://extensions`, clique em **Remover** no cartão "TEC Planalto". Depois você pode apagar a pasta.

## Privacidade

A extensão pede uma única permissão, `storage`, para lembrar se o modo está ligado. Ela roda só em `https://www.tecconcursos.com.br/*`, não faz requisições de rede, não coleta dados e não automatiza nenhuma ação no site. O código está todo neste repositório.

---

## Para desenvolvedores

### Arquivos

| Arquivo | Papel |
|---|---|
| `manifest.json` | Manifest V3; roda só em `https://www.tecconcursos.com.br/*`; pede apenas `storage`. |
| `planalto.js` | Liga e desliga o modo, cria as referências e o quadro; acompanha a troca de questão (o TEC não recarrega a página). |
| `planalto.css` | O modo Planalto, todo sob `html.tecf`, e o estilo das referências e do quadro. |
| `fundo.js` | Clique no ícone da extensão alterna o modo. |
| `lei.json` | Texto vigente, artigo por artigo. Gerado por `ferramentas/gerar-lei.py`. |
| `icones/` | Ícones da extensão (16, 48 e 128 px). |

### Manutenção

- **Seletores do TEC:** o site usa AngularJS com classes estáveis (`questao-enunciado-texto`, `questao-enunciado-alternativa-texto`, `discussao-comentario-post-texto`, `li.correcao`, `li.erro`, `questao-alternativa-selecionada`). Se o TEC mudar o layout, ajuste `ALVOS` em `planalto.js` e os seletores em `planalto.css`.
- **Atualizar a lei:** depois de uma nova emenda, gere `cf.txt` e `ce.txt` (uma linha por dispositivo, sem o texto revogado) e rode:

  ```
  python3 ferramentas/gerar-lei.py cf.txt ce.txt lei.json
  ```

  Ao publicar, suba a `version` no `manifest.json`.
