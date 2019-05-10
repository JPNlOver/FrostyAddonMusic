const Discordo = require('discord.js');
const client = new Discordo.Client();
const Discord = module.require("discord.js");
client.on('ready', () => {
  console.log('comando USERINFO pronto!');
});


module.exports.run = async (bot, message, args) => {
     let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("Informação do usuário")
            .setColor("#500366")
            .addField("DiscordTag", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID do usuário",message.author.id)
            .addField("Criado em", message.author.createdAt);
        
        message.channel.send({embed: embed});
}

module.exports.help = {
    name: "userinfo",
}