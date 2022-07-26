export const isLoggedIn = () => {
    return localStorage.getItem("events-token") ? true : false
}

export const getToken = () => {
    return localStorage.getItem("events-token");
}