import {Keys, getObject} from "./DockerConfigKeys";
import {dockerPs} from "./DockerCommandEncapsulator";
import ProjectManager from "../project/ProjectManager";
import GitService from "../git/GitService";

export default class DockerConfigGenerator {


    constructor() {
        this.config = []
        this.imageName = undefined
        this.args = []

    }


    setImageName(name) {
        this.imageName = "FROM " + name
    }

    addEnvVariable(arg) {
        const argObject = getObject("ENVIRONMENT_VARIABLE")
        const value = argObject.dockerFileKey + " " + arg
        if (this.config.length === 0) {
            this.args.push(value)
            return
        }
        this.config.push(value)
    }

    addConfig(key, config){
        const object = getObject(key)
        if (object == null) {
            throw Error(key + " doesn't exist")
        }
        const value = object.dockerFileKey + " " + config
        this.config.push(value)


    }

    generateDockerFile() {
        let fileDockerFile = []
        fileDockerFile = fileDockerFile.concat(this.args)
        fileDockerFile.push(this.imageName)
        fileDockerFile = fileDockerFile.concat(this.config)
        return fileDockerFile.join("\n")
    }

    test() {
        dockerPs()
            .then(result => {
                //console.log(result)
            })
        const projectMamanager = new ProjectManager("Scrappy")
        const gitService = new GitService(projectMamanager.getProjectPath())
        gitService.setUsername("psyycker");
        gitService.setPassword("MgT96dmaKvRC");
        gitService.setRepo("https://github.com/psyycker/A.M.-Scrappy")
        gitService.clone("develop")

        // this.setImageName("ubuntu:18.10")
        // this.addEnvVariable("user=toto")
        // this.addEnvVariable("otherUSer=tata")
        // this.addConfig("SHELL_COMMAND", "apt update && apt upgrade -y")
        // this.addEnvVariable("otherUSer=titi")
        // console.log(this.generateDockerFile());

    }
}
