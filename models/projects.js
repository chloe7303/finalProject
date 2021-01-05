import mongoose from 'mongoose'

const Schema = mongoose.Schema

const projectSchema = new Schema (
  {
    proposer: {
      type: String,
      required: [true, '請填寫提案人']
    },
    file: {
      type: String,
      required: [true, '請填寫檔案名稱']
    },
  }
)

const projects = mongoose.model('projects', projectSchema)

export default projects