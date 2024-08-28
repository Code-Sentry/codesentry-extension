const vscode = require('vscode');
const CodeSentryProvider = require('./views/CodeSentryProvider');
const { registerCommands } = require('./commands');
const { exec } = require('child_process');

async function activate(context) {

    await isCliToolInstalled();
    // Registrar TreeView
    const treeDataProvider = new CodeSentryProvider();
    const view = vscode.window.createTreeView('codesentryView', {
        treeDataProvider
    });
    context.subscriptions.push(view);

    // Registrar Comandos
    registerCommands(context);
}

function deactivate() {}

function isCliToolInstalled(){
    const commandSystem = "codesentry --version";
    let isInstalled = false;
    
    exec(commandSystem, (error, stdout, stderr) => {
        const versionRegex = /\b\d+\.\d+\.\d+\b/g;
        const version = stdout.match(versionRegex);

        if(version != undefined){
            isInstalled = true;
            
            vscode.window.showErrorMessage(`A ferramenta CLI não está instalada corretamente!`, "Instalar").then(selection => {
                if (selection === "Instalar") {
                    vscode.env.openExternal(vscode.Uri.parse('https://github.com/KaioGerhardt/codesentry'));
                }
            });
        }
    });

    return isInstalled;
}

module.exports = {
    activate,
    deactivate
};