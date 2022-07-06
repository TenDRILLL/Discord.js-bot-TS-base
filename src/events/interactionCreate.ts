import Event from "../classes/Event";
import Command from "../classes/Command";
import {
    ChatInputCommandInteraction,
    Client,
    Collection
} from "discord.js";
import {
    getCommands
} from "../automation/commandModule";

export class InteractionCreate extends Event{
    private commands: Collection<String,Command>;
    constructor() {
        super("interactionCreate",false);
        this.commands = getCommands();
    }

    exec(bot: Client, interaction: ChatInputCommandInteraction){
        if(interaction.isChatInputCommand()){
            const cmd = this.commands.get(interaction.commandName);
            if(cmd) return cmd.cmdRun(bot, interaction);
        }
    }
}