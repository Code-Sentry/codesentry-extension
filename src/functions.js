const vscode = require('vscode');
const exec = require('child_process').exec;

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

module.exports = {
    isCliToolInstalled
};