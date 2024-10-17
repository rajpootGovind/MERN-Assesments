
// POST localhost:8000/quizDB/auth/signup

const authController = require("../controller/auth.controller")


module.exports = (app)=>{
    app.post("/api/auth/signup", authController.signUp)

    app.post('/api/auth/signin',authController.signIn)
}


