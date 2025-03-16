const vscode = require('vscode');
const CodeSentrySettingsProvider = require('./views/CodeSentrySettingsProvider');
const CodeSentryProjectsProvider = require('./views/CodeSentryProjectsProvider');
const CodeSentryReportsProvider = require('./views/CodeSentryReportsProvider');
const { registerCommands } = require('./commands');
const { exec } = require('child_process');
const { GlobalStateWatcher } = require('./GlobalStateWatcher');
const { setGlobalStateWatcher } = require('./globalStateSingleton');

async function activate(context) {
    
    const globalStateWatcher = new GlobalStateWatcher(context.globalState);
    setGlobalStateWatcher(globalStateWatcher);

    await isCliToolInstalled();
    // Registrar TreeView
    const settingsProvider = new CodeSentrySettingsProvider();
    const settingsView = vscode.window.createTreeView('codesentrySettings', {
        treeDataProvider: settingsProvider
    });
    context.subscriptions.push(settingsView);

    // Registrar TreeView para Projects
    const projectsProvider = new CodeSentryProjectsProvider(context);
    const projectsView = vscode.window.createTreeView('codesentryProjects', {
        treeDataProvider: projectsProvider
    });
    context.subscriptions.push(projectsView);

    // Registrar TreeView para Reports
    const reportsProvider = new CodeSentryReportsProvider(context);
    const reportsView = vscode.window.createTreeView('codesentryReports', {
        treeDataProvider: reportsProvider
    });
    context.subscriptions.push(reportsView);

    // inicio da gambiarra para o refresh funcionar
    const commands = await vscode.commands.getCommands();
    console.log(commands.includes('codesentry.refreshProjects'));
    if (false) {
    // if (!commands.includes('codesentry.refreshProjects')) {
        vscode.commands.registerCommand('codesentry.refreshProjects', () => {
            projectsProvider.refresh();
        });
    }
    // fim da gambiarra

    // Registrar Comandos
    registerCommands(context);
}

function deactivate() {}

function isCliToolInstalled(){
    const commandSystem = "codesentry --version";
    let isInstalled = true;
    
    exec(commandSystem, (error, stdout, stderr) => {
        const versionRegex = /\b\d+\.\d+\.\d+\b/g;
        const version = stdout.match(versionRegex);

        if(version == undefined){
            isInstalled = false;
            vscode.window.showErrorMessage(`A ferramenta CLI não está instalada corretamente!`);
        }
    });

    return isInstalled;
}

module.exports = {
    activate,
    deactivate
};