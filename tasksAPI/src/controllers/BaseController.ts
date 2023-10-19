import { Response, Request } from "express"
import logger from "../utils/logger";
import {Error} from "mongoose";

// wrapper handler to handle common errors and loggins 
export const baseHandler = async (req: Request, res: Response,  handler: (req: Request, res: Response) => Promise<Response>): Promise<Response> => {
    logger.debug("hit " + req.path + " with body " + JSON.stringify(req.body));
    try {
        return await handler(req, res);
    } catch (e) {
        let message = "";
        //ideally we should not be showing server error messages directly to user, but rather mask them 
        //So, we are masking error messages to useful infomration
        //if something fails with mongoose validation
        if (e instanceof Error.ValidationError) {
            message = "Error occurred in data validation while processing your request, Please check request paramenters. ";
        } else if (e instanceof Error) {
            message = "Error occurred while processing your request, please check your request";
        } else {
            message = "Error occurred while processing your request";
        }
        return res.status(400).json({ message, data:req.body});
    }
}