import evReg from "../models/evtolReg.js";
import evload from "../models/loadModel.js";


export const evtolRegister = async(req,res)=>{
    const{serialNo, model, weight, battery, state} = req.body;
    try {
        const presentEvtol = await evReg.findOne({serialNo})
        if (!presentEvtol) {
            const evtol = evReg.create({
                serialNo,
                model,
                weight,
                battery,
                state
            })
            res.json({
                status:"Success",
                data: evtol
            })
    }else{
        res.json({
            status:"error",
            message:"This EVTOL Has Already been Registered"
    })
}
    } catch (error) {
        console.log(error);
        res.json({
        status: error,
        message: "An error occured"
      })
    }
}