const vscode = require('vscode');

class CodeSentryReportsProvider {

    constructor(context) {
        this.context = context;
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        return [];
    }

}

module.exports = CodeSentryReportsProvider;