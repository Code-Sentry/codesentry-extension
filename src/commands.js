const vscode = require('vscode');
const { downloadAndInstallToolCLI, updateToolCLI } = require('./functions');
const path = require('path');
const { Uri } = require('vscode');
const { getGlobalStateWatcher } = require('./globalStateSingleton');

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
            const globalStateWatcher = getGlobalStateWatcher();
            const projects = Array.isArray(globalStateWatcher.get('projects')) ? globalStateWatcher.get('projects') : [];
            
            projects.push({
                name: projectName, 
                url: urlScan, 
                createdAt: new Date().toLocaleString(), 
                status: 'Parado',
                lastRun: null
            });

            globalStateWatcher.update('projects', projects);

            // context.globalState.update('projects', projects);
            vscode.window.showInformationMessage(`Projeto ${projectName} adicionado!`);
            console.log('Project added!', projects);
        }
    });

    const selectProjectCommand = vscode.commands.registerCommand('codesentry.selectProject', (project) => {
        vscode.window.showInformationMessage(`Project ${project.name} selected!`);
        // Logic to handle project selection
    });

    const deleteProjectCommand = vscode.commands.registerCommand('codesentry.deleteProject', async (project) => {
        const globalStateWatcher = getGlobalStateWatcher();
        const projects = Array.isArray(globalStateWatcher.get('projects')) ? globalStateWatcher.get('projects') : [];
        const updatedProjects = projects.filter(p => p.name !== project.name);
    
        globalStateWatcher.update('projects', updatedProjects);
        vscode.window.showInformationMessage(`Projeto ${project.name} excluído!`);
        console.log('Project deleted!', updatedProjects);
    });

    const startProjectCommand = vscode.commands.registerCommand('codesentry.startScan', (project) => {
        let projectName = project.getProjectName();
        vscode.window.showInformationMessage(`Projeto ${projectName} iniciado!`);

        const terminal = vscode.window.createTerminal(`CodeSentry: ${projectName}`);
        terminal.sendText(`codesentry --scan full --directory C:\\Projects\\codesentry\\test`);
        terminal.show();
    });

    let openPDF = vscode.commands.registerCommand('codesentry.openLocalPDF', function (filePath) {
        let uri = Uri.file(filePath.getFilePath());
        vscode.env.openExternal(uri);
    });

    context.subscriptions.push(
        startCommand,
        updateCommand,
        installCommand,
        addProjectCommand,
        selectProjectCommand,
        deleteProjectCommand,
        startProjectCommand,
        openPDF
    );
}

module.exports = {
    registerCommands
};