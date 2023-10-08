const User = require("../../models/user");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const bcrypt = require('bcrypt');
const JwtService = require("../../services/JwtService");

const authController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        let access_token = null;
        try {
            let res = await User.findOne({ where: { email: email } })
            if (!res) {
                return next(CustomErrorHandler.wrongCredentials())
            }
            // compare passwords
            const match = await bcrypt.compare(password, res.password)
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials())
            }
            //genrate token
            access_token = JwtService.sign({ userId: res.userId, role: res.role });

        } catch (err) {
            return next(err)
        }
        res.json({ access_token })
    },
    register: async (req, res, next) => {
        const { firstName, lastName, email, password, confirmPassword, role } = req.body;
        let hashedPassword = null;
        if (password !== confirmPassword) {
            return next(CustomErrorHandler.passwordError('Password and Confirm Password should be same !'))
        }

        hashedPassword = await bcrypt.hash(password, 10);
        const userObj = {
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword,
            confirmPassword: hashedPassword
        }
        let access_token = null;
        try {
            let user = await User.create(userObj);
            access_token = JwtService.sign({ userId: user.userId, role: user.role })
        } catch (err) {
            return next(err)
        }

        res.json({ access_token })

    }

}
module.exports = authController;