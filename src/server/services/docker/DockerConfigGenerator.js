import {Keys} from "./DockerConfigKeys";

export default class DockerConfigGenerator {


    constructor(){
        this.config = {}
    }

    addConfig(key, config){
        this.config[key] = config
    }

    test() {
        this.addConfig('IMAGE_NAME', "ubuntu:18.10")
        console.log(Object.keys(this.config)[0])
    }
}
