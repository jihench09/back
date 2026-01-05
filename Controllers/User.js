const User = require("../Models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require("../config/Mailer");
const Panier = require("../Models/Panier");
const crypto = require("crypto");


exports.SignUp = async (req, res) => {
    try {
        const { email, password } = req.body

        const found = await User.findOne({ email })
        if (found) {
            return res.status(400).send({ errors: [{ msg: 'Email already exists' }] })
        }

        const newUser = new User(req.body)

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)

        newUser.password = hashedPassword

        await newUser.save()

        const panier = new Panier({ items: [], user: newUser._id })

        await panier.save()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: "Welcome to PrettyShop 🎉",
            text: `Hello ${newUser.name}, your account has been created successfully.`,

        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error sending email:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });


        const payload = { id: newUser._id }

        const token = jwt.sign(payload, process.env.privatekey)

        res.status(200).send({ msg: "sucess sign up", newUser, token })




    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot Sign Up" }] })
    }
}



exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const found = await User.findOne({ email })

        if (!found) {
            return res.status(400).send({ errors: [{ msg: 'Email does not exist' }] })
        }


        const matched = bcrypt.compareSync(password, found.password)
        if (!matched) {
            return res.status(400).send({ errors: [{ msg: 'Verify your Pass or Email' }] })
        }

        const payload = { id: found._id }
        const token = jwt.sign(payload, process.env.privatekey)
        res.status(200).send({ msg: "sucess sign up", found, token })




    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot Sign In" }] })
    }
}



exports.UpdateUser = async (req, res) => {
    try {
        const { id } = req.params


        const found = await User.findOne({ email: req.body.email })
        if (found && id !== found._id.toString()) {
            return res.status(400).send({ errors: [{ msg: "email exists " }] })
        }
       
        if (req.body.role) {
            return res.status(400).send({ errors: [{ msg: " error role " }] })
        }



        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body })


        res.status(200).send({ msg: "user updated", updatedUser })


    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot Update User" }] })
    }
}


exports.updatePass = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({ errors: [{ msg: "User not found" }] });
        }

        const matched = bcrypt.compareSync(req.body.currentPassword, user.password)
        if (!matched) {
            return res.status(400).send({ errors: [{ msg: 'wrong password' }] })
        }

        if (req.body.confirmPassword) {
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(req.body.confirmPassword, salt)

            req.body.confirmPassword = hashedPassword
        }
        const found = await User.findByIdAndUpdate(id, { $set: { password: req.body.confirmPassword } })
        res.status(200).send({ msg: "Pass updated", found })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot Update Password" }] })
    }
}





exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(200).send({ msg: 'user deleted' })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot delete user" }] })
    }
}


exports.allusers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send({ msg: 'list users', users })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot Update User" }] })
    }
}


exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        const foundPanier = Panier.findOne({ user: id })
        await Panier.findByIdAndDelete(foundPanier._id)
        res.status(200).send({ msg: " Client Deleted" })

    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot Delete Client" }] })
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const { email } = req.body
        const found = await User.findOne({ email })
        if (!found) {
            return res.status(400).send({ errors: [{ msg: "user not found" }] })
        }
        if (found.role==='admin' || found.role==='super-admin') {
            return res.status(400).send({ errors: [{ msg: "this account is already admin account" }] })
        }


        const password = crypto.randomBytes(8).toString("hex")
       
        const saltRounds=10
        const salt=bcrypt.genSaltSync(saltRounds)
        const hashed=bcrypt.hashSync(password,salt)
        found.password=hashed
        await found.save()

        const newAdmin = await User.findByIdAndUpdate(found._id, { $set: { role: 'super-admin' } })

        const mailOptions = {
            from: process.env.EMAIL_USER,           
            to: found.email,                       
            subject: "PrettyShop – Admin access created 🎉",
            text: `Hello ${found.name || "Admin"},

You have been granted admin access on PrettyShop.

Here is your temporary password: ${password}

For security reasons, please log in to your account and change this password as soon as possible from your profile page.

PrettyShop team 💖`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error sending admin email:", err);
            } else {
                console.log("Admin email sent:", info.response);
            }
        })

        res.status(200).send({ msg: 'admin added', newAdmin })




    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot add this user as admin" }] })
    }
}


exports.getAdmin=async(req,res)=>{
    try {
        const admins= await User.find({role:'super-admin'}).select('-password')
        res.status(200).send({msg:'admin',admins})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot find admin" }] })
    }
}

exports.deleteAdmin=async(req,res)=>{
    try {
        const {id}=req.params
        await User.findByIdAndDelete(id)
res.status(200).send({ msg: " admin deleted" })
        
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "cannot delete this admin" }] })
    }
}