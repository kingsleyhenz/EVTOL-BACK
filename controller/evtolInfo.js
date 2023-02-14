import evReg from "../models/evtolReg.js";
import evload from "../models/loadModel.js";


export const getAllEvtols = async (req, res) => {
  try {
    const evtols = await evReg.find({});
    res.json({
      status: "Success",
      data: evtols,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: error,
      message: error.message,
    });
  }
};


export const checkLoadForParticularEV = async (req, res) => {
  try {
    const evId = req.params.id;
    const ev = await evReg.findById(evId);
    if (!ev) {
      return res.json({
        status: "error",
        message: "EV not found",
      });
    }
    const loads = await evload.find({ carrier: evId });
    if (!loads) {
      return res.json({
        status: "error",
        message: "No Loads for this EVtol",
      });
    }
    res.json({
        status: "success",
        data: loads,
    });
  } catch (error) {
    res.json({
        status: "error",
        message: error.message,
    });
  }
};

export const checkAvailableEVTOL = async (req, res) => {
  try {
    const availableEVTOL = await evReg.find({ state: "IDLE" });
    if (!availableEVTOL) {
      return res.json({
        status:"Failed",
        message:"No available EVTOL found"
      });
    }
    res.json({
        status:"success",
        data:availableEVTOL
    });
  } catch (error) {
    res.json({
        status: "error",
        message: error.message,
    });
  }
};

export const batteryLevel = async (req, res) => {
  try {
    const evId = req.params.id;
    const ev = await evReg.findById(evId);
    if (!ev) {
      return res.json({
        status: "error",
        message: "EV not found",
      });
    }
    res.json({
      status: "success",
      data: {
        batteryLevel: ev.battery,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
