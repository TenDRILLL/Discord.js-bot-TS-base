import {
    Collection
} from "discord.js";
import {
    readdirSync
} from "fs";
import Command from "../classes/Command";

const commands: Collection<String,Command> = new Collection();
export function getCommands(){
    return commands;
}
export function loadCommands(){
    const commandFiles = readdirSync(`${__dirname}/../commands`).filter(x => x.endsWith(".js"));
    commandFiles.forEach(name => {
        import(`../commands/${name}`).then(file => {
            const js = new(<any>Object.entries(file)[0][1]);
            if(!(js instanceof Command)) return;
            commands.set(js.getName(),js);
            console.log(`${js.getName()} loaded.`);
        }).catch();
    });
}