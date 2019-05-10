const { Client, Util } = require('discord.js');
const TOKEN = "NTc1MTIzODM4OTk2NzA5Mzg4.XNDfXg.hebU9ulJyFYGKHJt7WG9WVUQur4"
const PREFIX = "f!"
const GOOGLE_API_KEY = "AIzaSyCqOlLHVGnTRRpknv5rqPOxd5Zz1tyhbDU"

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line
  var Equestion = await client.emojis.get("575458665604055044"),
      Eupset = await client.emojis.get("575458652459368450"),
      Esad = await client.emojis.get("575458589972627487"),
      Ebored = await client.emojis.get("575458655458033667"),
      Ejoia = await client.emojis.get("575458621891018763"),
      Eboxexa = await client.emojis.get("575458590928666664"),
      Ehello = await client.emojis.get("575458649229492245"),
      Echoro = await client.emojis.get("575458620095856655"),
      Etired = await client.emojis.get("575458642732646400")
      
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
    if(msg.content === "f!play") return msg.channel.send(Equestion + ' Gostaria de que eu procurasse por "nada"?');
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(Equestion + ' Desculpe, mas você tem certeza de que está em um canal de voz?');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(Esad + ' Não me permitem entrar nesse canal... Desculpe.');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send(Esad + ' Não me permitem falar nesse canal... Desculpe.');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`${Ejoia} Playlist: **${playlist.title}** Foi adicionada na fila!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          if (videos.length < 1) return msg.channel.send(Eupset + ' E-eu não conseguí encontrar nenhum resultado... Me desculpe.');
					msg.channel.send(`
__**Seleção de Video:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

**Por favor, selecione um dos resultados me dando um numero de 1-10.**
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 20000,
							errors: ['time']
						});  
					} catch (err) {
						console.error(err);
						return msg.channel.send(Equestion + ' Gostaria de que eu procurasse por "nada"?');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(Eupset + ' Acho que eu estou com algum problema... Eu realmente não sei o que é.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send(Ebored + ' Você precisa estar em algum canal de voz para eu poder pular...');
		if (!serverQueue) return msg.channel.send(Eupset +' M-mas não tem nada tocando, não posso pular para você.');
		serverQueue.connection.dispatcher.end(Ejoia +' Ok. Proxima!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send(Eupset +' M-mas você não está em um canal de voz! não posso parar.');
		if (!serverQueue) return msg.channel.send(Equestion + ' Como posso parar algo que ja está parado?');
		serverQueue.songs = [];
    msg.channel.send(Ejoia + 'Ótimo! vou parar para você.');
		serverQueue.connection.dispatcher.end(Ejoia + ' Ótimo! vou parar para você.');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send(Eboxexa + ' Você não está em um canal de voz, é por isso que não me escuta!');
		if (!serverQueue) return msg.channel.send(Eupset + ' M-mas não tem nada tocando!');
		if (!args[1]) return msg.channel.send(`O volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`${Equestion} Está me escutando direito? vou alterar o volume para: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send(Equestion + ' M-mas não tem nada tocando!');
		return msg.channel.send(`🎶 Estou tocando: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send(Equestion + ' M-mas não tem nada tocando!');
		return msg.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Agora estou tocando:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Ó-ótimo! vou pausar para você.');
		}
		return msg.channel.send('M-mas não tem nada tocando!');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send(Etired + ' Hã? já posso continuar?');
		}
		return msg.channel.send(Equestion + ' M-mas não tem nada tocando!');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  var Equestion = await client.emojis.get("575458665604055044"),
      Eupset = await client.emojis.get("575458652459368450"),
      Esad = await client.emojis.get("575458589972627487"),
      Ebored = await client.emojis.get("575458655458033667"),
      Ejoia = await client.emojis.get("575458621891018763"),
      Eboxexa = await client.emojis.get("575458590928666664"),
      Ehello = await client.emojis.get("575458649229492245"),
      Echoro = await client.emojis.get("575458620095856655"),
      Etired = await client.emojis.get("575458642732646400")
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(Esad + ` E-eu não pude entrar no canal de voz: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`${Ejoia} Eu adicionei **${song.title}** para a fila!`);
	}
	return undefined;
}

async function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
var Equestion = await client.emojis.get("575458665604055044"),
      Eupset = await client.emojis.get("575458652459368450"),
      Esad = await client.emojis.get("575458589972627487"),
      Ebored = await client.emojis.get("575458655458033667"),
      Ejoia = await client.emojis.get("575458621891018763"),
      Eboxexa = await client.emojis.get("575458590928666664"),
      Ehello = await client.emojis.get("575458649229492245"),
      Echoro = await client.emojis.get("575458620095856655"),
      Etired = await client.emojis.get("575458642732646400")

	serverQueue.textChannel.send(`${Ehello} Agora irei tocar: **${song.title}**`);
}

client.login(TOKEN);
