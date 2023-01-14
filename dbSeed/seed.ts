import mongoose from 'mongoose'
import Users from '../models/users'
import Product from '../models/product'
import { MONGODB_URI } from '../config/environments'


function getProductsData (user:any){
  return [
  { name: '5600', price: 140, quantity:1, category: 'CPU', user, reviews:[{content: 'good performance', user}]},
  { name: '5600X', price: 170, quantity:1, category: 'CPU', user },
  { name: 'RTX 3060', price: 380, quantity:1, category: 'GPU', user },
  { name: 'RTX 3070', price: 560, quantity:1, category: 'GPU', user }
]
}

const userData = {
  username: "carlos", 
  email: "eu@eu.com",
  password: "1q2w3e4r5t6Y.",
  mobile:"07767668964",
  isSeller:true,
}

async function seed() {
  mongoose.set('strictQuery', false)
  await mongoose.connect(MONGODB_URI)
  console.log('connected')

  // await mongoose.connection.db.dropDatabase()

  const user = await Users.create(userData)
  console.log(user)
  const productData = getProductsData(user._id)
  const products = await Product.create(productData)
  console.log(products)

  await mongoose.disconnect()
  console.log('disconnected')
}

seed()