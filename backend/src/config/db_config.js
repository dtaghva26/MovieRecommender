import "dotenv/config";
import pg from "pg";
import AppError from "./AppError.js";

const { Pool } = pg;

let pool; 

const db_config = async () => {
  // console.log("hello")
  console.log("inside db config function")
  console.log(process.env.DEFAULT_DB_URL)
  if (!process.env.DEFAULT_DB_URL) {
    throw new AppError("DEFAULT_DB_URL is not defined", 500, "DB_CONFIG_ERROR");
  }

  // Reuse if already created
  if (pool) return pool;

  try {
    pool = new Pool({
      connectionString: process.env.DEFAULT_DB_URL,
      ssl:
        process.env.DEFAULT_DB_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
      max: Number(process.env.DEFAULT_DB_POOL_MAX || 10),
      idleTimeoutMillis: Number(process.env.DEFAULT_DB_POOL_IDLE_MS || 30_000),
      connectionTimeoutMillis: Number(
        process.env.DEFAULT_DB_POOL_CONN_TIMEOUT_MS || 5_000
      ),
    });

    // One-time connection test (fail fast on bad creds/host/ssl)
    await pool.query("SELECT 1");

    console.log("PostgreSQL connected");
    return pool;
  } catch (err) {
    // If initialization fails, don’t keep a broken pool around
    pool = undefined;

    throw new AppError(
      `PostgreSQL connection failed: ${err.message}`,
      500,
      "DB_CONFIG_ERROR"
    );
  }
};
export const query = (text, params) => pool.query(text, params) 

export default db_config;