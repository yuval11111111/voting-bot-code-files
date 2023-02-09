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

//id loader
const ids = `./files/id.json`
const img_num = `./files/serial.json`
client.on(`messageUpdate`, (message, newm) => {
    fs.readFile(ids, "utf8", (err, id) => {
        fs.readFile(img_num, "utf8", (err, poll) => {
            if (newm.content.includes(`poll id: ${poll}`)) {
                fs.writeFileSync(ids, `\n${newm.channel.id}\n${newm.id}\n${amount}`)
            }
        })
    })
})

//color invertor 
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

//timer
// Update the count down every 1 second
var x = setInterval(function () {

    const f = `./files/time.json`
    const ids = `./files/id.json`
    const votes = `./files/votes.json`
    const url = `./files/img_url.json`
    const dye = `./files/color.json`

    fs.readFile(f, "utf8", (err, time2) => {
        fs.readFile(ids, "utf8", (err, id) => {
            fs.readFile(votes, "utf8", (err, voteData) => {
                fs.readFile(url, "utf8", (err, URL) => {
                    fs.readFile(dye, "utf8", (err, color) => {
                        if (!time2) return;
                        else if (time2 && time2 > 0) {
                            let time = Number(time2)
                            let time22 = time - 1
                            fs.writeFileSync(f, `${time22}`)
                            console.log(time)
                        } else if (time2 && time2 == 0) {
                            console.log(`finish`)
                            fs.writeFileSync(f, ``)
                            let ID = id.split('\n').slice(3, 4)
                            let messageID = id.split('\n').slice(2, 3).toString()
                            let channelID = id.split('\n').slice(1, 2).toString()
                            console.log(ID, messageID, channelID)
                            if (!messageID) return;
                            else {
                                const m = client.channels.cache
                                    .get(channelID).messages.fetch(messageID)

                                Promise.resolve(m).then((value) => {
                                    value.edit({
                                        content: value.content + ` updating graph`,
                                        attachments: value.attachments,
                                        components: value.components
                                    }).catch(console.error)

                                    color = (!color) ? `#f5f5f5` : color
                                    console.log(color)

                                    const invert = invertColor(color)

                                    let bg = new Image()
                                    let source = (!URL) ? `./images/poll_background.png` : URL
                                    bg.src = source

                                    console.log(URL)

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

                                    const bar_width = 0
                                    const bar_height = -800 / tVal

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

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 300, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 700, 960, 50)
                                            //vote 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val1, 300, 880, 50)
                                            //vote 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val2, 700, 880, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 3) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                                            //bar 3
                                            ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 250, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 500, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 750, 960, 50)
                                            //vote 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val1, 250, 880, 50)
                                            //vote 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val2, 500, 880, 50)
                                            //vote 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val3, 750, 880, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                                        } else if (amount == 4) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 200, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 400, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 600, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 800, 960, 50)
                                            //vote 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val1, 200, 880, 50)
                                            //vote 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val2, 400, 880, 50)
                                            //vote 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val3, 600, 880, 50)
                                            //vote 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val4, 800, 880, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 5) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 180, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 340, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 500, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 660, 960, 50)
                                            //text 5
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`5`, 820, 960, 50)
                                            //vote 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val1, 180, 880, 50)
                                            //vote 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val2, 340, 880, 50)
                                            //vote 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val3, 500, 880, 50)
                                            //vote 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val4, 660, 880, 50)
                                            //vote 5
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = invert
                                            ctx.textAlign = "center"
                                            ctx.fillText(val5, 820, 880, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        }

                                        setTimeout(() => {
                                            value.edit({
                                                content: value.content.replace(/updating graph/g, ``) + ` total votes:**${tVal}**\n${VAL}\nended at **${new Date().toUTCString()}**`,
                                                files: [at],
                                                components: []
                                            }).catch(console.error)

                                            setTimeout(() => {
                                                const users = `./files/users.json`
                                                const file3 = `./files/amount.json`
                                                const file = `./files/votes.json`
                                                fs.writeFileSync(file, `one = 0\ntwo = 0\nthree = 0\nfour = 0\nfive = 0\ntotal = 0`)
                                                fs.writeFileSync(users, ``)
                                                fs.writeFileSync(file3, ``)
                                                fs.writeFileSync(ids, ``)
                                                fs.writeFileSync(url, ``)
                                                console.log(`finished`)

                                            }, 300)
                                        }, 200)

                                    }, 6000)
                                })
                            }
                        }
                    })
                })
            })
        })
    })
}, 1000);


