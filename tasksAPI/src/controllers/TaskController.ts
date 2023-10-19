import { Response, Request } from "express"
import logger from "../utils/logger";


// get me all the tasks
export const getTasks = async (req: Request, res: Response): Promise<Response> => {
    logger.debug("hit " + req.path + " with body " + JSON.stringify(req.body));
    // stubs
    return res.status(200).json("getTasks");
}

// add new task
export const addTask = async (req: Request, res: Response): Promise<Response> => {
    logger.debug("hit " + req.path + " with body " + JSON.stringify(req.body));
    // stubs
    return res.status(200).json("addTask");
}


// update a given task by id
export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    logger.debug("hit " + req.path + " with body " + JSON.stringify(req.body));
    // stubs
    return res.status(200).json("updateTask");
}


// delete a given task by id
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    logger.debug("hit " + req.path + " with body " + JSON.stringify(req.body));
    // stubs
    return res.status(200).json("deleteTask");
}
