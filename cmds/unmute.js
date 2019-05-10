const Discord = require('discord.js');


const client = new Discord.Client();
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('./botsettings.json', 'utf-8'));



client.on('message', async message => {
  if (message.content.startsWith('r!unmute ')) {
    const mod = message.author
    const modlog = message.guild.channels.find(channel => channel.name === 'mod-logs');
    const user = message.mentions.members.first()
    var str = message.content
    var lixo = str.split(message.mentions.members.first()).pop()
    
    var reason = lixo;
    if(reason == "") {
      reason = "Nenhum"
       }
  if (!message.member.hasPermissions ('MUTE_MEMBERS')) return message.channel.send(":exclamation: HEY! não tente me enganar! você não tem permissão pra isso.")

     let toMute = message.guild.member(message.mentions.users.first());
        if(!toMute) return message.channel.sendMessage(":exclamation: Não posso fazer nada se você não me disser com quem!");

        let role = message.guild.roles.find(r => r.name === "Castigo");

        if(!role || !toMute.roles.has(role.id)) return message.channel.send(":exclamation: Mas eu não silenciei essa pessoa...");

        await toMute.removeRole(role);
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Ação | UnMute', `https://images-ext-2.discordapp.net/external/wKCsnOcnlBoNk-__BXsd6BrO6YddfUB-MtmaoaMxeHc/https/lh3.googleusercontent.com/Z5yhBQBJTSJVe5veJgaK-9p29hXm7Kv8LKF2oN0hDnsToj4wTcQbirR94XVpH4Lt5a5d%3Dw300`)
            .addField('Usuário:', `<@${user.id}>`)
            .addField('Motivo:', `${reason}`)
            .addField('Moderador:', `${mod}`)
            .setColor('#00FF80')
      		  .setFooter("Ruby-logs", "https://cdn.discordapp.com/emojis/551023291142373385.png")
        modlog.send(muteembed)
        message.channel.send(":loud_sound: Feito!")
  } else if (message.content === 'r!unmute') {
    if (!message.member.hasPermissions ('MUTE_MEMBERS')) return message.channel.send(":exclamation: HEY! não tente me enganar! você não tem permissão pra isso.")

    message.channel.send(":exclamation: Não posso fazer nada se você não me disser com quem!");
  }
  
})

client.login(process.env.TOKEN);

module.exports.help = {
    name: "icon",
}