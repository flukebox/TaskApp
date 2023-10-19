import logger from "../utils/logger";
import mongoose from "mongoose";

//
export const mongoDB = (isProd: boolean,    
             mongoCreds: {  username: string; password: string; 
                            host: string; port: number; db: string; replSet?: string; 
                            readPref?: string 
    }) => {
    
    const options: any = {};
    const db = mongoose.connection;
    let urlString = "mongodb://";
    if (mongoCreds.username && mongoCreds.password) {
        urlString += `${mongoCreds.username}:${mongoCreds.password}@`;
    }

    urlString += `${mongoCreds.host}:${mongoCreds.port}`;        
    logger.debug("url : " + urlString);
    urlString += `/${mongoCreds.db}`;

    // listen for different events being emitted from mongoose
    db.on("connecting", function () {
        logger.debug("connecting to MongoDB...");
    });

    db.on("error", function (error: any) {
        logger.error("Error in MongoDb connection: " + error);
        mongoose.disconnect();
    });
    
    db.on("connected", function () {
        logger.debug("MongoDB connected!");
    });
    
    db.once("open", function () {
        logger.debug("MongoDB connection opened!");
    });

    db.on("reconnected", function () {
        logger.debug("MongoDB reconnected!");
    });
    
    db.on("disconnected", function () {
        logger.debug("MongoDB disconnected!");
        setTimeout(() => { 
            mongoose.createConnection(urlString, options);
        }, 2000);
    });
    return mongoose.connect(urlString, options);
};

export default mongoDB;
