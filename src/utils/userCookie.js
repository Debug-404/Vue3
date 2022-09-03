import Cookies from "js-cookie";

export function getToKen() {
    return Cookies.get("token")
}

export function setToKen(token) {
    return Cookies.set("token", token)
}

export function removeToKen() {
    return Cookies.remove("token")
}