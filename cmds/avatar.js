const Discord = require('discord.js');


const client = new Discord.Client();
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('./botsettings.json', 'utf-8'));



client.on('message', message => {
  
  if (message.content.startsWith('r!clear ')) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":exclamation: EI! Você não pode mexer aí.");
   const args = message.content.substr("r!clearr".length)
   let messagecount = parseInt(args);
  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  }

  if (message.content === 'r!clear') {
    message.channel.send(":exclamation: Especifique quantas mensagens devem ser apagadas!")
  }
  

	 });


client.login(process.env.TOKEN);

module.exports.help = {
    name: "icon",
}