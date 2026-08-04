# API do Google Sheets — Missão KBD

## Configuração

1. Crie uma nova planilha Google.
2. Na planilha, abra **Extensões > Apps Script**.
3. Substitua o conteúdo de `Code.gs` pelo arquivo deste diretório.
4. Execute manualmente a função `setup` e autorize o acesso.
5. Clique em **Implantar > Nova implantação > Aplicativo da Web**.
6. Configure **Executar como: você** e **Quem pode acessar: qualquer pessoa**.
7. Copie a URL terminada em `/exec`.
8. Troque `GOOGLE_SCRIPT_URL` no início de `app.js` por essa URL.

## Abas criadas

- `Eventos`: log técnico completo.
- `Sessoes`: entradas por setor, aparelho e sessão.
- `Respostas`: cada pergunta confirmada.
- `Videos`: início, marcos, saída e conclusão dos vídeos.
- `Conclusoes`: fechamento de todos os KBDs de uma marca.
- `_Controle`: identificadores usados para evitar duplicação; fica oculta.

Abrir a URL `/exec` no navegador retorna o estado e a versão da API.
