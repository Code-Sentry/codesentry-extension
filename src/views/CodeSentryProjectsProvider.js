const vscode = require('vscode');
const { AddProjectButtonItem, DeleteProjectButtonItem } = require('./ButtonItems');
const { watcherProjectsFiles } = require('../utils');
const { getGlobalStateWatcher  } = require('../globalStateSingleton');

class ProjectItem extends vscode.TreeItem {
    constructor(label, collapsibleState, command, project) {
        super(label, collapsibleState);
        this.command = command;
        this.contextValue = 'projectItem';
        this.project = project;
        this.iconPath = new vscode.ThemeIcon('folder');
        this.tooltip = `${this.label} - Clique em iniciar varredura!`;
        this.description = project.status;

        this.buttons = [
            {
                // command: 'codesentry.startProject',
                title: 'Start Project',
                iconPath: new vscode.ThemeIcon('play')
            }
        ];

       

        // this.command = {
        //     command: 'codesentry.deleteProjectCommand',
        //     title: 'Start Project',
        //     arguments: [project]
        // };
    }

    getProjectName() {
        return this.project.name;
    }

    getProjectUrl() {
        return this.project.url;
    }
}

class ProjectDetailItem extends vscode.TreeItem {
    constructor(label) {
        super(label, vscode.TreeItemCollapsibleState.None);
    }
}

class CodeSentryProjectsProvider {
    constructor(context) {
        this.context = context;

        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;

        const stateWatcher = getGlobalStateWatcher();
        watcherProjectsFiles(this.context, stateWatcher);
        // this.projects = Array.isArray(this.context.globalState.get('projects')) ? this.context.globalState.get('projects') : [];

        const readProjects = () => {
            const projects = Array.isArray(stateWatcher.get('projects')) ? stateWatcher.get('projects') : [];

            this.projects = projects;

            this._onDidChangeTreeData.fire();
        };
        
        readProjects();

        stateWatcher.on('change', ({ key }) => {
            if (key === 'projects') {
                readProjects();
            }
        });
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            let items = this.projects.map(project => new ProjectItem(project.name, vscode.TreeItemCollapsibleState.Collapsed, {
                command: 'codesentry.selectProject',
                title: 'Select Project',
                arguments: [project]
            }, project));
            items.push(new AddProjectButtonItem());
            return items;
        } else if (element instanceof ProjectItem) {
            let project = this.projects.find(p => p.name === element.label);
            return [
                new ProjectDetailItem(`Url: ${project.url}`),
                new ProjectDetailItem(`Criado: ${project.createdAt}`),
                new ProjectDetailItem(`Executado: ${project.lastRun ? project.lastRun : 'Nunca'}`),
                new ProjectDetailItem(`Status: ${project.status}`),
                new DeleteProjectButtonItem(project)
            ];
        }
        return [];
    }

    addProject(project) {
        this.projects.push(project);
        this.context.globalState.update('projects', this.projects);
        this.refresh();
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
}

module.exports = CodeSentryProjectsProvider;