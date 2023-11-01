const User = require("../../models/user");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const bcrypt = require('bcrypt');
const JwtService = require("../../services/JwtService");

const authController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        if (email.trim() === "" || password.trim() === "" || !email || !password) {
            return res.status(400).json({ message: "fields missing" });
        }
        let authorization = null;
        try {
            let user = await User.findOne({ where: { email: email } });
            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            // Compare passwords
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            // Generate token
            authorization = JwtService.sign({ userId: user.userId, role: user.role ,isActive:user.isActive});
            res.json({ Authorization: authorization });
        } catch (err) {
            return next(err);
        }
    },
    
    register: async (req, res, next) => {
        const {email,name, password, confirmPassword,phone,address,area,zip, role,isActive } = req.body;
        let hashedPassword = null;
        if (password !== confirmPassword) {
            return next(CustomErrorHandler.passwordError('Password and Confirm Password should be same !'))
        }

        hashedPassword = await bcrypt.hash(password, 10);
        const userObj = {
            
            email,
            name,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            phone,
            address,
            area,
            zip,
            role,
            isActive:false
        }
        let Authorization = null;
        try {
            let user = await User.create(userObj);
            Authorization = JwtService.sign({ userId: user.userId, role: user.role ,isActive:isActive})
        } catch (err) {
            return next(err)
        }

        res.json({ Authorization })

    }

}
module.exports = authController;