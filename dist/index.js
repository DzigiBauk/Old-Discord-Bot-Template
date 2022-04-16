"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('../config.json');
const fs = require('node:fs');
const discord_js_1 = __importDefault(require("discord.js"));
//Client + Flags
const client = new discord_js_1.default.Client({ intents: [
        discord_js_1.default.Intents.FLAGS.GUILDS,
        discord_js_1.default.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.default.Intents.FLAGS.GUILD_PRESENCES,
        discord_js_1.default.Intents.FLAGS.GUILD_MEMBERS
    ] });
//Command Collection
let commands = new discord_js_1.default.Collection();
//Bot Startup
client.on("ready", () => {
    var _a;
    if ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username)
        console.log(`${client.user.username} is up!`);
});
//On Message
client.on("messageCreate", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.author.bot)
        return;
    if (msg.content.startsWith(config.prefix)) {
        let args = msg.content.slice(1).split(" ");
        commandHandler(msg, args);
    }
}));
//Command Loader
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const commandClass = require(`./commands/${file}`).default;
    const command = new commandClass();
    commands.set(command.name(), command);
}
//Command Handler
function commandHandler(msg, args) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = commands.get(args[0]);
        if (command) {
            command.execute(args.slice(1), msg, client);
        }
        else {
            console.log("Command does not exist!");
        }
    });
}
//Bot Login
client.login(config.token);
