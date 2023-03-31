const { User } = require("../../schemas/userSchema");

const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`User with ${email} already exist`);
    }

    const verificationToken = nanoid();
    const avaUrl = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const mail = {
      to: email,
      subject: "Succses",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Press link to accept</a>`,
    };

    await sendEmail(mail);

    const result = await User.create({
      name,
      email,
      password: hashPassword,
      avaUrl,
      verificationToken,
    });
    res.status(201).json({
      status: "succses",
      code: 201,
      data: {
        user: {
          email,
          name,
          avaUrl,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
