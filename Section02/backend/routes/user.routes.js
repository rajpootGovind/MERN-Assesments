const userContoller = require('../controller/user.controller')
 
module.exports = (app)=>{
    app.get("/api/user", userContoller.getUsers)
    app.put("/api/user/:id",userContoller.updateUser)
    app.delete("/api/user/:id", userContoller.deleteUser)
}