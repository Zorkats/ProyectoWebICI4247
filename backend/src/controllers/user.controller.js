import { UserModel } from "../models/user.model.js"


export class UserController {
    static async register (req, res) {
        // VALIDACIONES, ZOD?
        
        const { username, password, email} = req.body
        
        const user = await UserModel.register(username, password, email) 

        res.status(201).json(user)


    }
    
}