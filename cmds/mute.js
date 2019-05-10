const Discord = require('discord.js');


const client = new Discord.Client();
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('./botsettings.json', 'utf-8'));



client.on('message', async message => {
  
  if (message.content.startsWith('r!mute ')) {
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
        if(!toMute) return message.channel.send(":exclamation: Não posso silenciar se você não me disser quem!");

        if(toMute.id === message.author.id) return message.channel.send(":x: Você não precisa fazer isso, é só parar de escrever!");
        if(toMute.highestRole.position > message.member.highestRole.position) return message.channel.send(":exclamation: Engraçadinho! Você não pode silenciar alguém com cargo superior!");

        let role = message.guild.roles.find(r => r.name === "Castigo");
        if(!role) {
        try {
            role = await message.guild.createRole({
                name: "Castigo",
                color: "##dea9de",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
         } catch(e) {
            console.log(e.stack);
          }
        }

        if(toMute.roles.has(role.id)) return message.channel.send(":no_entry_sign: Mas eu ja mutei essa pessoa...");

        await toMute.addRole(role);
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Ação | Mute', `https://images-ext-2.discordapp.net/external/Wms63jAyNOxNHtfUpS1EpRAQer2UT0nOsFaWlnDdR3M/https/image.flaticon.com/icons/png/128/148/148757.png`)
            .addField('Usuário:', `<@${user.id}>`)
            .addField('Motivo:', `${reason}`)
            .addField('Moderador:', `${mod}`)
            .setColor('#00FF80')
      		  .setFooter("Ruby-logs", "https://cdn.discordapp.com/emojis/551023291142373385.png")
        modlog.send(muteembed)
        message.channel.send(":mute: Feito!")
    
}else if(message.content == "r!mute") {
  if (!message.member.hasPermissions ('MUTE_MEMBERS')) return message.channel.send(":exclamation: HEY! não tente me enganar! você não tem permissão pra isso.")

  message.channel.send(":exclamation: Não posso silenciar se você não me disser quem!");

         }
  
  
  
  })



client.login(process.env.TOKEN);

module.exports.help = {
    name: "icon",
}