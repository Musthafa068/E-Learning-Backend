require("dotenv").config();
const users = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, res) => {
  console.log("Inside registerController",req.body);

  const {
    username,
    email,
    password,
    role,
    qualification,
    experience,
    linkedIn,
  } = req.body;
  console.log(username, email, password, role,qualification,experience,linkedIn);

  try {
    const existingUser = await users.findOne({ email });
    console.log("Existing User:", existingUser);

    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "An account with this email already exists. Please log in.",
        });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUserData = {
      username,
      email,
      password: hashedPassword,
      role,
    };
    console.log("oooooooooyyyooo",role);
    console.log(typeof role);
    

    if (role === "instructor") {

      console.log("Instructor fields missing:", qualification, experience, linkedIn);
      if (!qualification || !experience || !linkedIn) {
        return res
          .status(400)
          .json({
            message:
              "All instructor fields (qualification, experience, LinkedIn) are required!",
          });
      }
      newUserData.qualification = qualification;
      newUserData.experience = experience;
      newUserData.linkedIn = linkedIn;
    }
    console.log("pppppppppppppppppppppppppppp",newUserData);
    

    const newUser = new users(newUserData);
    console.log("9999999999999999999",newUser);

    await newUser.save();
    return res
      .status(200)
      .json({ message: "Registration successful!", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({
        message:
          "An error occurred during registration. Please try again later.",
      });
  }
};

exports.userLogin = async (req, res) => {
  console.log("in login ccontroller",req.body);
  
  const {email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    console.log("mmmmmmmmmmmmmmmmmmmm",existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      process.env.JWT_PASSWORD,
      { expiresIn: "2h" }
    );

    console.log("existingUser", existingUser,token);
    
    res.status(200).json({ user: existingUser, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
