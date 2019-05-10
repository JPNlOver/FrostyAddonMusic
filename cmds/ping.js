const Discord = require('discord.js');


const client = new Discord.Client();
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('./botsettings.json', 'utf-8'));


const token = 'NTE0OTA2MTY0Mjg3MzczMzEz.D29f-w.0vfi4B_0MywKoVPgzAYrYjGXrKc';



client.on('message', message => {

  if (message.content === 'r!ping') {

   let start = Date.now(); message.channel.send(message.channel.id, 'Pong! ').then(message => { 
    let diff = (Date.now() - start); 
    let API = (client.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor(0xff2f2f)
        .addField("📶 Latencia", `${diff}ms`, true)
        .addField("💻 Host", `${API}ms`, true)
        message.edit(embed);
      
    });

}
  
});


client.login(process.env.TOKEN);

module.exports.help = {
    name: "icon",
}