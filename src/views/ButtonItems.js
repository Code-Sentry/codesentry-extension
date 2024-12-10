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

class AddProjectButtonItem extends ButtonItem {
    constructor() {
        super("Adicionar Projeto", vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: 'codesentry.addProject',
            title: 'Adicionar Projeto'
        };
        this.iconPath = new vscode.ThemeIcon('plus');
    }
}

class DeleteProjectButtonItem extends vscode.TreeItem {
    constructor(project) {
        super("Excluir Projeto", vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: 'codesentry.deleteProject',
            title: 'Excluir Projeto',
            arguments: [project]
        };
        this.iconPath = new vscode.ThemeIcon('trash');
    }
}

module.exports = {
    StartButtonItem,
    InstallButtonItem,
    UpdateButtonItem,
    AddProjectButtonItem,
    DeleteProjectButtonItem
};