const vscode = require('vscode');

class CodeSentryProvider {
    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            return [
                new StartButtonItem()
            ];
        }
        return [];
    }
}

class StartButtonItem extends vscode.TreeItem {
    constructor() {
        super("Start", vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: 'codesentry.start',
            title: 'Start CodeSentry'
        };
        this.iconPath = new vscode.ThemeIcon('play');
    }
}

module.exports = CodeSentryProvider;