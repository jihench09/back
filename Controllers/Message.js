const Message = require("../Models/Message")
const User = require("../Models/User")

exports.addMessa=async(req,res)=>{
    try {
         const { name, email, subject, message } = req.body
        if (!email || !subject || !message ||!name) {
            return res.status(400).send({ errors: [{ msg: "name, subject, email and message are obligatory " }] })
        }

        const found= await User.findOne({email})

        if (!found) {
            return res.status(400).send({ errors: [{ msg: "You must have account" }] })
        }
        if (found.role==='admin' || found.role==='super-admin') {
            return res.status(400).send({ errors: [{ msg:'you are admin you can t send message' }] })
        }

        const newMessage= new Message(req.body)
        await newMessage.save()

        res.status(200).send({msg:'message added', newMessage})



    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not add Message " }] });
    }
}

exports.getMessa=async(req,res)=>{
    try {
        const found= await Message.find()
        res.status(200).send({msg:'Messages are',found})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not get Message " }] });
    }
}

exports.getMessUser=async(req,res)=>{
    try {
        const email=req.User.email
        const found= await Message.find({email})
        res.status(200).send({msg:'Messages are',found})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not get user Message " }] });
    }
}

exports.upMess=async(req,res)=>{
    try {
        const {id}=req.params
        const {status}=req.body
        const updated= await Message.findByIdAndUpdate(id,{$set:{status}})
        res.status(200).send({msg:'updated',updated});
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not Update this Message " }] });
    }
}

exports.delMess=async(req,res)=>{
    try {
        const {id}=req.params
        await Message.findByIdAndDelete(id)
        res.status(200).send({ errors: [{ msg: "Message deleted" }] });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not delete this Message " }] });
    }
}

exports.addRep=async(req,res)=>{
    try {
                const {id}=req.params
                const {reply}=req.body
                const updated= await Message.findByIdAndUpdate(id,{$set:{reply}})
                res.status(200).send({msg:'updated',updated});
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not add response " }] });
    }
}