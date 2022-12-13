const User = require("../model/UserModel");

const register = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      await User.create({
         name,
         email,
         password,
      });
      res.status(200).json({ success: true });
   } catch (error) {
      res.status(403).json({ success: false, message: error.message });
   }
};

module.exports = register;
