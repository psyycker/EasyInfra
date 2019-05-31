import fs from 'fs'
import CommandExecHelper from "../../CommandExecHelper";
import DockerConfigGenerator from "./DockerConfigGenerator";
import { dockerBuild } from './DockerCommandEncapsulator'

class DockerService {

    constructor() {

    }

    setConfig(config) {
        this.config = config
    }

    init() {
        const executor = new CommandExecHelper("docker ps");
        executor.exec().then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    setProject(project) {
        this.project = project
    }

    scanProjectDockerFile() {
        var walkSync = function(dir, filelist) {
            if (!dir.endsWith('/')) {
                dir += '/'
            }
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];
            files.forEach(function(file) {
                if (fs.statSync(dir  + file).isDirectory()) {
                    filelist = walkSync(dir + file + '/', filelist);
                }
                else {
                    filelist.push(file);
                }
            });
            return filelist;
        };
        this.dockerFiles = walkSync(this.project.getProjectPath() + '/src')
            .filter(element => element.includes('Dockerfile'))
            .map(element => this.project.getProjectPath() + '/src/' + element)
    }

    getDockerfiles(){
        return this.dockerFiles
    }

    getDockerFile(dockerfilePath) {
        return fs.readFileSync(dockerfilePath, 'utf-8')
    }

    async buildDockerFile(dockerFilePath) {
        return await dockerBuild(dockerFilePath)
    }

    test() {
       // this.init()
        const generator = new DockerConfigGenerator();
        generator.test()
    }

}

export default DockerService
