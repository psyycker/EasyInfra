var Promise = require('bluebird');
var exec = require('child_process').exec;

export default class CommandExecHelper {
    constructor(command) {
        this.command = command;
    }

    exec() {
        return new Promise((resolve, reject) => {
            exec(this.command, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                }
                resolve(stdout? stdout : stderr);
            });
        });
    }

}
