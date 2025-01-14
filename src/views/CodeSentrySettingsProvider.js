const vscode = require('vscode');
const { StartButtonItem, InstallButtonItem, UpdateButtonItem } = require('./ButtonItems');
const { isCliToolInstalled } = require('../functions');

class CodeSentrySettingsProvider {

    constructor(context) {
        this.context = context;
    }

    getTreeItem(element) {
        return element;
    }

    async getChildren(element) {
        let items = [];
        if (!element) {
            const isInstalled = await isCliToolInstalled();
            if(!isInstalled){
                items.push(new InstallButtonItem());
            }
            items.push(new UpdateButtonItem())
        }
        return items;
    }

}

module.exports = CodeSentrySettingsProvider;