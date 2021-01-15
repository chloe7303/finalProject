import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const projectImageSchema = new Schema (
//   {
//     file: {
//       type: String
//     }
//   }
// )
const projectSchema = new Schema (
  {
    user: {
      type: String,
      // ref: 'users',
      required: true
    },
    title: {
      type: String,
      required: [true, '請填寫標題名稱'],
      minlength: [4 , '請輸入 4 個字以上'],
      maxlength: [10 , '請輸入 10 個字以下']
    },
    subTitle: {
      type: String,
      maxlength: [50 , '請輸入 50 個字以下']
    },
    proposer: {
      type: String,
      required: [true, '請填寫提案人']
    },
    description: {
      type: String,
      maxlength: [300, '說明必須 300 字以下']
    },
    targetAmount: {
      type: Number,
      required: [true, '請填寫募資金額']
    },
    raisedAmount: {
      type: Number,
      default: 0
    },
    success: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      required: [true, '請上傳圖片']
    }
  },
  {
    versionKey: false
  }
)

const projects = mongoose.model('projects', projectSchema)

export default projects