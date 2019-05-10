const filter = (reaction, user) => {
    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
   message.channel.send (message.author + 'Você deseja usar o item **Descrição** ?')
      .then(function (message) {
      message.react('👍').then(() => message.react('👎'));
     message.awaitReactions(filter, { max: 1, time: 59900, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '👍') {
          
            if (descint > 0) {
            
                
            user2.send ('Por favor, digite o que será inserido em sua descrição:')
  .then((newmsg) => { //Now newmsg is the message you sent
    newmsg.channel.awaitMessages(response => response.content, {
      max: 1,
      time: 50000,
      errors: ['time'],
    }).then((collected) => {
      
      var cf = collected.first().content
     // console.log (cf)
     // guild.send(userid + " " + cf)
      
      var sqlcompleta = "UPDATE `xpdb`.`xp` SET `desc` = '" + cf + "' WHERE `id` = '" + userid + "';"
  console.log('a sql em execução é ' + sqlcompleta)
    con.query(sqlcompleta, function (err, result) {
    if (err) throw err;
    
    console.log("Result: " + result);
      })
      
      newmsg.channel.send(`Sua descrição foi arquivada! Por favor cheque seu perfil.`);
      