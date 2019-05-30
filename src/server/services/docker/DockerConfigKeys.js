export const Keys = {
    IMAGE_NAME: {
        dockerFileKey: "FROM",
        position: 1,
        name: "Image Name",
        max: 1
    },
    ARG : {
        dockerFileKey: "ARG",
        position: 0,
        name: "Environment Variable"
    }
}

export const getKeys = () => {
    return Object.keys(Keys);
}

export const getObject = (key) => {
    return Keys[key]
}
