const mongoose = require('mongoose');
const dataSquema = mongoose.Schema(
  {
    d: {type: String},
    ecu: {
      time: {type: Number},
      speed: {type: Number},
      ign_angle: {type: Number},
      FR_lambda_target: {type: Number},
      lambda_1: {type: Number},
      map: {type: Number},
      ect: {type: Number},
      iat: {type: Number},
      bap: {type: Number},
      tp_main: {type: Number},
      bat_voltage: {type: Number},
      stuff: {type: Number},
    },
    wfl: {
      //Wheel front left
      time: {type: Number},
      speed: {type: Number},
    },
    wfr: {
      //Wheel front right
      time: {type: Number},
      speed: {type: Number},
    },
    wbl: {
      //Wheel back left
      time: {type: Number},
      speed: {type: Number},
    },
    wbr: {
      //Wheel back right
      time: {type: Number},
      speed: {type: Number},
    },
  },
  {timestamps: {createdAt: 'created', updatedAt: 'updated'}}
);
module.exports = mongoose.model('data', dataSquema);
