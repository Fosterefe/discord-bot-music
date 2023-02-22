const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('play').setDescription('Play a song').
        addStringOption(option => 
            option.setName('query').
            setDescription('Enter a song').
            setRequired(true)),
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const query = interaction.options.getString('query')

        if(!voiceChannel) return interaction.reply('You need to be in a voice channel first')

        client.Distube.play(voiceChannel, query, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        })

        interaction.reply('--------Completed---------')
        
    },
};