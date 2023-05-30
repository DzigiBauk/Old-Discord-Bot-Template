

const config = require('../config.json')
const fs = require('node:fs');

import Discord from 'discord.js';
import { ICommand } from './utils/commandInterface';



//Client + Flags
const client = new Discord.Client({ intents: [ 
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.MessageContent
]});

//Command Collection
let commands = new Discord.Collection();


//Bot Startup
client.on("ready", () => {
    if (client.user?.username) console.log(`${client.user.username} is up!`);
    
})

//On Message
client.on("messageCreate", async (msg: Discord.Message) => {
    if (msg.author.bot) return;
    
    if (msg.content.startsWith(config.prefix)) {
        let args = msg.content.slice(1).split(" ");
        commandHandler(msg, args);
    }
})

//Command Loader
commandLoader('./commands')

function commandLoader(path: String) {
    const allFiles = fs.readdirSync(path);
    console.log(allFiles)
    const commandFiles = allFiles.filter((file: string) => file.endsWith('js'))

    for (const file of allFiles) {
        if (fs.statSync(path + "/" + file).isDirectory()) {
            commandLoader(path + "/" + file)
        }
    }


    for (const file of commandFiles) {
        const commandClass = require(`${path}/${file}`).default;
        const command = new commandClass() as ICommand;

        commands.set(command.name(), command);
        console.log(`[!] Command loaded ${command.name()}`)
    }
}

//Command Handler
async function commandHandler(msg: Discord.Message, args: string[]) {
   let command = commands.get(args[0]) as ICommand;

   if(command) {
       command.execute(args.slice(1), msg, client);
   } else {
       console.log("Command does not exist!");
   }
}

//Bot Login
client.login(config.token);
