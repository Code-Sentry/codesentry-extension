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


module.exports = {
    downloadTool,
    unzipFile,
    installTool
}