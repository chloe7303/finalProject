import mongoose from 'mongoose'

const Schema = mongoose.Schema

const wishSchema = new Schema (
  {
    project: {
      type: mongoose.ObjectId,
      ref: 'projects'
    }
  },
  {
    versionKey: false
  }
)

const fundSchema = new Schema (
  {
    project: {
      type: mongoose.ObjectId,
      ref: 'projects'
    },
    name: {
      type: String,
      required: [true, '請填寫姓名']
      
    },
    phone: {
      type: String,
      required: [true, '請填寫連絡電話']
    },
    email: {
      type: String
    },
    fundAmount: {
      type: Number,
      required: [true, '請輸入募資金額']
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
    funds: {
      type: [fundSchema]
    },
    wishlists: {
      type: [wishSchema]
    }
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
