param(
    [string]$PastaFerramentas = "",
    [switch]$SomentePreparar
)

$ErrorActionPreference = "Stop"
$pastaApp = Split-Path -Parent $MyInvocation.MyCommand.Path
$raiz = Split-Path -Parent $pastaApp

if ([string]::IsNullOrWhiteSpace($PastaFerramentas)) {
    $PastaFerramentas = Join-Path $raiz ".android-tools"
}
$ferramentas = [IO.Path]::GetFullPath($PastaFerramentas)
$downloads = Join-Path $ferramentas "downloads"
$jdk = Join-Path $ferramentas "jdk"
$sdk = Join-Path $ferramentas "sdk"
$gradle = Join-Path $ferramentas "gradle-8.13"

New-Item -ItemType Directory -Force -Path $downloads,$ferramentas,$sdk | Out-Null

function Baixar-SeFaltar([string]$Url, [string]$Destino) {
    if (-not (Test-Path -LiteralPath $Destino)) {
        Write-Host "Baixando $([IO.Path]::GetFileName($Destino))..."
        Invoke-WebRequest -Uri $Url -OutFile $Destino -UseBasicParsing
    }
}

$zipJdk = Join-Path $downloads "microsoft-jdk-17-windows-x64.zip"
$zipCmd = Join-Path $downloads "commandlinetools-win-15859902_latest.zip"
$zipGradle = Join-Path $downloads "gradle-8.13-bin.zip"

Baixar-SeFaltar "https://aka.ms/download-jdk/microsoft-jdk-17-windows-x64.zip" $zipJdk
Baixar-SeFaltar "https://dl.google.com/android/repository/commandlinetools-win-15859902_latest.zip" $zipCmd
Baixar-SeFaltar "https://services.gradle.org/distributions/gradle-8.13-bin.zip" $zipGradle

if (-not (Test-Path -LiteralPath (Join-Path $jdk "bin\java.exe"))) {
    $tmpJdk = Join-Path $ferramentas "jdk-extraido"
    New-Item -ItemType Directory -Force -Path $tmpJdk | Out-Null
    Expand-Archive -LiteralPath $zipJdk -DestinationPath $tmpJdk -Force
    $pastaJdk = Get-ChildItem -LiteralPath $tmpJdk -Directory | Select-Object -First 1
    if (-not $pastaJdk) { throw "JDK nao encontrado no arquivo baixado." }
    Move-Item -LiteralPath $pastaJdk.FullName -Destination $jdk
    Remove-Item -LiteralPath $tmpJdk -Recurse -Force
}

$sdkManager = Join-Path $sdk "cmdline-tools\latest\bin\sdkmanager.bat"
if (-not (Test-Path -LiteralPath $sdkManager)) {
    $tmpCmd = Join-Path $ferramentas "cmdline-extraido"
    New-Item -ItemType Directory -Force -Path $tmpCmd | Out-Null
    Expand-Archive -LiteralPath $zipCmd -DestinationPath $tmpCmd -Force
    $destinoCmd = Join-Path $sdk "cmdline-tools\latest"
    New-Item -ItemType Directory -Force -Path $destinoCmd | Out-Null
    Get-ChildItem -LiteralPath (Join-Path $tmpCmd "cmdline-tools") -Force | Move-Item -Destination $destinoCmd
    Remove-Item -LiteralPath $tmpCmd -Recurse -Force
}

if (-not (Test-Path -LiteralPath (Join-Path $gradle "bin\gradle.bat"))) {
    Expand-Archive -LiteralPath $zipGradle -DestinationPath $ferramentas -Force
}

$env:JAVA_HOME = $jdk
$env:ANDROID_HOME = $sdk
$env:ANDROID_SDK_ROOT = $sdk

1..30 | ForEach-Object { "y" } | & $sdkManager --sdk_root=$sdk --licenses | Out-Null
& $sdkManager --sdk_root=$sdk "platforms;android-35" "build-tools;35.0.0" "platform-tools"
if ($LASTEXITCODE -ne 0) { throw "Falha ao instalar componentes do Android SDK." }

