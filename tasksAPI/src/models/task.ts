import {ITask} from "../types/task";
import {model, Schema} from "mongoose";


// let's define schema for Task object
const taskSchema: Schema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        status: {type: String, required: true, enum:["To Do", "In Progress", "Done"],  default: "To Do"},
    },{ 
        // add createdAt, updatedAt
        timestamps: true 
    }
);

export default model<ITask>("Task", taskSchema);
