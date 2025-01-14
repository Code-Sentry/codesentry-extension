const vscode = require('vscode');

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
        // this.reports = Array.isArray(this.context.globalState.get('reports')) ? this.context.globalState.get('reports') : [];
        
        // Example reports for development
        this.reports = [
        {
            name: 'Report 1',
            path: '/localhost/test/1',
            project: 'Project 1',
            lastRun: '2023-01-10',
            status: 'Completed',
            file: 'C:/Users/Kaio/Downloads/314756179-English-Unlimited-a2-Elementary-Coursebook-697729.pdf'
        },
        {
            name: 'Report 2',
            path: 'http://example.com/project2',
            project: 'Project 2',
            lastRun: null,
            status: 'Pending',
            file: 'C:/Users/Kaio/Downloads/Language%20to%20Go.pdf'
        },
        {
            name: 'Report 3',
            path: 'http://example.com/project3',
            project: 'Project 3',
            lastRun: '2023-03-05',
            status: 'In Progress',
            file: 'C:/Users/Kaio/Downloads/Language%20to%20Go.pdf'
        }
        ];
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            let items = this.reports.map(report => new ReportItem(report.name, vscode.TreeItemCollapsibleState.Collapsed, {
                command: 'codesentry.selectProject',
                title: 'Select Project',
                arguments: [report]
            }, report));
            // items.push(new AddProjectButtonItem());
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