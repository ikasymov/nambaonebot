let request = require('request');

function Handler(req, config){
  this.req = req;
  this.data = req.body;
  this.event = this.data.event;
  if(!config.nambaOne || !config.token){
    throw new Error('not found nambaOne or token in configs')
  }
  this.config = config
}

Handler.prototype.sendMessage = async(message)=>{
  if(!this.chat_id){
    throw new Error('not found chat id for send message')
  }
  const data = {
    url: this.config.nambaOne + '/chats/' + this.chat_id + '/write',
    method: 'POST',
    body: {
      type: 'text/plain',
      content: message
    },
    headers: {
      'X-Namba-Auth-Token': this.config.token
    },
    json: true
  };
  return new Promise((resolve, reject)=>{
    request(data, (error, req, body)=>{
      if(error){
        this.req.end();
        reject(error)
      }
      this.req.end();
      resolve(body)
    })
  })
};

Handler.prototype.start = async()=>{
  console.log("call " + this.event + ' event')
  return;
}



function NewMessage(req, config){
  Handler.apply(this, arguments);
  this.content = this.data.content;
  this.sender_id = this.data.sender_id;
  this.chat_id = this.data.chat_id;
}
NewMessage.prototype = Object.create(Handler.prototype);
NewMessage.prototype.constructor = NewMessage;



function UserFollow(req, config){
  Handler.apply(this, arguments);
  this.sender_id = this.data.id
}
UserFollow.prototype = Object.create(Handler.prototype);
UserFollow.prototype.constructor = UserFollow;

UserFollow.prototype.start = async ()=>{
  return this.sendMessage('Hello, this ' + this.config.bot_name + 'bot')
};



function MessageUpdate(req, config){
  Handler.apply(this, arguments);
}
MessageUpdate.prototype = Object.create(Handler.prototype);
MessageUpdate.prototype.constructor = MessageUpdate;


function UserUnfollow(req, config){
  Handler.apply(this, arguments);
  this.sender_id = this.data.id
}
UserUnfollow.prototype = Object.create(Handler.prototype);
UserUnfollow.prototype.constructor = UserUnfollow;


function ChatNew(req, config){
  Handler.apply(this, arguments);
}
ChatNew.prototype = Object.create(Handler.prototype);
ChatNew.prototype.constructor = ChatNew;



module.exports = {
  'message/new': NewMessage,
  'user/follow': UserFollow,
  'message/update': MessageUpdate,
  'user/unfollow': UserUnfollow,
  'chat/new': ChatNew
}