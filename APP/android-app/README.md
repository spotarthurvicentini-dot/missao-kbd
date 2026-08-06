# APK Missão KBD

O aplicativo Android abre `https://spotpromo-pg.github.io/missao-kbd/` em um WebView seguro, mantendo o YouTube incorporado e o armazenamento local do progresso.

## APK oficial

Execute `..\preparar_android.ps1`. O script cria ou reutiliza a assinatura estável local e grava o APK pronto em `..\distribuicao\Missao_KBD.apk`.

A pasta `APP/assinatura` e o arquivo `keystore.properties` são privados e não podem ser enviados ao GitHub. Sem essa assinatura, futuras versões não conseguem atualizar o aplicativo instalado.

## Geração automática de teste

1. Abra a aba **Actions** do repositório no GitHub.
2. Selecione **Gerar APK**.
3. Clique em **Run workflow**.
4. Ao terminar, baixe o artefato `missao-kbd-apk`.

O arquivo gerado pelo GitHub é apenas para testes. O APK oficial é o release assinado gerado localmente.
