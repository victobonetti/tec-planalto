# TEC Planalto

<img width="1514" height="482" alt="image" src="https://github.com/user-attachments/assets/e36228db-4324-4901-83b1-aeffc66a25c7" />

Extensão para Chrome e Firefox para quem resolve questões no [TEC Concursos](https://www.tecconcursos.com.br) e quer ler cada questão como se estivesse lendo a lei: preto no branco, sem distrações, com a cara da [Constituição no site do Planalto](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm).

E mais: todo artigo citado ("art. 22, VII", "CE/SC, art. 85") vira um link. Passe o mouse e leia o texto vigente na hora, sem abrir outra aba.

<img width="1400" height="715" alt="image" src="https://github.com/user-attachments/assets/9dbced74-0dbe-43b0-a400-8dfb925b70cd" />

## Instalação no Chrome

A extensão não está na Chrome Web Store. A instalação é manual, leva um minuto e só precisa ser feita uma vez.

1. **Baixe a extensão.** Nesta página do GitHub, clique no botão verde **Code** e depois em **Download ZIP**. Descompacte o arquivo numa pasta que você não vá apagar (por exemplo, `Documentos/tec-planalto`). O Chrome lê a extensão dessa pasta: se ela sumir, a extensão para de funcionar.
2. **Abra a página de extensões.** Digite `chrome://extensions` na barra de endereço e tecle Enter.
3. **Ligue o Modo do desenvolvedor.** É a chave no canto superior direito da página.
4. **Carregue a extensão.** Clique em **Carregar sem compactação** (no topo, à esquerda) e escolha a pasta que você descompactou, a que tem o arquivo `manifest.json` dentro. O cartão "TEC Planalto" aparece na lista.
5. **Fixe o ícone (opcional).** Clique no ícone de quebra-cabeça ao lado da barra de endereço e no alfinete ao lado de "TEC Planalto". Assim o botão de liga/desliga fica sempre à vista.

Pronto. Abra qualquer questão no TEC Concursos: o modo Planalto já vem ligado.

## Instalação no Firefox

Funciona no Firefox 128 ou mais novo. A extensão também não está na loja do Firefox (addons.mozilla.org), então há dois caminhos.

### Para experimentar (some ao fechar o Firefox)

1. **Baixe a extensão** como no passo 1 do Chrome e descompacte.
2. Digite `about:debugging#/runtime/this-firefox` na barra de endereço e tecle Enter.
3. Clique em **Carregar extensão temporária…** e escolha o arquivo `manifest.json` dentro da pasta descompactada.
4. Abra uma questão no TEC Concursos.

O Firefox remove extensões temporárias quando é fechado. Na próxima vez, repita os passos 2 e 3.

### Para deixar instalada

O Firefox comum só instala de vez extensões assinadas pela Mozilla. Sem a assinatura, há duas saídas:

- **Firefox Developer Edition ou Nightly:** em `about:config`, mude `xpinstall.signatures.required` para `false`. Depois compacte o *conteúdo* da pasta (não a pasta em si) num `.zip`, renomeie para `tec-planalto.xpi` e arraste o arquivo para uma janela do Firefox.
- **Assinar a extensão:** quem mantém o projeto pode enviá-la à Mozilla como extensão não listada (o envio é gratuito e a assinatura sai em minutos) e publicar o `.xpi` assinado aqui. Esse `.xpi` instala em qualquer Firefox.

Para ligar e desligar no Firefox, valem os mesmos três jeitos do Chrome: Alt+P, o botão ¶ no canto da página e o ícone da extensão. No Firefox, o ícone pode ficar dentro do menu de extensões (o ícone de quebra-cabeça); clique com o botão direito nele e escolha **Fixar na barra de ferramentas**.
