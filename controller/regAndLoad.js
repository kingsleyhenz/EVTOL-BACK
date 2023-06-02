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
  const { name, email, weight, code, destination } = req.body;
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
    if (weight > ev.weight) {
      return res.json({
        status: "error",
        message: "Weight of load is more than the weight of the EVTOL",
      });
    }
    const load = new evload({
      name,
      email,
      weight,
      code,
      destination,
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

export const medImageUpload = async (req, res) => {
  try {
    const medToAddImg = await evload.findOne({name: req.params.name});
    console.log(medToAddImg);

    if(!medToAddImg){
      console.log('No such medication');
      return res.json({
        status: "Error",
        message: "No Such Medication",
      });
    }
    if(req.file){
      await evload.findOneAndUpdate({ name: req.params.name }, {
        $set: {
          image: req.file.path
        }
      }, {
        new: true
      });
      const ev = await evReg.findById(medToAddImg.carrier);
      console.log(ev);
      if (ev && ev.state !== "LOADED") {
        ev.state = "LOADED";
        await ev.save();
      }
      res.json({
        status: "Success",
        message: "Image Uploaded",
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error.message)
  }
}

  export const deployEv = async (req, res) => {
    const evtolName = req.params.name;
    try {
      const evtol = await evReg.findOne({ name: evtolName, state: 'LOADED' }).populate('isBooked');
      if (!evtol) {
        return res.status(404).json({
          status: 'error',
          message: `EVTOL with name ${evtolName} and state 'LOADED' not found.`,
        });
      }
      evtol.state = 'DELIVERING';
      await evtol.save();
      const userEmail = evtol.isBooked[0].email;
      const medName = evtol.isBooked[0].name;
      await sendConfirmationEmail(medName, userEmail);
      res.json({
        status: 'success',
        message: `EVTOL with name ${evtolName} has been marked as delivering. Confirmation email sent.`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while marking the EVTOL as delivering.',
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
      text: `Thank you for using our services ,\n\nThe ${name} You Requested For Is On Its Way. To track your Medication kindly use this link: http://www.linktrack.appspot.com`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};