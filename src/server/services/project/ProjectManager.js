import fs from 'fs'

export default class ProjectManager {


    constructor(name) {
        this.name = name

        console.log(__dirname)
        this.projectPath = __dirname + 'projects/' + name
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

    getConfig() {
        //Deep copy
        return JSON.parse(JSON.stringify(this.config))
    }


    create() {
        fs.mkdirSync('./projects/' + this.name)
        this.config = {
            name: this.name
        }
        this.save()
    }

    recoverData() {
        this.config = JSON.parse(fs.readFileSync(this.projectPath + '/config.json', 'utf-8'))
    }

    save(){
        fs.writeFileSync(this.projectPath + "/config.json", JSON.stringify(this.config, undefined, 2))
    }

    setGitInfos(infos) {
        this.config.gitInfos = infos
        this.save()
    }

}
