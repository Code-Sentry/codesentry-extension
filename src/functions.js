const vscode = require('vscode');
const exec = require('child_process').exec;

const utils = require('./utils');

function isCliToolInstalled() {
    const commandSystem = "codesentry --version";
    return new Promise((resolve) => {

        exec(commandSystem, (error, stdout, stderr) => {
            const versionRegex = /\b\d+\.\d+\.\d+\b/g;
            const version = stdout.match(versionRegex);

            if (version != undefined) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

async function downloadAndInstallToolCLI(){
    
    try{
        const zipPath = await utils.downloadTool();
        await utils.unzipFile(zipPath);
        await utils.installTool(vscode);

        vscode.window.showInformationMessage('Ferramenta instalada com sucesso!');
    }catch(error){
        vscode.window.showErrorMessage(`Erro ao instalar a ferramenta: ${error.message}`);
    }

}

module.exports = {
    isCliToolInstalled,
    downloadAndInstallToolCLI
};