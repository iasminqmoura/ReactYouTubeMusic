## Programação para Dispositivos Móveis - Prova 2
### YouTube Music com React Native

Foi desenvolvido uma réplica do aplicativo do YouTube Music para Android, utilizando React Native junto à API do YouTube.
O aplicativo desenvolvido deve conectar a sua conta Google para receber dados do YouTube como seus vídeos favoritos e marcados como gostei. Também é exibido os vídeos de música mais assistidos, visualizados e recomendados, além da possibilidade de fazer pesquisas.

#### Tecnologias Utilizadas
- React Native
- YouTube Data API v3
- Expo
- Emulador GenyMotion para testes

#### Prints do aplicativo desenvolvido
![Tela principal](/.github/principal.jpg "Tela principal")

![Tela de pesquisa](/.github/pesquisa.jpg)

#### Iniciando o servidor de testes
1. Clone este repositório com
`git clone http://github.com/iasminqmoura/ReactYouTubeMusic`
2. Navegue até a pasta do projeto e instale as dependências com
`npm install`
3. Inicie o servidor de testes com
`expo start`
4. Conecte seu celular ou emulador ao servidor utilizando o aplicativo do Expo.

#### Utilizando o GenyMotion para testes
O aplicativo necessita de um navegador com funções recentes para conectar com sua conta Google. Um dispositivo Android emulado pelo GenyMotion inclui um navegador padrão não suportado pela Google. Para instalar um navegador como o Google Chrome, é necessário instalar o GApps para ter acesso a Play Store. Para isso,
1. inicie um dispositivo emulado pelo GenyMotion;
2. na barra lateral da direita, selecione o primeiro item (Install Open GApps);
3. aguarde o download e reinicie o emulador.

Após concluído a instalação, é possivel acessar a Play Store para baixar seu navegador preferido.
