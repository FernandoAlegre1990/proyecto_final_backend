import userModel from '../models/userModel.js';
import { getDataUri } from '../utils/features.js';
import cloudinary from 'cloudinary'

export const registerController = async (req, res) => {
  try {
    const { name,username, email, password, address, city, country, phone, awnser } = req.body;

    if (!name || !username || !email || !password || !city || !address || !country || !phone || !awnser) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields',
      });
    }
// existing user
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'Username already exists',
      });
    }

    

    const user = await userModel.create({ name, username, email, password, address, city, country, phone, awser });
    res.status(201).send({
      success: true,
      message: 'Registration Success, please login',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in register API',
      error: err.message,
    });
  }
};

//LOGIN

export const loginController = async(req, res) =>{
    try{
        const {email, password} = req.body
        if( !email || !password){
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
                })
                }
                const user = await userModel.findOne({email})
                if(!user){
                    return res.status(404).send({
                        success: false,
                        message: 'User not found',
                        })
                        }
    //check password
    const isMatch = await user.comparePassword(password)
    //validation pass
    if(!isMatch){
        return res.status(500).send({
            success: false,
            message: 'Invalid password',
            })
            }

            // token
    const token = user.generateToken();
    res.status(200).cookie("token", token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict"
    })
    .send({
      success: true,
      message: 'Login Success',
      token,
      user
    });

  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Error in login API', 
      error: err.message
    });
  }
}

//USER PROFILE
export const getUserProfileController = async (req, res) =>{
    try {
        const user = await userModel.findById(req.user._id);
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'User Profile Fetched Successfully',
            user
            })
            } catch(err) {
                res.status(500).send({
                    success: false,
                    message: 'Error in getting user profile',
                    error: err.message
                    });
}
};


//LOGOUT

export const logoutController = async (req, res)=>{
    try {
        res.status(200).cookie("token", "",{
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "development" ? true: false,
            httpOnly: process.env.NODE_ENV === "development" ? true: false,
            sameSite: process.env.NODE_ENV === "development" ? true: false,
        }).send({
            success: true,
            message: 'Logout Success'
        })
    } catch(err) {
        res.status(500).send({
            success: false,
            message: 'Error in logout API',
            error: err.message
            })
    }
}

// UPDATE USER PROFILE
export const updateProfileController = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      const { name, email, address, city, country, phone } = req.body;
      // validation + Update
      if (name) user.name = name;
      if (email) user.email = email;
      if (address) user.address = address;
      if (city) user.city = city;
      if (country) user.country = country;
      if (phone) user.phone = phone;
      //save user
      await user.save();
      res.status(200).send({
        success: true,
        message: "User Profile Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In update profile API",
        error,
      });
    }
  };

  // update user passsword
export const udpatePasswordController = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      const { oldPassword, newPassword } = req.body;
      //valdiation
      if (!oldPassword || !newPassword) {
        return res.status(500).send({
          success: false,
          message: "Please provide old or new password",
        });
      }
      // old pass check
      const isMatch = await user.comparePassword(oldPassword);
      //validaytion
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid Old Password",
        });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In update password API",
        error,
      });
    }
  };

  export const updateProfilePicController = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      // file get from client photo
      const file = getDataUri(req.file);
      // delete prev image
      if (user.profilePic && user.profilePic.public_id) {
        await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
      }
      // update
      const cdb = await cloudinary.v2.uploader.upload(file.content);
      user.profilePic = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      // save func
      await user.save();
  
      res.status(200).send({
        success: true,
        message: "Profile picture updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in update profile pic API",
        error,
      });
    }
  };

  // FORGOT PASSWORD
export const passwordResetController = async (req, res) => {
    try {
      // user get email || newPassword || answer
      const { email, newPassword, answer } = req.body;
      // valdiation
      if (!email || !newPassword || !answer) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
      // find user
      const user = await userModel.findOne({ email, answer });
      //valdiation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "invalid user or answer",
        });
      }
  
      user.password = newPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Your Password Has Been Reset Please Login !",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In password reset API",
        error,
      });
    }
  };
  