//poll option memory refresh
client.on(`interactionCreate`, (interaction) => {
    const file3 = `./files/amount.json`
    fs.readFile(file3, "utf8", (err, am) => {
        amount = Number(am)
    })
})

//creating a poll sheet command
client.on(`interactionCreate`, (interaction) => {
    if (interaction.commandName == `create-poll`) {
        const file = `./files/votes.json`
        const img_num = `./files/serial.json`
        const f = `./files/time.json`
        const url = `./files/img_url.json`
        const dye = `./files/color.json`
        fs.readFile(file, "utf8", (err, voteData) => {
            fs.readFile(img_num, "utf8", (err, serial) => {
                let name = interaction.options.getString(`poll_name`, true)
                let one = interaction.options.getString(`option_1`, true)
                let two = interaction.options.getString(`option_2`, true)
                let three = (interaction.options.getString(`option_3`, false) == null) ? `none` : interaction.options.getString(`option_3`, false)
                let four = (interaction.options.getString(`option_4`, false) == null) ? `none` : interaction.options.getString(`option_4`, false)
                let five = (interaction.options.getString(`option_5`, false) == null) ? `none` : interaction.options.getString(`option_5`, false)
                let time = interaction.options.getNumber(`time`, false)
                let Url = interaction.options.getString(`background_url`, false)
                let color = interaction.options.getString(`graph-color`, false)

                color = (!color) ? `#f5f5f5` : color

                fs.writeFileSync(dye, color)

                const total = voteData.split(`=`).slice(6, 7).toString()
                const tVal = Number(total)

                let bg = new Image()
                let source = (!Url) ? `./images/poll_background.png` : Url
                bg.src = source

                let sSave = (source == `./images/poll_background.png`) ? `` : Url

                fs.writeFileSync(url, sSave)

                const bar_width = 0
                const bar_height = -80

                if (tVal > 0) return interaction.reply({
                    content: `you can't run two poll at the same time`,
                    ephemeral: true
                })
                else {
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

                    let id = (!serial) ? 0 : Number(serial) + 1
                    fs.writeFileSync(img_num, `${id}`)

                    const file3 = `./files/amount.json`
                    fs.writeFileSync(file3, `${a}`)

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

                            ctx.strokeStyle = color
                            //bar 1
                            ctx.strokeRect(300, 900, bar_width, bar_height)
                            //bar 2
                            ctx.strokeRect(700, 900, bar_width, bar_height)
                            //text 1
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`1`, 300, 960, 50)
                            //text 2
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`2`, 700, 960, 50)

                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                        } else if (four == `none` && five == `none`) {
                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                            ctx.lineJoin = `miter`
                            ctx.lineWidth = 109

                            ctx.strokeStyle = color
                            //bar 1
                            ctx.strokeRect(250, 900, bar_width, bar_height)
                            //bar 2
                            ctx.strokeRect(500, 900, bar_width, bar_height)
                            //bar 3
                            ctx.strokeRect(750, 900, bar_width, bar_height)
                            //text 1
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`1`, 250, 960, 50)
                            //text 2
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`2`, 500, 960, 50)
                            //text 3
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`3`, 750, 960, 50)

                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                        } else if (five == `none`) {
                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                            ctx.lineJoin = `miter`
                            ctx.lineWidth = 109

                            ctx.strokeStyle = color
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
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`1`, 200, 960, 50)
                            //text 2
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`2`, 400, 960, 50)
                            //text 3
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`3`, 600, 960, 50)
                            //text 4
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`4`, 800, 960, 50)

                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                        } else {
                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                            ctx.lineJoin = `miter`
                            ctx.lineWidth = 109

                            ctx.strokeStyle = color
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
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`1`, 180, 960, 50)
                            //text 2
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`2`, 340, 960, 50)
                            //text 3
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`3`, 500, 960, 50)
                            //text 4
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`4`, 660, 960, 50)
                            //text 5
                            ctx.font = "bold 50px gg sans"
                            ctx.fillStyle = color
                            ctx.textAlign = "center"
                            ctx.fillText(`5`, 820, 960, 50)

                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                        }

                        interaction.editReply({
                            content: name + ` poll id: ${id}`,
                            files: [at],
                            components: [row, end]
                        }).catch(console.error)
                        if (!time) return fs.writeFileSync(f, ``)
                        else if (time) return fs.writeFileSync(f, `${time*60}`)
                    }, 6000)
                }
            })
        })
    }
})

