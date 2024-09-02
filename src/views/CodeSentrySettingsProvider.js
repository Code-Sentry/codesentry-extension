const vscode = require('vscode');

class CodeSentrySettingsProvider {
    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        // Exemplo simples, onde você pode colocar itens de histórico
        if (!element) {
            return [
                new vscode.TreeItem("History Item 1"),
                new vscode.TreeItem("History Item 2")
            ];
        }
        return [];
    }
}

module.exports = CodeSentrySettingsProvider;