const vscode = require('vscode');
const exec = require('child_process').exec;
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const os = require('os');

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
    const url = 'https://github.com/Code-Sentry/codesentry/archive/refs/heads/main.zip';
    const outputDir = path.join(os.homedir(), 'Documents');;

    const response = await axios({
        url: url,
        method: 'GET',
        responseType: 'arraybuffer'
    });

    const zipPath = path.join( outputDir, 'codesentry-cli.zip');
    fs.writeFileSync(zipPath, response.data);

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(outputDir, true);

    const installPath = path.join(outputDir, 'codesentry-main');
    exec('python install.py', { cwd: installPath }, (error, stdout, stderr) => {
        if (error) {
            vscode.window.showErrorMessage(`Erro na instalação: ${stderr}`);
        } else {
            vscode.window.showInformationMessage('Ferramenta CLI instalada com sucesso!');
        }
    });
}

module.exports = {
    isCliToolInstalled,
    downloadAndInstallToolCLI
};