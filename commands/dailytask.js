const {SlashCommandBuilder} = require('discord.js');
const { data } = require('./ping');
const Cerebras = require('@cerebras/cerebras_cloud_sdk');
const config = require('../config');

const cerebras = new Cerebras({
        apiKey: config.cerebras_api_key,
        });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailytask')
        .setDescription("Replies with today's daily task"),
    async execute(interaction) {
        await interaction.deferReply(); // So the bot doesn’t time out while streaming

        const stream = await cerebras.chat.completions.create({
            messages: [
                { role: "system", content: "You're a helpful assistant that provides daily javascript tasks for users." },
                { role: "user", content: "What is today's daily task?" }
            ],
            model: 'gpt-oss-120b',
            stream: true,
            max_completion_tokens: 65536,
            temperature: 1,
            top_p: 1
        });

        let content = '';
        for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            content += text;

            // Optional: Edit message as it streams (rate-limit safe)
            if (content.length % 50 === 0) { 
                await interaction.editReply(content);
            }
        }

        // Final update once stream ends
        await interaction.editReply(content);
    }
};