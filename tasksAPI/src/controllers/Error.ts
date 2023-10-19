
class BaseError{
    public message: string;
    constructor(messge:string){
        this.message = messge;
    }
}

export class ServerError extends BaseError{}

export class ValidationError extends BaseError{}

export class TaskNotFoundError extends BaseError{}
