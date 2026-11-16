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

1. Instale **iTunes** e **iCloud** baixados do site da Apple (não da Microsoft Store — o AltServer não
   funciona com essas versões):
   - iTunes: https://www.apple.com/itunes/download/win64
   - iCloud: use o link "versão não-Microsoft Store" indicado no guia do AltStore para Windows
     (https://faq.altstore.io), que muda de tempos em tempos.
2. Instale o **AltServer** (https://altstore.io) e abra-o (ícone na bandeja).
3. Ligue o iPhone no cabo, toque em "Confiar" e, no iTunes, marque **Sincronizar via Wi‑Fi**.

## 3. Instalar no iPhone

1. Bandeja → AltServer → **Install AltStore** → seu iPhone → Apple ID (use um Apple ID secundário se preferir).
2. No iPhone: Ajustes → Geral → VPN e Gerenciamento de Dispositivo → confiar no seu Apple ID.
3. Ajustes → Privacidade e Segurança → **Modo de Desenvolvedor** → ligar (reinicia o iPhone).
4. Passe o `agentes-unsigned.ipa` para o iPhone (AirDrop não existe no Windows: use iCloud Drive, OneDrive
   ou o app Arquivos) e abra-o com o AltStore, ou no AltStore: **My Apps → +** → escolha o `.ipa`.
5. Se o AltStore perguntar sobre extensões e a instalação falhar, instale de novo escolhendo **remover as
   extensões** (só perde o "Compartilhar com…").
6. Abra o app e entre pelo QR code de "Abrir no celular" do app web, ou troque o servidor na tela de login.

## Limites da conta gratuita

- **Vale 7 dias.** Deixe o PC com AltServer aberto na mesma Wi‑Fi: o AltStore renova sozinho
  (ou abra o AltStore → **Refresh All**). Se vencer, o app não abre até renovar, mas os dados ficam.
- No máximo 3 apps de sideload ativos e 10 App IDs por semana (a extensão de compartilhar conta como um).
- **Não funcionam:** notificações push, "Entrar com a Apple", links universais (abrir links do site no app)
  e, provavelmente, o "Compartilhar com…" (o AltStore troca o bundle id e o app group).
- Funcionam: login por e-mail/QR code, chat, servidor próprio, câmera, áudio, arquivos.

Com a conta paga (US$ 99/ano) o app dura 1 ano e o push funciona — aí use o `ios.yml` original ou EAS.
