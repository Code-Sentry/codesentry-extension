const vscode = require('vscode');

function registerCommands(context) {
    
    const startCommand = vscode.commands.registerCommand('codesentry.start', () => {
        vscode.window.showInformationMessage('CodeSentry Started!');
        // Lógica adicional para o comando Start
        console.log("clicou no start");

        const panel = vscode.window.createWebviewPanel(
            "codesentry",
            "Vulnerabilites",
            vscode.ViewColumn.One
        )
    });

    context.subscriptions.push(startCommand);
}

module.exports = {
    registerCommands
};