const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const DataModel = require('./model');
let data = new DataModel();
let working = false;
let updated = false;

const save = function(source, id, value) {
  updated = true;
  switch(source){
    case "ecu":
      saveEcuData(id,value);
  }
  if (working) {
  } else {
    working = true;
    setInterval(doSave, parseInt(process.env.RESOLUTION));
  }
};

function saveEcuData(id, value) {
  data.ecu[id] = value;
}

function doSave() {
  if(updated){
    console.log('save data');
    data.save((err,d)=>{
      if(err){
      }else{
        console.log("data saved: " + d);
      }
    });
    data = new DataModel();
    updated = false;
  }
}

module.exports = save;
