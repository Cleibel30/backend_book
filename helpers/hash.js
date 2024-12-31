import bcrypt from "bcrypt"

export const hashPassword = (password, saltRounds = 10)=>{
    return bcrypt.hash(password, saltRounds)
}

export const verifyPassword= (password, hashedPassword) => {
     return bcrypt.compare(password, hashedPassword); 
}