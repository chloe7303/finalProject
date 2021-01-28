import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const projectImageSchema = new Schema (
//   {
//     file: {
//       type: String
//     }
//   }
// )
const msgBoardSchema = new Schema (
  {
    user: {
      type: mongoose.ObjectId,
      ref: 'users'

    },
    message: {
      type: String,
      required: [true, '請輸入留言']
    },
    date: {
      type: Date
    }
  }
)

const projectSchema = new Schema (
  {
    user: {
      type: mongoose.ObjectId,
      ref: 'users'
    },
    title: {
      type: String,
      required: [true, '請填寫標題名稱'],
      minlength: [4 , '請輸入 4 個字以上'],
      maxlength: [15 , '請輸入 15 個字以下']
    },
    subtitle: {
      type: String,
      maxlength: [50 , '請輸入 50 個字以下']
    },
    proposer: {
      type: String,
      required: [true, '請填寫提案人']
    },
    description: {
      type: String,
      required: [true, '請填寫計畫說明'],
      maxlength: [300, '請輸入 300 字以下']
    },
    targetAmount: {
      type: Number,
      required: [true, '請填寫募資金額']
    },
    raisedAmount: {
      type: Number,
      default: 0
    },
    begin: {
      type: Date,
      required:[true, '請輸入開始日期']
    },
    finish: {
      type: Date,
      required:[true, '請輸入結束日期']
    },
    success: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      required: [true, '請上傳圖片']
    },
    msgBoard: {
      type: [msgBoardSchema]
    }
  },
  {
    versionKey: false
  }
)

const projects = mongoose.model('projects', projectSchema)

export default projects