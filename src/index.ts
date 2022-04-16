

const config = require('../config.json')
const fs = require('node:fs');

import Discord from 'discord.js';
import { ICommand } from './utils/commandInterface';

//Client + Flags
const client = new Discord.Client({ intents: [ 
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES, 
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MEMBERS
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
const commandFiles = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const commandClass = require(`./commands/${file}`).default;
    const command = new commandClass() as ICommand;

	commands.set(command.name(), command);
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
