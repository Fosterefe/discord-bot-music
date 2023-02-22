const { SlashCommandBuilder, EmbedBuilder }= require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('skip').setDescription('Skip the current song'),
    async execute(interaction, client) {
        let queue = await client.Distube.getQueue(interaction)

        if (queue) {
            if(!queue.autoplay && queue.songs.length <= 1) {
                let embed = new EmbedBuilder().setTitle(`There is not next song to skip!`).setColor('Red')
                return interaction.reply({ embeds: [embed] })          
            }

            client.Distube.skip(interaction)
            let embed = new EmbedBuilder().setTitle(`Song skiped`).setColor('Orange')
            return interaction.reply({ embeds: [embed] })
        } else {
            let embed = new EmbedBuilder().setTitle(`The queue is empty!`).setColor('Red')
            return interaction.reply({ embeds: [embed] })
        }

    }
}