import evReg from "../models/evtolReg.js";
import evload from "../models/loadModel.js";

export const evtolRegister = async (req, res) => {
  const { serialNo, model, weight, battery, state } = req.body;
  try {
    const presentEvtol = await evReg.findOne({ serialNo });
    if (!presentEvtol) {
      const evtol = evReg.create({
        serialNo,
        model,
        weight,
        battery,
        state,
        isBooked: [],
      });
      res.json({
        status: "Success",
        data: evtol,
      });
    } else {
      res.json({
        status: "error",
        message: "This EVTOL Has Already been Registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: error,
      message: error.message,
    });
  }
};

export const loadEvtol = async (req, res) => {
  const { name, weight, code, image, carryTo } = req.body;
  const serialNo = req.params.serialNo;
  try {
    const ev = await evReg.findOne({ serialNo });
    if (!ev) {
      return res.json({
        status: "error",
        message: "Error in Loading",
      });
    }
    if (ev.state !== "IDLE") {
      return res.json({
        status: "error",
        message: "This EVTOL has already been booked.",
      });
    }
    const load = new evload({
      name,
      weight,
      code,
      image,
      carryTo,
      carrier: ev._id,
    });
    await load.save();
    ev.isBooked.push(load._id);
    ev.state = "LOADING";
    await ev.save();
    res.json({
      status: "Success",
      data: load,
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: error.message,
    });
  }
};
