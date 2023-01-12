const orderModel = require("../models/orders");

class Order {

  async userOrder(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "Id is missing" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async orderCreate(req, res) {
    let { prod, user } = req.body;
    if (
      !prod ||
      !user
    ) {
      return res.json({ message: "Please fill all the fields." });
    } else {
      try {
        let order = new orderModel({
          prod,
          user
        });

        let save = await order.save();
        if (save) {
          return res.json({ success: "Your order was placed successfully." });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async updateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "all the fields are not coming " });
    } else {
      let currentOrder = orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentOrder.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "The order was updated" });
      });
    }
  }

  async allOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async orderDelete(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "send oid." });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "The selected order was deleted successfully." });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = new Order();
