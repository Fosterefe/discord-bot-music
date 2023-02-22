const { SlashCommandBuilder, EmbedBuilder }= require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('queue').setDescription('The queue'),
    async execute(interaction, client) {
        let queue = await client.Distube.getQueue(interaction)
        let embed;

        if(!queue) {
            embed = new EmbedBuilder().setTitle('There are no songs in the queue yet!').setColor('Red')
            return interaction.reply({ embeds: [embed] })
        }

        let songs =  queue.songs.map((song, id) =>
        `**${id+1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")

        embed = new EmbedBuilder().setTitle(songs).setColor('Green')
        
        interaction.reply({ embeds: [embed] })
    }
}