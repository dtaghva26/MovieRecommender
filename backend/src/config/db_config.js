import pg from "pg" //TODO
import AppError from "./AppError.js" //TODO

const { Pool } = pg //TODO

let pool //TODO

const db_config = async () => { //TODO
  if (!process.env.DATABASE_URL) { //TODO
    throw new AppError("DATABASE_URL is not defined", 500, "DB_CONFIG_ERROR") //TODO
  } //TODO

  pool = new Pool({ connectionString: process.env.DATABASE_URL }) //TODO

  await pool.query(` //TODO
    CREATE TABLE IF NOT EXISTS users ( //TODO
      id SERIAL PRIMARY KEY, //TODO
      username VARCHAR(255) UNIQUE NOT NULL, //TODO
      email VARCHAR(255) UNIQUE NOT NULL, //TODO
      password VARCHAR(255) NOT NULL, //TODO
      age INTEGER DEFAULT 18, //TODO
      created_at TIMESTAMPTZ DEFAULT NOW(), //TODO
      updated_at TIMESTAMPTZ DEFAULT NOW() //TODO
    ) //TODO
  `) //TODO

  console.log("postgres database connected") //TODO
} //TODO

export const query = (text, params) => pool.query(text, params) //TODO

export default db_config //TODO
