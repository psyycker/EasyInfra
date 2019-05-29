import CommandExecHelper from "../../CommandExecHelper";

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
        this.init()
    }

}


const dockerService = new DockerService()
dockerService.test()

export default DockerService
