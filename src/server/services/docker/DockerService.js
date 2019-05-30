import CommandExecHelper from "../../CommandExecHelper";
import DockerConfigGenerator from "./DockerConfigGenerator";

class DockerService {

    constructor() {

    }

    setConfig(config) {
        this.config = config
    }

    init() {
        const executor = new CommandExecHelper("docker ps")
        executor.exec().then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    test() {
       // this.init()
        const generator = new DockerConfigGenerator()
        generator.test()
    }

}


const dockerService = new DockerService()
dockerService.test()

export default DockerService
