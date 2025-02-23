import * as bcrypt from "bcrypt";
import { UserInterface } from "./user.entity";

export class UserValue{
    public username:string;
    public password:string;

    constructor(user:UserInterface){
        this.username = user.username;
        this.password = user.password;
    }

    public async encodePassword():Promise<void>{
        const salt  = await bcrypt.genSalt();
        const hashpassword = await  bcrypt.hash(this.password,salt)
        this.password = hashpassword;        
    }

}