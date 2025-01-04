const { default: mongoose } = require("mongoose")

exports.dbConnection = () => {
  try {
    mongoose.connect(  "mongodb+srv://eventmanage:eventmanage@cluster0.2bmsu.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
      console.log("Database Connected")
    }
    )

  } catch (error) {
    console.log("something went wrong")
  }
}
