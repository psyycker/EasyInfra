import ProjectManager from "./services/project/ProjectManager";
import GitService from "./services/git/GitService";
import DockerService from "./services/docker";

function main() {

    const project = new ProjectManager("Scrappy")
    project.setGitInfos({repo: "https://github.com/psyycker/A.M.-Scrappy", username: "psyycker", password: "MgT96dmaKvRC"})
    const gitManager = new GitService(project.getProjectPath())
    gitManager.setRepo(project.getConfig().gitInfos.repo)
    gitManager.setUsername(project.getConfig().gitInfos.username)
    gitManager.setPassword(project.getConfig().gitInfos.password)
    gitManager.clone()
    const dockerService = new DockerService()
    dockerService.setProject(project)
    dockerService.scanProjectDockerFile()
    const files = dockerService.getDockerfiles()
    console.log(files)
    const config = dockerService.getDockerFile(files[0])
    dockerService.buildDockerFile(files[0])
        .then(response => {
            console.log(response)
        })
    console.log(config)

}

main()
