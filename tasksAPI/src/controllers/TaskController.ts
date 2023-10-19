import { Response, Request } from "express"
import { ITask} from "../types/task"
import Task from "../models/task"
import logger from "../utils/logger";
import {baseHandler} from "./BaseController";


// get me all the tasks
export const getTasks = async (req: Request, res: Response): Promise<Response> => {
    // we are wrapping our req/res with base handler to make use of debugging and commons errors
    return baseHandler(req, res, async (req: Request, res: Response) => {
        const tasks: ITask[] = await Task.find()
        return res.status(200).json({ tasks})
    });
}


export const addTask = async (req: Request, res: Response): Promise<Response> => {
    // we are wrapping our req/res with base handler to make use of debugging and commons errors
    return baseHandler(req, res, async (req: Request, res: Response) => {
        const itask = req.body as ITask;
        const task = new Task(itask);
        const newTask: ITask = await task.save()
        const allTasks: ITask[] = await Task.find()  
        return res.status(200).json({ message: "Task added", task: newTask, tasks: allTasks});
    });
}

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
     // we are wrapping our req/res with base handler to make use of debugging and commons errors
     return baseHandler(req, res, async (req: Request, res: Response) => {
        // get task from body
        const {params:{id}, body} = req;
        const itask = body as ITask;
        const updatedTask: ITask = await Task.findByIdAndUpdate({_id:id}, itask);
        const allTasks: ITask[] = await Task.find()  
        return res.status(200).json({ message: "Task Updated", task: updatedTask, tasks: allTasks})
    });
}


export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    // we are wrapping our req/res with base handler to make use of debugging and commons errors
    return baseHandler(req, res, async (req: Request, res: Response) => {
        // get task from body
        const {params:{id}, body} = req;
        const deletedTask: ITask = await Task.findByIdAndDelete({_id:id});
        const allTasks: ITask[] = await Task.find()  
        return res.status(200).json({ message: "Task Deleted", task: deletedTask, tasks: allTasks});
    });
}
