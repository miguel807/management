import * as bcrypt from "bcrypt";
import { LoginInterface } from "./login.entity";


export class LoginValue{
    public username:string;
    public password:string;

    constructor({username,password}:LoginInterface){
        this.username = username;
        this.password = password;
    }

    public async comparePassword(password:string,hash:string):Promise<boolean>{
        return await bcrypt.compare(password,hash)
    }

}