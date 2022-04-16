import { DiscordAPIError } from "discord.js";

import Discord from 'discord.js';
import { ICommand } from "../utils/commandInterface";

export default class ping implements ICommand {
	name() {
		return "ping";
	}

	description() {
		return "Ping command or something. Take a guess :P";
	}

	execute(args: string[], msgObject: Discord.Message, client: Discord.Client) {
		msgObject.reply("Pong!")
	}

}