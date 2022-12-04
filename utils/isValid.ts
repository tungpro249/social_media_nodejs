
const isValidPassword = (password: string | null) =>
    !(
        password === null ||
        !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+= ])(?=\S+$).{8,}$/)
    );

const isValidEmail = (email: string | null) =>
    !(
        email === null ||
        !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    );

const isValidPhone = (phone: string | null) => !(phone === null || !phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/));

export {
    isValidPassword,
    isValidEmail,
    isValidPhone
}