$projetoAndroid = Join-Path $pastaApp "android-app"
$pastaAssinatura = Join-Path $pastaApp "assinatura"
$arquivoChave = Join-Path $pastaAssinatura "Missao-KBD-release.jks"
$arquivoPropriedades = Join-Path $projetoAndroid "keystore.properties"
$arquivoCredenciais = Join-Path $pastaAssinatura "CREDENCIAIS-PRIVADAS.txt"
$alias = "missao-kbd"

New-Item -ItemType Directory -Force -Path $pastaAssinatura | Out-Null

if (-not (Test-Path -LiteralPath $arquivoChave)) {
    $bytesSenha = New-Object byte[] 24
    $geradorSenha = [Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $geradorSenha.GetBytes($bytesSenha)
    } finally {
        $geradorSenha.Dispose()
    }
    $senha = [Convert]::ToBase64String($bytesSenha)
    $keytool = Join-Path $jdk "bin\keytool.exe"
    & $keytool -genkeypair -v -keystore $arquivoChave -storepass $senha -keypass $senha -alias $alias -keyalg RSA -keysize 4096 -validity 10000 -dname "CN=Missao KBD, OU=SPOT, O=SPOT Promo, C=BR"
    if ($LASTEXITCODE -ne 0) { throw "Falha ao criar a assinatura do aplicativo." }
    @(
        "ARQUIVO PRIVADO - NAO ENVIAR AO GITHUB",
        "Alias: $alias",
        "Senha: $senha"
    ) | Set-Content -LiteralPath $arquivoCredenciais -Encoding UTF8
} else {
    if (-not (Test-Path -LiteralPath $arquivoCredenciais)) {
        throw "A chave existe, mas o arquivo privado de credenciais nao foi encontrado."
    }
    $senha = ((Get-Content -LiteralPath $arquivoCredenciais -Encoding UTF8 | Where-Object { $_ -like "Senha:*" }) -replace "^Senha:\s*", "").Trim()
    if (-not $senha) { throw "Senha da assinatura nao encontrada." }
}

@(
    "storeFile=../assinatura/Missao-KBD-release.jks",
    "storePassword=$senha",
    "keyAlias=$alias",
    "keyPassword=$senha"
) | Set-Content -LiteralPath $arquivoPropriedades -Encoding ASCII

if (-not (Test-Path -LiteralPath (Join-Path $projetoAndroid "gradlew.bat"))) {
    Push-Location $projetoAndroid
    try {
        & (Join-Path $gradle "bin\gradle.bat") wrapper --gradle-version 8.13
        if ($LASTEXITCODE -ne 0) { throw "Falha ao gerar o Gradle Wrapper." }
    } finally {
        Pop-Location
    }
}

if ($SomentePreparar) {
    Write-Host "Ambiente Android e assinatura preparados."
    exit 0
}

Push-Location $projetoAndroid
try {
    & ".\gradlew.bat" clean assembleRelease
    if ($LASTEXITCODE -ne 0) { throw "Falha ao compilar o APK." }
} finally {
    Pop-Location
}

$apkOrigem = Join-Path $projetoAndroid "app\build\outputs\apk\release\app-release.apk"
$pastaDistribuicao = Join-Path $pastaApp "distribuicao"
$apkOficial = Join-Path $pastaDistribuicao "Missao_KBD.apk"
$apkVersionado = Join-Path $pastaDistribuicao "Missao_KBD-v2.1.0.apk"
New-Item -ItemType Directory -Force -Path $pastaDistribuicao | Out-Null
Copy-Item -LiteralPath $apkOrigem -Destination $apkOficial -Force
Copy-Item -LiteralPath $apkOrigem -Destination $apkVersionado -Force

$apksigner = Join-Path $sdk "build-tools\35.0.0\apksigner.bat"
& $apksigner verify --verbose --print-certs $apkOficial
if ($LASTEXITCODE -ne 0) { throw "A assinatura do APK nao foi validada." }

$hash = (Get-FileHash -LiteralPath $apkOficial -Algorithm SHA256).Hash
"$hash  Missao_KBD.apk" | Set-Content -LiteralPath (Join-Path $pastaDistribuicao "Missao_KBD.sha256.txt") -Encoding ASCII
Write-Host "APK oficial criado em: $apkOficial"
Write-Host "SHA-256: $hash"
