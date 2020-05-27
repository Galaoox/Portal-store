import bcrypt from 'bcryptjs';
const helpers: any = {};

helpers.encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


helpers.mathPassword = async (password: string, savePassword: string) => {
    try {
        return await bcrypt.compare(password, savePassword);

    } catch (error) {
        console.log(error);
    }
}



export default helpers;