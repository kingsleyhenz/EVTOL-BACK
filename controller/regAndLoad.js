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
      message: "An error occured",
    });
  }
};

export const loadEvtol = async (req, res) => {
  const { name, weight, code, image, carryTo } = req.body;
  const evId = req.params.id;
  try {
    //Find the EV with the given ID
    const ev = await evReg.findById(evId);
    if (!ev) {
      return res.status(404).send("EV not found");
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
    res.send(load);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
