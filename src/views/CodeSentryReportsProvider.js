const vscode = require('vscode');
const { getGlobalStateWatcher  } = require('../globalStateSingleton');
const { watcherReportFiles } = require('../utils');

class ReportItem extends vscode.TreeItem {
    constructor(label, collapsibleState, command, report) {
        super(label, collapsibleState);
        this.command = command;
        this.contextValue = 'reportItem';
        this.report = report;
        this.iconPath = new vscode.ThemeIcon('file');
        this.tooltip = `${this.label} - Clique para abrir o relatório!`;
        this.description = report.status;
    }

    getFilePath() {
        return this.report.file;
    }
}

class ReportDetailItem extends vscode.TreeItem {
    constructor(label) {
        super(label, vscode.TreeItemCollapsibleState.None);
    }
}

class CodeSentryReportsProvider {

    constructor(context) {
        this.context = context;

        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;

        this.reports = [];
        const stateWatcher = getGlobalStateWatcher();

        watcherReportFiles(this.context, stateWatcher);

        const readReports = () => {
            const reports = Array.isArray(stateWatcher.get('reports'))
              ? stateWatcher.get('reports')
              : [];

            this.reports = reports;

            this._onDidChangeTreeData.fire();
        };
        
        readReports();

        stateWatcher.on('change', ({ key }) => {
            if (key === 'reports') {
              readReports();
            }
        });
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            let items = this.reports.map(report => new ReportItem(report.name, vscode.TreeItemCollapsibleState.Collapsed, null, report));
            return items;
        } else if (element instanceof ReportItem) {
            let report = this.reports.find(r => r.name === element.label);

            return this.createReportDetailItem(report)
        }
        return [];
    }

    /**
     * @param {{ name: string, url: string, createdAt: string, lastRun: string | null, status: string }} report
     */
    createReportDetailItem(report) {
        return [
            new ReportDetailItem(`Ultimo Scan: ${report.lastRun}`),
            new ReportDetailItem(`Status: ${report.status}`),
            new ReportDetailItem(`Caminho: ${report.path}`),
            new ReportDetailItem(`Projeto: ${report.project}`),
            new ReportDetailItem(`Arquivo: ${report.file}`),
        ];
    }

}

module.exports = CodeSentryReportsProvider;