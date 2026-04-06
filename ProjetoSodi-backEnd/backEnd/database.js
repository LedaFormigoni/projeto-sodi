import postgres from "postgres";

const sql = postgres("postgres://postgres:senaisp@192.168.1.9:5432/sodi");

export default sql;
