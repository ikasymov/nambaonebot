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
  NewMessage: events['message/new'],
  UserFollow: events['user/follow'],
  MessageUpdate: events['message/update'],
  UserUnfollow: events['user/unfollow'],
  ChatNew: events['chat/new']
}