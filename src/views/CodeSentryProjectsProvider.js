const vscode = require('vscode');
const { AddProjectButtonItem } = require('./ButtonItems');

class ProjectItem extends vscode.TreeItem {
    constructor(label, command) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.command = command;
    }
}

class CodeSentryProjectsProvider {
    constructor(context) {
        this.context = context;
        this.projects = Array.isArray(this.context.globalState.get('projects')) ? this.context.globalState.get('projects') : [];
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        console.log(this.projects);
        if (!element) {
            let items = this.projects.map(project => new ProjectItem(project.name, {
                command: 'codesentry.selectProject',
                title: 'Select Project',
                arguments: [project]
            }));
            items.push(new AddProjectButtonItem());
            return items;
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