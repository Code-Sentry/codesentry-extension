const vscode = require('vscode');

function registerCommands(context) {
    
    const startCommand = vscode.commands.registerCommand('codesentry.start', () => {
        vscode.window.showInformationMessage('CodeSentry Started!');
        console.log("clicou no start");
    });

    const installCommand = vscode.commands.registerCommand('codesentry.install', () => {
        vscode.window.showInformationMessage('CodeSentry Started!');
        console.log("clicou no install");
    });

    const updateCommand = vscode.commands.registerCommand('codesentry.install', () => {
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