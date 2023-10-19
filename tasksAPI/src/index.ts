import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import config from "./config";
import logger from "./utils/logger";
import {mongoDB} from "./database/mongodb";

// routes for tasks
import TaskRoutes from "./routes/TaskRoutes";

class TaskApp {
   private app: express.Application;
   constructor() {
      this.app = express();
   }
 
   // get a configured instance of the app
   public getInstance(): express.Application {
      // support application/json type post data
      this.app.use(bodyParser.json({limit: "1mb"}));
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));

      this.app.use(compression());
      // serve any static content 
      this.app.use(
          express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
      );

      // get route on root
      this.app.get("/", (req: express.Request, res: express.Response) => {
          //for health check
          res.json({status: "ok"});
      });

      // tasks routes
      this.app.use("/api/v1/", TaskRoutes);

      // Default Catch All route 
      this.app.get("*", (req, res) => { 
         // Just notify about non-existent API 
         res.status(404).json({status: "ok", message:"url not found"});
      }); 

      // connect to mongo db
      const connection = mongoDB(config.IS_PROD, config.MONGO_DB_CREDS);
      connection.then(() => {
            logger.debug("Connected to Database");
      }).catch((err) => {
            logger.debug("Not Connected to Database ERROR! ", err);
      });
      return this.app;
   }
}

// get taskAPP instance with conguired 
const taksApp = new TaskApp().getInstance();
// start the APP and listen on configured PORT
taksApp.listen(config.PORT, () => {
    logger.debug('Tasks server listening on port ' + config.PORT);
 });