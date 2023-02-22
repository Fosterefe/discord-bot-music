const { SlashCommandBuilder, EmbedBuilder }= require('discord.js')
const { RepeatMode } = require('distube')

module.exports = {
    data: new SlashCommandBuilder().setName('previous').setDescription('Play previous song'),
    async execute(interaction, client) {
        let queue = await client.Distube.getQueue(interaction)
        
        if(!queue || queue.previousSongs.length === 0) {
            let embed = new EmbedBuilder().setTitle(`There are no previous songs!`).setColor('Red')
            interaction.reply({ embeds: [embed] })
        } else {
            client.Distube.previous(interaction)
            let embed = new EmbedBuilder().setTitle(`Playing previous song`).setColor('Orange')
            interaction.reply({ embeds: [embed] })
        }
 
        /*try {
            client.Distube.previous(interaction)
            let embed = new EmbedBuilder().setTitle(`Playing previous song`).setColor('Orange')
            interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.error(err)
            let embed = new EmbedBuilder().setTitle(`There is no previous song in this queue`).setColor('Orange')
            interaction.reply({ embeds: [embed] })
        }*/
    }
}