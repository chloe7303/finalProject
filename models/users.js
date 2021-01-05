import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema (
  {
    account: {
      type: String,
      required: [true, '請填寫帳號名稱'],
      unique: true
    },
    password : {
      type: String,
      required: [true, '請設定密碼']
    },
    projects: []
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
