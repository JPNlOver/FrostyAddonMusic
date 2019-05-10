bot.on("message", message => {                          //estrutura basica para iniciar algum comando do bot, na qual "message" é a ação.
  if (message.content.startswith('~>teste')) {          //condição para o acionamento do comando, no qual se o conteúdo da mensagem começar com "~>teste"
                                                       //executará o comando que esta dentro da chave
    message.channel.send('comando **funcionando**!')   //comando basico para mandar mensagem no chat
})