const password_validation = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const email_validation = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i


export const validationRegister = (user_name, email, password)=>{
    if(email_validation.test(email) && password_validation.test(password) && (user_name.length >= 3 && user_name.length <= 20)) return true
    return false
}

export const validationUpload = (title, description, author)=>{
    if((author.length >= 3 && author.length <= 20) && (description.length >= 3 && description.length <= 1000) && (title.length >= 3 && title.length <= 500)) return true
    return false
}