# CodeSentry

[![Versão](https://img.shields.io/visual-studio-marketplace/v/kaiogerhardt.codesentry.svg)](https://marketplace.visualstudio.com/items?itemName=kaiogerhardt.codesentry)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/kaiogerhardt.codesentry.svg)](https://marketplace.visualstudio.com/items?itemName=kaiogerhardt.codesentry)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/kaiogerhardt.codesentry.svg)](https://marketplace.visualstudio.com/items?itemName=kaiogerhardt.codesentry)

**CodeSentry** é uma extensão SAST (Static Application Security Testing) para o Visual Studio Code que ajuda desenvolvedores a identificar vulnerabilidades de segurança em tempo real, sem sair do editor.

## Funcionalidades

- **Varredura em Tempo Real**  
  Detecta instantaneamente padrões de vulnerabilidade (SQL Injection, XSS, SSRF, etc.) enquanto você digita.  
- **Integração com CLI CodeSentry**  
  Gerencia todo o processo de análise via linha de comando, gerando relatórios PDF padronizados.  
- **Painel de Projetos**  
  Cadastre múltiplos diretórios ou repositórios e execute scans com um clique.  
- **Relatórios Detalhados**  
  Visualize e abra relatórios em PDF diretamente no VS Code, com localização de falhas, contexto e sugestões de correção.  
- **“Shift Left Security”**  
  Antecipe a detecção de vulnerabilidades nas fases iniciais do desenvolvimento, reduzindo retrabalho e custos.

## Instalação

1. Abra o VS Code.  
2. Acesse Extensões (`Ctrl+Shift+X` / `Cmd+Shift+X`).  
3. Pesquise por **CodeSentry** e clique em **Instalar**.

## Uso
1. Após instalada, clique no ícone CodeSentry na barra lateral.
2. Em Configurações, instale (ou atualize) a CLI automaticamente.
3. Em Projetos, adicione o caminho do diretório que deseja escanear.
4. Clique no botão de Scan ao lado do projeto.
5. Acompanhe o progresso no terminal integrado ou painel de status.
6. Ao concluir, abra o relatório em PDF em Relatórios.