import mongoose from 'mongoose'

const doBeforeEach = async () => {
  await mongoose.connection.db.dropDatabase();
}

export { doBeforeEach }
