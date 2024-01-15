import DevieReg from "../models/device.model.js";
import nodemailer from 'nodemailer';

export const evtolRegister = async (req, res) => {
  const { serialNo, model, weight, battery, state } = req.body;
  try {
    const presentEvtol = await DevieReg.findOne({ serialNo });
    if (!presentEvtol) {
      const evtol = DevieReg.create({
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

export const getAllEvtols = async (req, res) => {
  try {
    const evtols = await DevieReg.find({});
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


export const checkAvailableEVTOL = async (req, res) => {
  try {
    const availableEVTOL = await DevieReg.find({ state: "IDLE" });
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






export const sendConfirmationEmail = async (name, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ayehenz29@gmail.com",
        pass: "xfkpqulivwwhwisc",
      },
    });
    const mailOptions = {
      from: "ayehenz29@gmail.com",
      to: email,
      subject: "Drone On Its Way!",
      text: `Thank you for using our services ,\n\nThe ${name} You Requested For Is On Its Way. To track your Medication kindly use this link: https://www.linktrack.appspot.com`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};