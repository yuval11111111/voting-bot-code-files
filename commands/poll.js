const {
    GuildMember,
    PermissionsBitField,
    SlashCommandBuilder,
    MessageMentions,
    GatewayIntentBits,
    Message,
    Role,
    CategoryChannel,
    ChannelType,
    VoiceChannel,
    VoiceStateManager,
    EmbedBuilder,
    RoleManager,
    Client,
    VoiceState,
    ClientVoiceManager,
    BaseGuildVoiceChannel,
    ChannelManager,
    GuildChannel,
    GuildChannelManager,
    ThreadChannel,
    ChannelFlags,
    ClientApplication,
    ClientUser,
    Guild,
    Emoji,
    GuildEmoji,
    GuildEmojiManager,
    User,
    UserFlags,
    UserManager,
    ReactionUserManager,
    WebhookClient,
    Webhook,
    ButtonBuilder,
    ActionRowBuilder,
    ApplicationCommand,
    ApplicationCommandManager,
    GuildApplicationCommandManager,
    ApplicationCommandPermissionsManager,
    AttachmentBuilder,
    BaseGuildTextChannel,
    GuildEmojiRoleManager,
    GuildMemberManager,
    GuildMemberRoleManager,
    TextChannel,
    Collector,
    Collection,
} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-poll')
        .setDescription(`create a poll`)
        .addStringOption(option =>
            option.setName('poll_name')
            .setRequired(true)
            .setDescription('poll name'))
        .addStringOption(option =>
            option.setName('option_1')
            .setRequired(true)
            .setDescription('the first poll option'))
        .addStringOption(option =>
            option.setName('option_2')
            .setRequired(true)
            .setDescription('the second poll option'))
        .addStringOption(option =>
            option.setName('option_3')
            .setRequired(false)
            .setDescription('the third poll option'))
        .addStringOption(option =>
            option.setName('option_4')
            .setRequired(false)
            .setDescription('the fourth poll option'))
        .addStringOption(option =>
            option.setName('option_5')
            .setRequired(false)
            .setDescription('the fifth poll option'))
        .addNumberOption(option =>
            option.setName('time')
            .setDescription(`time in minutes`))
        .addStringOption(option =>
            option.setName('background_url')
            .setDescription('the background url'))
        .addStringOption(option =>
            option.setName('graph-color')
            .setDescription(`choose a graph color`)
            .addChoices({
                name: `red`,
                value: `#ff0101`
            }, {
                name: `green`,
                value: `#01ff01`
            }, {
                name: `blue`,
                value: `#0101ff`
            }, {
                name: `black`,
                value: `#121212`
            }, {
                name: `white`,
                value: `#f5f5f5`
            }))
};