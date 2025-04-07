const isAthenticated = () => {
    const token = localStorage.getItem("accessToken")
    return token
}

export {isAthenticated}