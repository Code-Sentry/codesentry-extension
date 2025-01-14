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
            
            projects.push({
                name: projectName, 
                url: urlScan, 
                createdAt: new Date().toLocaleString(), 
                status: 'Parado',
                lastRun: null
            });

            context.globalState.update('projects', projects);
            vscode.window.showInformationMessage(`Projeto ${projectName} adicionado!`);
            console.log('Project added!', projects);

            // Refresh the tree view
            vscode.commands.executeCommand('codesentry.refreshProjects');
        }
    });

    const selectProjectCommand = vscode.commands.registerCommand('codesentry.selectProject', (project) => {
        vscode.window.showInformationMessage(`Project ${project.name} selected!`);
        // Logic to handle project selection
    });

    const deleteProjectCommand = vscode.commands.registerCommand('codesentry.deleteProject', async (project) => {
        const projects = Array.isArray(context.globalState.get('projects')) ? context.globalState.get('projects') : [];
        const updatedProjects = projects.filter(p => p.name !== project.name);
    
        context.globalState.update('projects', updatedProjects);
        vscode.window.showInformationMessage(`Projeto ${project.name} excluído!`);
        console.log('Project deleted!', updatedProjects);
    
        // Refresh the tree view
        vscode.commands.executeCommand('codesentry.refreshProjects');
    });

    const refreshProjectsCommand = vscode.commands.registerCommand('codesentry.refreshProjects', () => {
        let _onDidChangeTreeData = new vscode.EventEmitter();
        _onDidChangeTreeData.fire();
    });

    const startProjectCommand = vscode.commands.registerCommand('codesentry.startProjectItem', (project) => {
        vscode.window.showInformationMessage(`Projeto ${project.name} iniciado!`);
        // Lógica para iniciar o projeto
    });

    context.subscriptions.push(
        startCommand,
        updateCommand,
        installCommand,
        addProjectCommand,
        selectProjectCommand,
        deleteProjectCommand,
        refreshProjectsCommand,
        startProjectCommand
    );
}

module.exports = {
    registerCommands
};