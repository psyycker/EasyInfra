export const Keys = {
    IMAGE_NAME: {
        dockerFileKey: "FROM",
        position: 1,
        name: "Image Name",
        max: 1
    },
    ENVIRONMENT_VARIABLE : {
        dockerFileKey: "ARG",
        position: 0,
        name: "Environment Variable"
    },
    SHELL_COMMAND : {
        dockerFileKey: "RUN",
        name: "Shell Command"
    }
}

export const getKeys = () => {
    return Object.keys(Keys);
}

export const getObject = (key) => {
    return Keys[key]
}
