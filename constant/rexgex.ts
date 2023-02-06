const REGEX_USERNAME =  /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
const REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const REGEX_PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+= ])(?=\S+$).{8,}$/

export {
    REGEX_USERNAME,
    REGEX_PASSWORD,
    REGEX_EMAIL,
    REGEX_PHONE,
}