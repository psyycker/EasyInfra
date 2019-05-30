import fs from 'fs'

export default class ProjectManager {


    constructor(name) {
        this.name = name
        this.projectPath = './projects/' + name
        if (!fs.existsSync('./projects')) {
            fs.mkdirSync('./projects');
        }
        if (!fs.existsSync('./projects/' + name)) {
            this.create()
        } else {
            this.recoverData()
        }
        console.log(this.config)
    }

    getProjectPath(){
        return this.projectPath
    }


    create() {
        fs.mkdirSync('./projects/' + this.name)
        this.config = {
            name: this.name
        }
        fs.writeFileSync(this.projectPath + "/config.json", JSON.stringify(this.config))
        // will create the project folder with informations in it
    }

    recoverData() {
        this.config = fs.readFileSync(this.projectPath + '/config.json', 'utf-8')
    }

}
