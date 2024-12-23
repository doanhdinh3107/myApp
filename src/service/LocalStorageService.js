export const KEY = "access_token"
export const getToken = () => {
    return localStorage.getItem(KEY)
}
export const setToken = (token) => {
    localStorage.setItem(KEY, token)
}
export const removeToken = () => {
    localStorage.removeItem(KEY)
}