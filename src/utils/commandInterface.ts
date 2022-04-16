import Discord from 'discord.js'

export interface ICommand {
    name(): string;
    description(): string;
    execute(args: string[], msgObject: Discord.Message, client: Discord.Client): void;
}