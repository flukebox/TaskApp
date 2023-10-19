import dotenv from "dotenv";

// Get configuration from env file
if (process.env.NODE_ENV == "test") {
    console.log("Loading .env file");
    dotenv.config({ path: ".test.env" });
} else {
    dotenv.config();
}

const config = {
    PORT: process.env.PORT || 3333,
    LOG_DIR : process.env.LOG_DIR || "./log",
    LOG_LEVEL: process.env.LOG_LEVEL ||"info",
    SERVICE_NAME: process.env.SERVICE_NAME || "tasks-service",
    MONGO_DB_CREDS: {
        host : process.env.MONGODB_HOST,
        port : parseInt(process.env.MONGODB_PORT || "27017"),
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        db: process.env.MONGODB_DB,
        replSet: process.env.MONGODB_REPLSET
    },
};
export default config;
