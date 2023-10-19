import {describe, expect, test} from '@jest/globals';

import {TaskValidator, TaskStatusValidator} from '../validators/TaskValidator';

const todo = "To Do";
const done = "Done";
const InProgress = "In Progress";
const inProgress = "inProgress";
const complete = "Complete";


const validTask1 = { title:"HelloWorld", description: "This is a test Task",  status: todo};
const validTask2 = { title:"HelloWorld", status: InProgress};
const validTask3 = { title:"HelloWorld", status: done};
// as we would be adding default `status` todo while storing
const validTask4 = {title:"HelloWorld"};
const invalidTask1 = { };
const invalidTask2 = {title:"HelloWorld", status: complete};
const invalidTask3 = {title:"HelloWorld", status: inProgress};

describe("Task Validator Suit", ()=>{
    test("`To Do` is valid `status` ", () =>{
        expect(TaskStatusValidator.validate(todo).value).toBe(todo);
    }),
    test("`Done` is valid `status` ", () =>{
        expect(TaskStatusValidator.validate(done).value).toBe(done);
    }),
    test("`In Progress` is valid `status` ", () =>{
        expect(TaskStatusValidator.validate(InProgress).value).toBe(InProgress);
    }),
    test("`inProgress` is NOT a valid `status` ", () =>{
        expect(TaskStatusValidator.validate(inProgress).error).toBeDefined();
    }),
    test("`Complete` is NOT a valid `status` ", () =>{
        expect(TaskStatusValidator.validate(complete).error).toBeDefined();
    }),
    test(`${JSON.stringify(validTask1)} is valid task`, () =>{
        expect(TaskValidator.validate(validTask1).value).toStrictEqual(validTask1);
    })
    test(`${JSON.stringify(validTask2)} is valid task`, () =>{
        expect(TaskValidator.validate(validTask2).value).toStrictEqual(validTask2);
    })
    test(`${JSON.stringify(validTask3)} is valid task`, () =>{
        expect(TaskValidator.validate(validTask3).value).toStrictEqual(validTask3);
    }),
    test(`${JSON.stringify(validTask4)} is valid task`, () =>{
        expect(TaskValidator.validate(validTask4).value).toStrictEqual(validTask4);
    })
    test(`${JSON.stringify(invalidTask1)} is NOT a valid task`, () =>{
        expect(TaskValidator.validate(invalidTask1).error).toBeDefined();
    })
    test(`${JSON.stringify(invalidTask2)} is NOT a valid task`, () =>{
        expect(TaskValidator.validate(invalidTask2).error).toBeDefined();
    })
    test(`${JSON.stringify(invalidTask3)} is NOT a valid task`, () =>{
        expect(TaskValidator.validate(invalidTask3).error).toBeDefined();
    })
});
