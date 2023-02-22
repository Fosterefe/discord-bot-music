const { SlashCommandBuilder, EmbedBuilder }= require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('stop').setDescription('Stop the audio player'),
    async execute(interaction, client) {
        client.Distube.stop(interaction.guild.id)
 
        let embed = new EmbedBuilder().setTitle(`The audio stoped`).setColor('Blue')

        interaction.reply({ embeds: [embed] })
    }
}