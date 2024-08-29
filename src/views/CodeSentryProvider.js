const vscode = require('vscode');
const { StartButtonItem, InstallButtonItem, UpdateButtonItem } = require('./ButtonItems');
const {isCliToolInstalled} = require('../functions');

class CodeSentryProvider {
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

            items.push(new StartButtonItem());
            items.push(new UpdateButtonItem())
        }
        return items;
    }
}


module.exports = CodeSentryProvider;