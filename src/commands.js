const vscode = require('vscode');
const { downloadAndInstallToolCLI } = require('./functions');

function registerCommands(context) {
    
    const startCommand = vscode.commands.registerCommand('codesentry.start', () => {
        vscode.window.showInformationMessage('CodeSentry Started!');
        console.log("clicou no start");
    });

    const installCommand = vscode.commands.registerCommand('codesentry.install', () => {
        vscode.window.showInformationMessage('CodeSentry Installing...');
        downloadAndInstallToolCLI()
        console.log("clicou no install");
    });

    const updateCommand = vscode.commands.registerCommand('codesentry.update', () => {
        vscode.window.showInformationMessage('CodeSentry Started!');
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