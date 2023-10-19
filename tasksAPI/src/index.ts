import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import config from "./config";
import logger from "./utils/logger";

class TaskApp {
   private app: express.Application;
   constructor() {
      this.app = express();
   }
 
   // get a configured instance of the app
   public getInstance(): express.Application {
      // support application/json type post data
      this.app.use(bodyParser.json({limit: "5mb"}));
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

      // Default Catch All route 
      this.app.get("*", (req, res) => { 
         // Just notify about non-existent API 
         res.status(404).json({status: "ok", message:"url not found"});
      }); 

      return this.app;
   }
}

const taksApp = new TaskApp().getInstance();
taksApp.listen(config.PORT, () => {
    logger.debug('Tasks server listening on port ' + config.PORT);
 });