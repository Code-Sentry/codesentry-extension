const vscode = require('vscode');

class ButtonItem extends vscode.TreeItem {
    constructor(label, command, icon) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.command = command;
        this.iconPath = new vscode.ThemeIcon(icon);
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

class InstallButtonItem extends ButtonItem {
    constructor() {
        super("Instalar", { command: 'codesentry.install', title: 'Instalar CodeSentry' }, 'cloud-download');
    }
}

class UpdateButtonItem extends ButtonItem {
    constructor() {
        super("Atualizar", { command: 'codesentry.update', title: 'Atualizar CodeSentry' }, 'sync');
    }
}

module.exports = {
    StartButtonItem,
    InstallButtonItem,
    UpdateButtonItem
};