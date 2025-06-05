import { pool } from '../config/db.js';
import bcrypt from 'bcrypt'

export class UserModel {
    static async register(username, password, email) {
        const hashedPassword = await bcrypt.hash(password, 10) // Pasar a .env o config.js
        try {
            await pool.query(
                `INSERT INTO users (user_name, email, password_hash, role_id) VALUES
                (?, ?, ?, 3);`,
                [username, email, hashedPassword]
            )

            const [user] = await pool.query(
                'SELECT id, user_name FROM users WHERE user_name = ?;',
                [username]
            )

            return user
            

        } catch(e) {
            console.error(e.message);
            throw new Error('Error creando usuario')
            // Enviarlo a un servicio externo, nunca al usuario.
        }

    }

}