client.on(`interactionCreate`, (interaction) => {
    if (interaction.isButton()) {

        const file = `./files/votes.json`
        const users = `./files/users.json`
        const ids = `./files/id.json`
        const url = `./files/img_url.json`
        const dye = `./files/color.json`

        fs.readFile(file, "utf8", (err, voteData) => {
            fs.readFile(users, "utf8", (err, user) => {
                fs.readFile(ids, "utf8", (err, id) => {
                    fs.readFile(url, "utf8", (err, URL) => {
                        fs.readFile(dye, "utf8", (err, color) => {
                            let bg = new Image()
                            let source = (!URL) ? `./images/poll_background.png` : URL
                            bg.src = source

                            color = (!color) ? `#f5f5f5` : color
                            console.log(color)

                            const invert = invertColor(color)

                            const total = voteData.split(`=`).slice(6, 7).toString()
                            let tVal = Number(total)

                            const bar_width = 0
                            const bar_height = -800 / tVal


                            if (interaction.customId == `one`) {
                                if (user.includes(interaction.user.id)) return interaction.reply({
                                    content: `You have already voted`,
                                    ephemeral: true
                                })
                                else {
                                    fs.writeFileSync(ids, `${interaction.channel.id}\n${interaction.message.id}\n${amount}`)
                                    fs.writeFileSync(users, user + `\n${interaction.user.id}`)
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

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 300, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 700, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 3) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                                            //bar 3
                                            ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 250, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 500, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 750, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                                        } else if (amount == 4) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 200, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 400, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 600, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 800, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 5) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 180, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 340, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 500, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 660, 960, 50)
                                            //text 5
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
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
                                        }, 200)

                                    }, 6000)
                                }
                            }
                            if (interaction.customId == `two`) {
                                if (user.includes(interaction.user.id)) return interaction.reply({
                                    content: `You have already voted`,
                                    ephemeral: true
                                })
                                else {
                                    fs.writeFileSync(ids, `\n${interaction.channel.id}\n${interaction.message.id}\n${amount}`)
                                    fs.writeFileSync(users, user + `\n${interaction.user.id}`)
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

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 300, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 700, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 3) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                                            //bar 3
                                            ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 250, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 500, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 750, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                                        } else if (amount == 4) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 200, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 400, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 600, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 800, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 5) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 180, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 340, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 500, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 660, 960, 50)
                                            //text 5
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
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

                                    }, 6000)
                                }
                            }
                            if (interaction.customId == `three`) {
                                if (user.includes(interaction.user.id)) return interaction.reply({
                                    content: `You have already voted`,
                                    ephemeral: true
                                })
                                else {
                                    fs.writeFileSync(ids, `\n${interaction.channel.id}\n${interaction.message.id}\n${amount}`)
                                    fs.writeFileSync(users, user + `\n${interaction.user.id}`)
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

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 300, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 700, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 3) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                                            //bar 3
                                            ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 250, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 500, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 750, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                                        } else if (amount == 4) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 200, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 400, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 600, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 800, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 5) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 180, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 340, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 500, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 660, 960, 50)
                                            //text 5
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
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

                                    }, 6000)
                                }
                            }
                            if (interaction.customId == `four`) {
                                if (user.includes(interaction.user.id)) return interaction.reply({
                                    content: `You have already voted`,
                                    ephemeral: true
                                })
                                else {
                                    fs.writeFileSync(ids, `\n${interaction.channel.id}\n${interaction.message.id}\n${amount}`)
                                    fs.writeFileSync(users, user + `\n${interaction.user.id}`)
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

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 300, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 700, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 3) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                                            //bar 3
                                            ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 250, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 500, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 750, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                                        } else if (amount == 4) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 200, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 400, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 600, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 800, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 5) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 180, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 340, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 500, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 660, 960, 50)
                                            //text 5
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
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

                                    }, 6000)
                                }
                            }
                            if (interaction.customId == `five`) {
                                if (user.includes(interaction.user.id)) return interaction.reply({
                                    content: `You have already voted`,
                                    ephemeral: true
                                })
                                else {
                                    fs.writeFileSync(ids, `\n${interaction.channel.id}\n${interaction.message.id}\n${amount}`)
                                    fs.writeFileSync(users, user + `\n${interaction.user.id}`)
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

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 300, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 700, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 3) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
                                            //bar 1
                                            ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                                            //bar 2
                                            ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                                            //bar 3
                                            ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                                            //text 1
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 250, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 500, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 750, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                                        } else if (amount == 4) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 200, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 400, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 600, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 800, 960, 50)

                                            var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                        } else if (amount == 5) {
                                            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                            ctx.lineJoin = `miter`
                                            ctx.lineWidth = 109

                                            ctx.strokeStyle = color
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
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`1`, 180, 960, 50)
                                            //text 2
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`2`, 340, 960, 50)
                                            //text 3
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`3`, 500, 960, 50)
                                            //text 4
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
                                            ctx.textAlign = "center"
                                            ctx.fillText(`4`, 660, 960, 50)
                                            //text 5
                                            ctx.font = "bold 50px gg sans"
                                            ctx.fillStyle = color
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

                                    }, 6000)
                                }
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

                                        ctx.strokeStyle = color
                                        //bar 1
                                        ctx.strokeRect(300, 900, bar_width, bar_height * val1)
                                        //bar 2
                                        ctx.strokeRect(700, 900, bar_width, bar_height * val2)
                                        //text 1
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`1`, 300, 960, 50)
                                        //text 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`2`, 700, 960, 50)
                                        //vote 1
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val1, 300, 880, 50)
                                        //vote 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val2, 700, 880, 50)

                                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                    } else if (amount == 3) {
                                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                        ctx.lineJoin = `miter`
                                        ctx.lineWidth = 109

                                        ctx.strokeStyle = color
                                        //bar 1
                                        ctx.strokeRect(250, 900, bar_width, bar_height * val1)
                                        //bar 2
                                        ctx.strokeRect(500, 900, bar_width, bar_height * val2)
                                        //bar 3
                                        ctx.strokeRect(750, 900, bar_width, bar_height * val3)
                                        //text 1
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`1`, 250, 960, 50)
                                        //text 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`2`, 500, 960, 50)
                                        //text 3
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`3`, 750, 960, 50)
                                        //vote 1
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val1, 250, 880, 50)
                                        //vote 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val2, 500, 880, 50)
                                        //vote 3
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val3, 750, 880, 50)

                                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)
                                    } else if (amount == 4) {
                                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                        ctx.lineJoin = `miter`
                                        ctx.lineWidth = 109

                                        ctx.strokeStyle = color
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
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`1`, 200, 960, 50)
                                        //text 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`2`, 400, 960, 50)
                                        //text 3
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`3`, 600, 960, 50)
                                        //text 4
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`4`, 800, 960, 50)
                                        //vote 1
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val1, 200, 880, 50)
                                        //vote 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val2, 400, 880, 50)
                                        //vote 3
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val3, 600, 880, 50)
                                        //vote 4
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val4, 800, 880, 50)

                                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                    } else if (amount == 5) {
                                        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

                                        ctx.lineJoin = `miter`
                                        ctx.lineWidth = 109

                                        ctx.strokeStyle = color
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
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`1`, 180, 960, 50)
                                        //text 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`2`, 340, 960, 50)
                                        //text 3
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`3`, 500, 960, 50)
                                        //text 4
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`4`, 660, 960, 50)
                                        //text 5
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = color
                                        ctx.textAlign = "center"
                                        ctx.fillText(`5`, 820, 960, 50)
                                        //vote 1
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val1, 180, 880, 50)
                                        //vote 2
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val2, 340, 880, 50)
                                        //vote 3
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val3, 500, 880, 50)
                                        //vote 4
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val4, 660, 880, 50)
                                        //vote 5
                                        ctx.font = "bold 50px gg sans"
                                        ctx.fillStyle = invert
                                        ctx.textAlign = "center"
                                        ctx.fillText(val5, 820, 880, 50)

                                        var at = new Discord.AttachmentBuilder(canvas.toBuffer(), `poll-1.png`)

                                    }

                                    setTimeout(() => {
                                        interaction.message.edit({
                                            content: interaction.message.content.replace(/updating graph/g, ``) + ` total votes:**${tVal}**\n${VAL}\nended at **${new Date().toUTCString()}**`,
                                            files: [at],
                                            components: []
                                        }).catch(console.error)

                                        setTimeout(() => {
                                            const users = `./files/users.json`
                                            const file3 = `./files/amount.json`
                                            fs.writeFileSync(file, `one = 0\ntwo = 0\nthree = 0\nfour = 0\nfive = 0\ntotal = 0`)
                                            fs.writeFileSync(users, ``)
                                            fs.writeFileSync(file3, ``)
                                            fs.writeFileSync(ids, ``)
                                            fs.writeFileSync(url, ``)
                                        }, 100)
                                    }, 200)

                                }, 6000)
                            }
                        })
                    })
                })
            })
        })
    }
})

client.login(token)