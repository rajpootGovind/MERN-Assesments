const user = require("../model/user.model")

// get all users

exports.getUsers = async (req, res)=>{
    try {
        const users = await user.find()
        res.send(users)
    } catch (error) {
        res.ststus(500).send(`error during fetching users ${error}`)
    }
}

// update user 

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await user.findByIdAndUpdate(id, req.body, { new: true });
      res.json(student);
    } catch (error) {
      res.status(500).json(`error during updating users ${error}`);
    }
  };

  // Delete user

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      await user.findByIdAndDelete(id);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json(`error during deleting users ${error}`);
    }
  };