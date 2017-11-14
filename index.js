let events = require('./Hanlder');

module.exports = {
  start: async (req)=>{
    try{
      let eventsObject = new events[req.body.event](req);
      return await eventsObject.start();
    }catch(e){
      console.log(e);
      throw e
    }
  },
}