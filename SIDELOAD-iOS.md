# agentes no iPhone via AltStore (uso pessoal, só Windows)

Sem Mac e sem conta paga da Apple: o GitHub compila um `.ipa` sem assinatura num Mac da nuvem
(`.github/workflows/ios-sideload.yml`) e o AltStore assina com o seu Apple ID gratuito.

## 1. Gerar o .ipa (GitHub)

1. Fork deste repositório na sua conta (precisa ser **público** para os Macs do Actions serem grátis).
2. No fork: aba **Actions** → habilitar workflows (forks vêm com Actions desligado).
3. Opcional: desabilite **CI** e **CLA** (Actions → workflow → `...` → Disable), para não rodarem a cada push.
4. Actions → **iOS sideload (unsigned .ipa)** → **Run workflow**. Leva ~30–60 min.
5. Ao terminar, baixe o artifact `agentes-ios-unsigned-N`. Ele vem como `.zip`: **extraia** para obter
   `agentes-unsigned.ipa`. O resumo do run mostra o iOS mínimo exigido; confira com o do seu iPhone.

Para atualizar o app depois: no fork, **Sync fork** e rode o workflow de novo.

## 2. Preparar o Windows (uma vez)

1. Instale o app **Apple Devices** pela Microsoft Store. Com iOS recente, o iTunes para Windows não
   reconhece o iPhone ("não pôde ser identificado"); a Apple indica o Apple Devices
   (https://support.apple.com/en-us/108643). Não deixe iTunes e Apple Devices instalados juntos.
2. Instale o **iCloud** (site da Apple ou Store) e o **AltServer** (https://altstore.io) e abra o AltServer
   (ícone na bandeja).
3. Ligue o iPhone no cabo, desbloqueado, e toque em "Confiar". Ele deve aparecer na barra lateral do
   Apple Devices; lá, ative mostrar o iPhone no Wi‑Fi.
4. Para renovar pelo Wi‑Fi: instale o **Bonjour Print Services for Windows** (site da Apple) e deixe a
   rede do PC como **Privada**.

### Se o iPhone não aparecer

- **Troque o cabo primeiro.** Um cabo com defeito ainda deixa o PC ver fotos (pede "Permitir acesso"),
  mas não deixa o Apple Devices/AltServer reconhecer o iPhone. Use porta USB direta, sem hub.
- Desbloqueie o iPhone e toque em "Confiar"; se não pedir, Ajustes → Geral → Transferir ou Redefinir →
  Redefinir → **Redefinir Localização e Privacidade** e reconecte.
- Depois de mexer em drivers ou serviços da Apple, feche e reabra o AltServer.

## 3. Instalar no iPhone

1. Bandeja → AltServer → **Install AltStore** → seu iPhone → Apple ID (use um Apple ID secundário se preferir).
2. No iPhone: Ajustes → Geral → VPN e Gerenciamento de Dispositivo → confiar no seu Apple ID.
3. Ajustes → Privacidade e Segurança → **Modo de Desenvolvedor** → ligar (reinicia o iPhone).
4. Com o AltServer aberto no PC (iPhone no cabo ou na mesma rede — senão o AltStore diz
   "AltServer não encontrado"), passe o `agentes-unsigned.ipa` para o iPhone (AirDrop não existe no Windows: use iCloud Drive, OneDrive
   ou o app Arquivos) e abra-o com o AltStore, ou no AltStore: **My Apps → +** → escolha o `.ipa`.
5. Abra o app e entre pelo QR code de "Abrir no celular" do app web, ou troque o servidor na tela de login.

## Limites da conta gratuita

- **Vale 7 dias.** Deixe o PC com AltServer aberto na mesma Wi‑Fi: o AltStore renova sozinho
  (ou abra o AltStore → **Refresh All**). Se vencer, o app não abre até renovar, mas os dados ficam.
- No máximo 3 apps de sideload ativos e 10 App IDs por semana.
- **Não funcionam:** notificações push, "Entrar com a Apple", links universais (abrir links do site no app)
  e o "Compartilhar com…" (este build sai sem a extensão de compartilhar).
- Funcionam: login por e-mail/QR code, chat, servidor próprio, câmera, áudio, arquivos.

Com a conta paga (US$ 99/ano) o app dura 1 ano e o push funciona — aí use o `ios.yml` original ou EAS.

## Build diário no Google Drive

O n8n dispara o workflow todo dia às 05:15 (horário de Brasília) e ele compila quando o app mudou no upstream, e manda o `.ipa`
para a pasta `agentes-ios` do Google Drive, substituindo o anterior. Ele só faz isso se o segredo `RCLONE_CONF`
existir. Para criar (uma vez, abre o navegador para autorizar; `drive.file` só dá acesso aos arquivos que o rclone cria):

```bash
rclone config create gdrive drive scope=drive.file
rclone config show gdrive | gh secret set RCLONE_CONF -R <seu-usuário>/agentes-chat
```
