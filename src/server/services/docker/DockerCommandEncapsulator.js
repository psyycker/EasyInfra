import CommandExecHelper from "../../CommandExecHelper";

export const dockerPs = async () => {
    let result = await new CommandExecHelper("docker ps --format '{{json .}}'").exec()
    result = result.split('\n')
    result.splice(result.length - 1, 1)
    return result.map(line => {
        return JSON.parse(line)
    })
}

export const dockerBuild = async (path) => {
    let result = await new CommandExecHelper(`docker build ${path}`).exec()
    return result
}
