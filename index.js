const Discord = require('discord.js') //const data = require discord.js
const {
    GuildMember,
    Presence,
    Partials,
    ChatInputCommandInteraction,
    PermissionsBitField,
    SlashCommandBuilder,
    MessageMentions,
    GatewayIntentBits,
    Message,
    Role,
    CommandInteraction,
    CategoryChannel,
    ChannelType,
    VoiceChannel,
    VoiceStateManager,
    EmbedBuilder,
    RoleManager,
    Client,
    BaseInteraction,
    InteractionType,
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
    UserContextMenuCommandInteraction,
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
    ActivityType
} = Discord
const fs = require('fs');
const {
    token
} = require(`./files/token.json`)
const {
    createCanvas,
    loadImage,
    Image,
    Canvas,
    registerFont
} = require('canvas')
const path = require('path');
const {
    join
} = path
const {
    Routes,
    PermissionFlagsBits
} = require('discord-api-types/v9')
const {
    REST
} = require("@discordjs/rest")

var amount = []
var VAL = []

const client = new Discord.Client //create a new client to the bot to use
({
    partials: [Partials.Channel, Partials.Reaction, Partials.GuildScheduledEvent, Partials.Message, Partials.User, Partials.ThreadMember],
    intents: [ //intents
        'GuildScheduledEvents',
        'DirectMessages',
        "GuildMessageTyping", //allow bot to type
        "Guilds", //allow bot to use guilds
        "GuildMessages", //allow bot to interact with messages
        "GuildBans", //allow bot to ban, kick and timeout
        "GuildInvites", //allow bot to create invites
        "GuildMessageReactions", //allow bot to react to messages
        "GuildMembers", //allow bot to interact to members
        "GuildVoiceStates", //allow bot to use voice channel
        "GuildEmojisAndStickers", //allow bot to use emojis and sticker
        "GuildWebhooks", //allow bot to use webhook
        "GuildIntegrations", //allow bot to use integration
        "MessageContent",
        "GuildPresences"
    ]
})

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data);
}
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const rest = new REST({
            version: '10'
        }).setToken(token);
        const data = rest.put(
            Routes.applicationGuildCommands('1070023074289819688', '841272656192208916'), {
                body: commands
            },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

client.on(`ready`, () => {
    console.log(`bot is online`)
})

//creating a poll sheet
client.on(`interactionCreate`, (interaction) => {
    if (interaction.commandName == `create-poll`) {
        const file = `./files/votes.json`
        const img_num = `./files/serial.json`
        fs.readFile(file, "utf8", (err, voteData) => {
            fs.readFile(img_num, "utf8", (err, serial) => {
                let name = interaction.options.getString(`poll_name`, true)
                let one = interaction.options.getString(`option_1`, true)
                let two = interaction.options.getString(`option_2`, true)
                let three = (interaction.options.getString(`option_3`, false) == null) ? `none` : interaction.options.getString(`option_3`, false)
                let four = (interaction.options.getString(`option_4`, false) == null) ? `none` : interaction.options.getString(`option_4`, false)
                let five = (interaction.options.getString(`option_5`, false) == null) ? `none` : interaction.options.getString(`option_5`, false)

                let bg = new Image()
                bg.src = `./images/poll_background.png`

                const bar_width = 0
                const bar_height = -80

                const message = interaction.reply(`creating poll`).catch(console.error)

                let row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('one')
                        .setLabel(one)
                        .setEmoji(`1️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`two`)
                        .setLabel(two)
                        .setEmoji(`2️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    )

                let row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId(`one`)
                        .setLabel(one)
                        .setEmoji(`1️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`two`)
                        .setLabel(two)
                        .setEmoji(`2️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`three`)
                        .setLabel(three)
                        .setEmoji(`3️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    )

                let row3 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId(`one`)
                        .setLabel(one)
                        .setEmoji(`1️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`two`)
                        .setLabel(two)
                        .setEmoji(`2️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`three`)
                        .setLabel(three)
                        .setEmoji(`3️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`four`)
                        .setLabel(four)
                        .setEmoji(`4️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    )

                let row4 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId(`one`)
                        .setLabel(one)
                        .setEmoji(`1️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`two`)
                        .setLabel(two)
                        .setEmoji(`2️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`three`)
                        .setLabel(three)
                        .setEmoji(`3️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`four`)
                        .setLabel(four)
                        .setEmoji(`4️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    ).addComponents(
                        new ButtonBuilder()
                        .setCustomId(`five`)
                        .setLabel(five)
                        .setEmoji(`5️⃣`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    )

                let end = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('end')
                        .setLabel(`end vote`)
                        .setStyle(Discord.ButtonStyle.Primary)
                    )

                row = (three == `none`) ? row : row2
                row = (four == `none`) ? row : row3
                row = (five == `none`) ? row : row4

                let a = 2

                a = (three == `none`) ? 2 : 3
                a = (four == `none`) ? a : 4
                a = (five == `none`) ? a : 5

                let values = `1️⃣ ${one}\n2️⃣ ${two}`
                values = (three == `none`) ? values : values + `\n3️⃣ ${three}`
                values = (four == `none`) ? values : values + `\n4️⃣ ${four}`
                values = (five == `none`) ? values : values + `\n5️⃣ ${five}`

                VAL = values

                interaction.reply(`creating poll`).catch(console.error)
                
                amount = a

                setTimeout(() => {
                    registerFont('./ggsans-Bold.ttf', {
                        family: 'gg sans'
                    })

                    const canvas = createCanvas(1000, 1000)
                    const ctx = canvas.getContext('2d')
                    if (three == `none` && four == `none` && five == `none`) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(300, 900, bar_width, bar_height)
                        //bar 2
                        ctx.strokeRect(700, 900, bar_width, bar_height)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 300, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 700, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (four == `none` && five == `none`) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(250, 900, bar_width, bar_height)
                        //bar 2
                        ctx.strokeRect(500, 900, bar_width, bar_height)
                        //bar 3
                        ctx.strokeRect(750, 900, bar_width, bar_height)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 250, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 500, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 750, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                    } else if (five == `none`) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(200, 900, bar_width, bar_height)
                        //bar 2
                        ctx.strokeRect(400, 900, bar_width, bar_height)
                        //bar 3
                        ctx.strokeRect(600, 900, bar_width, bar_height)
                        //bar 4
                        ctx.strokeRect(800, 900, bar_width, bar_height)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 200, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 400, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 600, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 800, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(180, 900, bar_width, bar_height)
                        //bar 2
                        ctx.strokeRect(340, 900, bar_width, bar_height)
                        //bar 3
                        ctx.strokeRect(500, 900, bar_width, bar_height)
                        //bar 4
                        ctx.strokeRect(660, 900, bar_width, bar_height)
                        //bar 5
                        ctx.strokeRect(820, 900, bar_width, bar_height)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 180, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 340, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 500, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 660, 960, 50)
                        //text 5
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`5`, 820, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    }

                    interaction.editReply({
                        content: name,
                        files: [at],
                        components: [row, end]
                    }).catch(console.error)

                }, 6000)
            })
        })
    }
})

client.on(`interactionCreate`, (interaction) => {
    if (interaction.isButton()) {

        const file = `./files/votes.json`

        fs.readFile(file, "utf8", (err, voteData) => {
            let bg = new Image()
            bg.src = `./images/poll_background.png`
            const total = voteData.split(`=`).slice(6, 7).toString()
            let tVal = Number(total)

            const bar_width = 0
            const bar_height = -800 / tVal


            if (interaction.customId == `one`) {
                interaction.message.edit({
                    content: interaction.message.content + `updating graph`,
                    attachments: interaction.message.attachments,
                    components: interaction.message.components
                }).catch(console.error)
                const one = voteData.split(`=`).slice(1, 2).toString().replace(`\ntwo`, ``)
                const val1 = Number(one)
                const two = voteData.split(`=`).slice(2, 3).toString().replace(`\nthree`, ``)
                const val2 = Number(two)
                const three = voteData.split(`=`).slice(3, 4).toString().replace(`\nfour`, ``)
                const val3 = Number(three)
                const four = voteData.split(`=`).slice(4, 5).toString().replace(`\nfive`, ``)
                const val4 = Number(four)
                const five = voteData.split(`=`).slice(5, 6).toString().replace(`\ntotal`, ``)
                const val5 = Number(five)
                const total = voteData.split(`=`).slice(6, 7).toString()
                const tVal = Number(total)
                const One = voteData.replace(`one = ${val1}`, `one = ${val1 + 1}`).replace(`total = ${tVal}`, `total = ${tVal + 1}`)
                fs.writeFileSync(file, One)
                console.log(amount)

                setTimeout(() => {
                    registerFont('./ggsans-Bold.ttf', {
                        family: 'gg sans'
                    })

                    const canvas = createCanvas(1000, 1000)
                    const ctx = canvas.getContext('2d')
                    if (amount == 2) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 300, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 700, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 3) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 250, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 500, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 750, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                    } else if (amount == 4) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(200, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(400, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(600, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(800, 900, bar_width, bar_height * val4)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 200, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 400, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 600, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 800, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 5) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(180, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(340, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(500, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(660, 900, bar_width, bar_height * val4)
                        //bar 5
                        ctx.strokeRect(820, 900, bar_width, bar_height * val5)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 180, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 340, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 500, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 660, 960, 50)
                        //text 5
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`5`, 820, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    }

                    setTimeout(() => {
                        interaction.message.edit({
                            content: interaction.message.content.replace(`updating graph`, ``),
                            files: [at],
                            components: interaction.message.components
                        }).catch(console.error)
                    }, 100)

                }, 5000)
            }
            if (interaction.customId == `two`) {
                interaction.message.edit({
                    content: interaction.message.content + `updating graph`,
                    attachments: interaction.message.attachments,
                    components: interaction.message.components
                }).catch(console.error)
                const one = voteData.split(`=`).slice(1, 2).toString().replace(`\ntwo`, ``)
                const val1 = Number(one)
                const two = voteData.split(`=`).slice(2, 3).toString().replace(`\nthree`, ``)
                const val2 = Number(two)
                const three = voteData.split(`=`).slice(3, 4).toString().replace(`\nfour`, ``)
                const val3 = Number(three)
                const four = voteData.split(`=`).slice(4, 5).toString().replace(`\nfive`, ``)
                const val4 = Number(four)
                const five = voteData.split(`=`).slice(5, 6).toString().replace(`\ntotal`, ``)
                const val5 = Number(five)
                const total = voteData.split(`=`).slice(6, 7).toString()
                const tVal = Number(total)
                const Two = voteData.replace(`two = ${val2}`, `two = ${val2 + 1}`).replace(`total = ${tVal}`, `total = ${tVal + 1}`)
                fs.writeFileSync(file, Two)

                setTimeout(() => {
                    registerFont('./ggsans-Bold.ttf', {
                        family: 'gg sans'
                    })

                    const canvas = createCanvas(1000, 1000)
                    const ctx = canvas.getContext('2d')
                    if (amount == 2) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 300, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 700, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 3) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 250, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 500, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 750, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                    } else if (amount == 4) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(200, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(400, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(600, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(800, 900, bar_width, bar_height * val4)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 200, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 400, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 600, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 800, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 5) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(180, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(340, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(500, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(660, 900, bar_width, bar_height * val4)
                        //bar 5
                        ctx.strokeRect(820, 900, bar_width, bar_height * val5)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 180, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 340, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 500, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 660, 960, 50)
                        //text 5
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`5`, 820, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    }

                    setTimeout(() => {
                        interaction.message.edit({
                            content: interaction.message.content.replace(`updating graph`, ``),
                            files: [at],
                            components: interaction.message.components
                        }).catch(console.error)
                    }, 100)

                }, 5000)
            }
            if (interaction.customId == `three`) {
                interaction.message.edit({
                    content: interaction.message.content + `updating graph`,
                    attachments: interaction.message.attachments,
                    components: interaction.message.components
                }).catch(console.error)
                const one = voteData.split(`=`).slice(1, 2).toString().replace(`\ntwo`, ``)
                const val1 = Number(one)
                const two = voteData.split(`=`).slice(2, 3).toString().replace(`\nthree`, ``)
                const val2 = Number(two)
                const three = voteData.split(`=`).slice(3, 4).toString().replace(`\nfour`, ``)
                const val3 = Number(three)
                const four = voteData.split(`=`).slice(4, 5).toString().replace(`\nfive`, ``)
                const val4 = Number(four)
                const five = voteData.split(`=`).slice(5, 6).toString().replace(`\ntotal`, ``)
                const val5 = Number(five)
                const total = voteData.split(`=`).slice(6, 7).toString()
                const tVal = Number(total)
                const Three = voteData.replace(`three = ${val3}`, `three = ${val3 + 1}`).replace(`total = ${tVal}`, `total = ${tVal + 1}`)
                fs.writeFileSync(file, Three)

                setTimeout(() => {
                    registerFont('./ggsans-Bold.ttf', {
                        family: 'gg sans'
                    })

                    const canvas = createCanvas(1000, 1000)
                    const ctx = canvas.getContext('2d')
                    if (amount == 2) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 300, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 700, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 3) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 250, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 500, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 750, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                    } else if (amount == 4) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(200, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(400, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(600, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(800, 900, bar_width, bar_height * val4)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 200, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 400, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 600, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 800, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 5) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(180, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(340, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(500, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(660, 900, bar_width, bar_height * val4)
                        //bar 5
                        ctx.strokeRect(820, 900, bar_width, bar_height * val5)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 180, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 340, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 500, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 660, 960, 50)
                        //text 5
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`5`, 820, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    }

                    setTimeout(() => {
                        interaction.message.edit({
                            content: interaction.message.content.replace(`updating graph`, ``),
                            files: [at],
                            components: interaction.message.components
                        }).catch(console.error)
                    }, 100)

                }, 5000)
            }
            if (interaction.customId == `four`) {
                interaction.message.edit({
                    content: interaction.message.content + `updating graph`,
                    attachments: interaction.message.attachments,
                    components: interaction.message.components
                }).catch(console.error)
                const one = voteData.split(`=`).slice(1, 2).toString().replace(`\ntwo`, ``)
                const val1 = Number(one)
                const two = voteData.split(`=`).slice(2, 3).toString().replace(`\nthree`, ``)
                const val2 = Number(two)
                const three = voteData.split(`=`).slice(3, 4).toString().replace(`\nfour`, ``)
                const val3 = Number(three)
                const four = voteData.split(`=`).slice(4, 5).toString().replace(`\nfive`, ``)
                const val4 = Number(four)
                const five = voteData.split(`=`).slice(5, 6).toString().replace(`\ntotal`, ``)
                const val5 = Number(five)
                const total = voteData.split(`=`).slice(6, 7).toString()
                const tVal = Number(total)
                const Four = voteData.replace(`four = ${val4}`, `four = ${val4 + 1}`).replace(`total = ${tVal}`, `total = ${tVal + 1}`)
                fs.writeFileSync(file, Four)

                setTimeout(() => {
                    registerFont('./ggsans-Bold.ttf', {
                        family: 'gg sans'
                    })

                    const canvas = createCanvas(1000, 1000)
                    const ctx = canvas.getContext('2d')
                    if (amount == 2) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 300, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 700, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 3) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 250, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 500, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 750, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                    } else if (amount == 4) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(200, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(400, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(600, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(800, 900, bar_width, bar_height * val4)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 200, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 400, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 600, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 800, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 5) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(180, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(340, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(500, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(660, 900, bar_width, bar_height * val4)
                        //bar 5
                        ctx.strokeRect(820, 900, bar_width, bar_height * val5)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 180, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 340, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 500, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 660, 960, 50)
                        //text 5
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`5`, 820, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    }

                    setTimeout(() => {
                        interaction.message.edit({
                            content: interaction.message.content.replace(`updating graph`, ``),
                            files: [at],
                            components: interaction.message.components
                        }).catch(console.error)
                    }, 100)

                }, 5000)
            }
            if (interaction.customId == `five`) {
                interaction.message.edit({
                    content: interaction.message.content + `updating graph`,
                    attachments: interaction.message.attachments,
                    components: interaction.message.components
                }).catch(console.error)

                const one = voteData.split(`=`).slice(1, 2).toString().replace(`\ntwo`, ``)
                const val1 = Number(one)
                const two = voteData.split(`=`).slice(2, 3).toString().replace(`\nthree`, ``)
                const val2 = Number(two)
                const three = voteData.split(`=`).slice(3, 4).toString().replace(`\nfour`, ``)
                const val3 = Number(three)
                const four = voteData.split(`=`).slice(4, 5).toString().replace(`\nfive`, ``)
                const val4 = Number(four)
                const five = voteData.split(`=`).slice(5, 6).toString().replace(`\ntotal`, ``)
                const val5 = Number(five)
                const total = voteData.split(`=`).slice(6, 7).toString()
                const tVal = Number(total)
                console.log(val5)
                const Five = voteData.replace(`five = ${val5}`, `five = ${val5 + 1}`).replace(`total = ${tVal}`, `total = ${tVal + 1}`)
                fs.writeFileSync(file, Five)

                setTimeout(() => {
                    registerFont('./ggsans-Bold.ttf', {
                        family: 'gg sans'
                    })

                    const canvas = createCanvas(1000, 1000)
                    const ctx = canvas.getContext('2d')
                    if (amount == 2) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 300, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 700, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 3) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 250, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 500, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 750, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                    } else if (amount == 4) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(200, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(400, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(600, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(800, 900, bar_width, bar_height * val4)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 200, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 400, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 600, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 800, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 5) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(180, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(340, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(500, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(660, 900, bar_width, bar_height * val4)
                        //bar 5
                        ctx.strokeRect(820, 900, bar_width, bar_height * val5)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 180, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 340, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 500, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 660, 960, 50)
                        //text 5
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`5`, 820, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    }

                    setTimeout(() => {
                        interaction.message.edit({
                            content: interaction.message.content.replace(`updating graph`, ``),
                            files: [at],
                            components: interaction.message.components
                        }).catch(console.error)
                    }, 100)

                }, 5000)
            } else if (interaction.customId == `end`) {
                interaction.message.edit({
                    content: interaction.message.content + `updating graph`,
                    attachments: interaction.message.attachments,
                    components: interaction.message.components
                }).catch(console.error)

                const one = voteData.split(`=`).slice(1, 2).toString().replace(`\ntwo`, ``)
                const val1 = Number(one)
                const two = voteData.split(`=`).slice(2, 3).toString().replace(`\nthree`, ``)
                const val2 = Number(two)
                const three = voteData.split(`=`).slice(3, 4).toString().replace(`\nfour`, ``)
                const val3 = Number(three)
                const four = voteData.split(`=`).slice(4, 5).toString().replace(`\nfive`, ``)
                const val4 = Number(four)
                const five = voteData.split(`=`).slice(5, 6).toString().replace(`\ntotal`, ``)
                const val5 = Number(five)
                const total = voteData.split(`=`).slice(6, 7).toString()
                const tVal = Number(total)
                console.log(val5)
                const Five = voteData.replace(`five = ${val5}`, `five = ${val5 + 1}`).replace(`total = ${tVal}`, `total = ${tVal + 1}`)
                fs.writeFileSync(file, Five)

                setTimeout(() => {
                    registerFont('./ggsans-Bold.ttf', {
                        family: 'gg sans'
                    })

                    const canvas = createCanvas(1000, 1000)
                    const ctx = canvas.getContext('2d')
                    if (amount == 2) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 300, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 700, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 3) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 250, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 500, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 750, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                    } else if (amount == 4) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(200, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(400, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(600, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(800, 900, bar_width, bar_height * val4)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 200, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 400, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 600, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 800, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    } else if (amount == 5) {
                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                        ctx.lineJoin = `miter`
                        ctx.lineWidth = 109

                        ctx.strokeStyle = `#f5f5f5`
                        //bar 1
                        ctx.strokeRect(180, 900, bar_width, bar_height * val1)
                        //bar 2
                        ctx.strokeRect(340, 900, bar_width, bar_height * val2)
                        //bar 3
                        ctx.strokeRect(500, 900, bar_width, bar_height * val3)
                        //bar 4
                        ctx.strokeRect(660, 900, bar_width, bar_height * val4)
                        //bar 5
                        ctx.strokeRect(820, 900, bar_width, bar_height * val5)
                        //text 1
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`1`, 180, 960, 50)
                        //text 2
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`2`, 340, 960, 50)
                        //text 3
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`3`, 500, 960, 50)
                        //text 4
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`4`, 660, 960, 50)
                        //text 5
                        ctx.font = "bold 50px gg sans"
                        ctx.fillStyle = `#f5f5f5`
                        ctx.textAlign = "center"
                        ctx.fillText(`5`, 820, 960, 50)

                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                    }

                    setTimeout(() => {
                        interaction.message.edit({
                            content: interaction.message.content.replace(/updating graph/g, ``) + ` total votes:**${tVal}**\n${VAL}`,
                            files: [at],
                            components:[]
                        }).catch(console.error)

                        setTimeout(() => {
                            fs.writeFileSync(file, `one = 0\ntwo = 0\nthree = 0\nfour = 0\nfive = 0\ntotal = 0`)
                        }, 100)
                    }, 100)

                }, 5000)
            }
        })
    }
})

client.login(token)