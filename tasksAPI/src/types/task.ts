import { Document } from "mongoose"

// Interface to Task Type, extending mongo document type
export interface ITask extends Document {
  title: string
  description?: string
  status: string
}