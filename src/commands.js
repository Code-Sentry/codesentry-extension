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

    const addProjectCommand = vscode.commands.registerCommand('codesentry.addProject', async () => {
        const projectName = await vscode.window.showInputBox({ prompt: 'Insira o nome do Projeto' });
        const urlScan = await vscode.window.showInputBox({ prompt: 'Informe o caminho do projeto' });
        if (projectName) {
            // Assuming you have a way to store projects, you can use a global state or a simple array
            const projects = Array.isArray(context.globalState.get('projects')) ? context.globalState.get('projects') : [];
            projects.push({ name: projectName, url: urlScan });
            context.globalState.update('projects', projects);
            vscode.window.showInformationMessage(`Projeto ${projectName} adicionado!`);
            console.log('Project added!', projects);
        }
    });

    const selectProjectCommand = vscode.commands.registerCommand('codesentry.selectProject', (project) => {
        vscode.window.showInformationMessage(`Project ${project.name} selected!`);
        // Logic to handle project selection
    });

    context.subscriptions.push(
        startCommand,
        updateCommand,
        installCommand,
        addProjectCommand,
        selectProjectCommand
    );
}

module.exports = {
    registerCommands
};