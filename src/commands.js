const vscode = require('vscode');
const { downloadAndInstallToolCLI, updateToolCLI } = require('./functions');

function registerCommands(context) {
    
    const startCommand = vscode.commands.registerCommand('codesentry.start', () => {
        vscode.window.showInformationMessage('CodeSentry iniciado!');
        console.log("clicou no start");
    });

    const installCommand = vscode.commands.registerCommand('codesentry.install', () => {
        vscode.window.showInformationMessage('CodeSentry instalando...');
        downloadAndInstallToolCLI()
        console.log("clicou no install");
    });

    const updateCommand = vscode.commands.registerCommand('codesentry.update', () => {
        vscode.window.showInformationMessage('CodeSentry atualizando...');
        updateToolCLI()
        console.log("clicou no update");
    });

    context.subscriptions.push(
        startCommand,
        updateCommand,
        installCommand
    );
}

module.exports = {
    registerCommands
};