import Joi from "joi";
export const TaskStatusValidator = Joi.string().valid("To Do", "In Progress", "Done");
export const TaskValidator = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    status: TaskStatusValidator
});
