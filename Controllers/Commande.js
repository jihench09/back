const Commande = require("../Models/Commande");
const Panier = require("../Models/Panier");
const transporter = require("../config/mailer");

exports.updatedStatus= async (req, res) => {
    const { updating ,commentaire} = req.body;
    const {OrderId}=req.params


    const newStatus =
        updating === "yes" ? "accepted" :
            updating === "no" ? "rejected" : null;

    if (!newStatus) {
        return res
            .status(400)
            .send({ errors: [{ msg: "Invalid updating value" }] });
    }

    try {
        const updatedOrder = await Commande.findByIdAndUpdate(
            OrderId,
            { $set: { status: newStatus ,commentaire } },

        );

        if (!updatedOrder) {
            return res
                .status(404)
                .send({ errors: [{ msg: "Order not found" }] });
        }

        res.status(200).send({ msg: "status updated", order: updatedOrder });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not update status " }] });
    }
}

exports.getAllOrdors=async (req, res) => {
    try {
        const ordors = await Commande.find()
            .populate('items.product')
            .populate('user', 'name email phone adress')
        res.status(200).send({ msg: 'ordors', ordors })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'can not get  all Orders ' }] });
    }
}


exports.getOneOrder= async (req, res) => {
    try {
        const oneOrder = await Commande.find({ user: req.User._id }).populate('items.product')
        res.status(200).send({ msg: 'order', oneOrder })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'can not get  One Order ' }] });
    }
}

exports.addOrder=async (req, res) => {
    try {
        const panier = await Panier.findOne({ user: req.User._id });
        if (!panier || !panier.items || panier.items.length === 0) {
            return res
                .status(400)
                .send({ errors: [{ msg: 'Panier vide ou introuvable' }] });
        }

        const order = new Commande({
            items: panier.items,
            user: req.User._id,
        });


        await order.save();

        await Panier.findByIdAndUpdate(panier._id, { $set: { items: [] } });
    const user=req.User
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "PrettyShop – Order confirmed 🎉",
      text: `Hello ${user.name}, your order has been added successfully. 
Check your account within 24 hours on our website to see your updated order status.`,
   
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

        res.status(200).send({ msg: 'order added', order });
    } catch (error) {

        res.status(500).send({ errors: [{ msg: 'cannot Update Order ' }] });
    }
}