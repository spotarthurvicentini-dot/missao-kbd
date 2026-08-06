# APP

- `android-app/`: código-fonte Android.
- `distribuicao/Missao_KBD.apk`: APK oficial pronto para entrega.
- `distribuicao/anteriores/`: builds antigos, somente para histórico local.
- `assinatura/`: chave privada usada para todas as atualizações futuras; não publicar.
- `preparar_android.ps1`: prepara as ferramentas, assina, compila e valida o APK.

Para gerar uma nova versão, atualize `versionCode` e `versionName` em `android-app/app/build.gradle` e execute `preparar_android.ps1`.
