import {Pool} from 'pg'
import dotenv from 'dotenv'


dotenv.config()


console.log(process.env.DATABASE_URL)
const neon = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
export default neon