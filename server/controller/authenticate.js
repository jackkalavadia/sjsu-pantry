const { removeCase, emailValid } = require("../config/helper_functions");
//bcryptjs: storing of passwords as hashed passwords instead of plaintext
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class authenticate {

  async users(req, res) {
    try {
      let user = await userModel.find({});
      res.json({ users: user });
    } catch {
      res.status(404);
    }
  }

  async signUp(req, res) {
    let { name, email, sjsuid, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !sjsuid || !password || !cPassword) {
      error = {
        ...error,
        name: "Field must not be empty",
        sjsuid: "Field must not be empty",
        email: "Field must not be empty",
        password: "Field must not be empty",
        cPassword: "Field must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3) {
    //if entered name is not more than 2 chars
      error = { ...error, name: "The entered name must be atleast 4 characters" };
      return res.json({ error });
    } else {
      if (emailValid(email)) {
      //if entered email matched the required specifications
        name = removeCase(name);
        if ((password.length > 255) || (password.length < 8)) {
          error = {
            ...error,
            password: "Entered password doesn't meet the requirement. Please enter atleast 8 characters",
            name: "",
            email: "",
            sjsuid: "",
          };
          return res.json({ error });
        } else {
          try {
          //perform hashing and get verify the user if user exists
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "The entered email already exists. Please login.",
              };
              return res.json({ error });
            } else {
              let user = new userModel({
                name,
                email,
                sjsuid,
                password,
                userRole: 0,
              });
              user
                  .save()
                  .then((data) => {
                    return res.json({
                      success: "Successfully created the account. Please login and enjoy our services!!",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "The entered email is not valid. Please enter the right SJSU email ID",
        };
        return res.json({ error });
      }
    }
  }

  async signIn(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Please enter all the fields ",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Entered credentials are incorrect",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
              { _id: data._id, role: data.userRole },
              JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Entered credentials are incorrect",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authenticate();