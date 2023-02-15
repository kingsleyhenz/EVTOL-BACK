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


export const getUserMedications = async (req, res) => {
  try {
    const loads = await evload.find({ image: { $ne: null } });
    if (loads.length === 0) {
      return res.json({
        status: "error",
        message: "No loads with image uploaded",
      });
    }
    // Update evReg state to LOADED for each load with image uploaded
    // for (const load of loads) {
    //   if (load.carrier) {
    //     const ev = await evReg.findById(load.carrier);
    //     if (ev && ev.state !== "LOADED") {
    //       ev.state = "LOADED";
    //       await ev.save();
    //     }
    //   }
    // }
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
        serialNo: ev.serialNo,
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
