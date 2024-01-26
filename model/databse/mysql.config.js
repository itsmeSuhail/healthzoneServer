import dotenv from "dotenv";
import mysql from "mysql2/promise"
dotenv.config();

class MysqlOperator {
    #connector;
    constructor() {
        this.#connector = mysql.createPool({
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    async connection() {
        try {
            const connection = await this.#connector.getConnection();
            console.log("db connected");
            return connection;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async createSchema(connection) {
        
    }
    
    



}

export const mysqlInstance= new MysqlOperator();