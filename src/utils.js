const exec = require('child_process').exec;
const axios = require('axios');
const path = require('path');
const os = require('os');
const fs = require('fs');
const AdmZip = require('adm-zip');

const urlRepository = 'https://github.com/Code-Sentry/codesentry/archive/refs/heads/main.zip';
const dirDocumentsUser = path.join(os.homedir(), 'Documents');

async function downloadTool(){
    const response = await axios({
        url: urlRepository,
        method: 'GET',
        responseType: 'arraybuffer'
    });

    const zipPath = path.join( dirDocumentsUser, 'codesentry-cli.zip');
    fs.writeFileSync(zipPath, response.data);

    return zipPath;
}

function unzipFile(zipPath){
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(dirDocumentsUser, true);
}

function installTool(vscodeDependency){
    const installPath = path.join(dirDocumentsUser, 'codesentry-main');
    exec('python install.py', { cwd: installPath }, (error, stdout, stderr) => {
        if (error) {
            vscodeDependency.window.showErrorMessage(`Erro na instalação: ${stderr}`);
        } else {
            vscodeDependency.window.showInformationMessage('Ferramenta CLI instalada com sucesso. Por favor, reinicie o VSCode!');
        }
    });
}

async function getLatestVersion(vscodeDependency) {
    const url = 'https://api.github.com/repos/Code-Sentry/codesentry/releases/latest';
    try {
        const response = await axios.get(url);
        return response.data.tag_name; // Ex: 'v1.2.3'
    } catch (error) {
        vscodeDependency.window.showErrorMessage(`Erro ao obter a última versão: ${error}`);
        return null;
    }
}

function getVersionTool() {
    return new Promise((resolve, reject) => {
        exec("codesentry --version", (error, stdout, stderr) => {
            const versionRegex = /\b\d+\.\d+\.\d+\b/g;
            const version = stdout.match(versionRegex)[0];

            if (version != undefined) {
                resolve(version);
            }else{
                reject();
            }
        });
    });
}

module.exports = {
    downloadTool,
    unzipFile,
    installTool,
    getLatestVersion,
    getVersionTool
}