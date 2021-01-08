import mongoose from 'mongoose'

const Schema = mongoose.Schema

const FundRecordSchema = new Schema (
  {
    project: {
      type: mongoose.ObjectId,
      ref: 'projects'
    },
    name: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    fundAmount: {
      type: Number
    }
  },
  {
    versionKey: false
  }
)

const userSchema = new Schema (
  {
    account: {
      type: String,
      minlength: [4 , '請輸入 4 個字以上'],
      required: true,
      unique: true
    },
    password : {
      type: String,
      minlength: [6 , '請輸入 6 個字以上'],
      required: true
    },
    fundRecords: {
      type: [FundRecordSchema]
    },
    wishlists: {
      type: []
    }
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
