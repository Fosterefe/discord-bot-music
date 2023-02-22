require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { DisTube } = require('distube')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.Distube = new DisTube(client, {
	leaveOnStop: true,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	leaveOnFinish: true,
})

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Start of the bot
client.once(Events.ClientReady, () => {
	console.log(`Ready! ${client.user.tag} ready to play music`);
});

// All commands in the command folder 
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.Distube.on("playSong", (queue, song) => queue.textChannel.send(
    `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
)

client.Distube.on("finish", queue => queue.textChannel.send("No more song in queue"));

client.login(process.env.DISCORD_TOKEN);

module.exports = {
	client
}