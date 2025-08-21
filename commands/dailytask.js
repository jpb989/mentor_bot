const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const Cerebras = require('@cerebras/cerebras_cloud_sdk');
const config = require('../config');
const { dailyTaskSysPrompt, dailyTaskUserPrompt } = require('../prompts/dailytaskPrompt.js');

const cerebras = new Cerebras({
    apiKey: config.cerebras_api_key,
});

const proficiencyLevels = {
    beginner: {
        label: 'Beginner',
        description: 'New to JavaScript - basic syntax and concepts',
        value: 'beginner'
    },
    intermediate: {
        label: 'Intermediate', 
        description: 'Comfortable with JS fundamentals - functions, objects, DOM',
        value: 'intermediate'
    },
    advanced: {
        label: 'Advanced',
        description: 'Experienced with complex concepts - async, frameworks, patterns',
        value: 'advanced'
    },
    expert: {
        label: 'Expert',
        description: 'Mastery level - algorithms, performance, advanced patterns',
        value: 'expert'
    }
};

async function generateDailyTask(proficiencyLevel) {
    const sysPrompt = dailyTaskSysPrompt(proficiencyLevel);
    const userPrompt = dailyTaskUserPrompt(proficiencyLevel);

    const stream = await cerebras.chat.completions.create({
        messages: [
            { role: "system", content: sysPrompt },
            { role: "user", content: userPrompt }
        ],
        model: 'gpt-oss-120b',
        stream: true,
        max_completion_tokens: 500,
        temperature: 1,
        top_p: 1
    });

    let content = '';
    for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        content += text;
    }

    return content.trim() || "No response received.";
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailytask')
        .setDescription("Get a JavaScript daily task based on your proficiency level"),
    
    async execute(interaction) {
        // Create the select menu for proficiency levels
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('proficiency_select')
            .setPlaceholder('Choose your JavaScript proficiency level...')
            .addOptions(
                Object.values(proficiencyLevels).map(level => 
                    new StringSelectMenuOptionBuilder()
                        .setLabel(level.label)
                        .setDescription(level.description)
                        .setValue(level.value)
                )
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Send initial message with select menu (ephemeral recommended)
        await interaction.reply({
            content: '🎯 **JavaScript Daily Task Generator**\n\nPlease select your current JavaScript proficiency level to get a personalized task:',
            components: [row],
            ephemeral: true
        });

        // Create a collector on the interaction, not the channel
        const message = await interaction.fetchReply();
        const collector = message.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000,
            filter: i => i.user.id === interaction.user.id
        });

        collector.on('collect', async (selectInteraction) => {
            const selectedLevel = selectInteraction.values[0];
            const levelInfo = proficiencyLevels[selectedLevel];

            // Acknowledge the selection and show loading
            await selectInteraction.update({
                content: `🔄 Generating a **${levelInfo.label}** level JavaScript task for you...`,
                components: []
            });

            try {
                // Generate the task based on selected proficiency
                const taskContent = await generateDailyTask(selectedLevel);
                
                // Format the final response
                let finalContent = `🎯 **Daily JavaScript Task - ${levelInfo.label} Level**\n\n${taskContent}`;
                
                // Ensure content fits Discord's message limit
                if (finalContent.length > 2000) {
                    finalContent = finalContent.slice(0, 1997) + "...";
                }

                await selectInteraction.editReply({
                    content: finalContent,
                    components: []
                });

                console.log(`Generated ${selectedLevel} task for ${interaction.user.tag}`);
            } catch (error) {
                console.error('Error generating daily task:', error);
                await selectInteraction.editReply({
                    content: '❌ Sorry, there was an error generating your daily task. Please try again later.',
                    components: []
                });
            }
            collector.stop();
        });

        collector.on('end', async (collected, reason) => {
            if (collected.size === 0) {
                await interaction.editReply({
                    content: '⏰ Selection timed out. Please run the command again to get your daily task.',
                    components: []
                }).catch(() => {});
            }
        });
    }
};
