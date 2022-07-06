import {
    readdirSync
} from "node:fs";
import Event from "../classes/Event";
import {
    Client
} from "discord.js";

export function createEvents(bot: Client){
    const eventFiles = readdirSync(`${__dirname}/../events`).filter(x => x.endsWith(".js"));
    eventFiles.forEach(name => {
        import(`../events/${name}`).then(file => {
            const ev = new(<any>Object.entries(file)[0][1]);
            if(!(ev instanceof Event)) return;
            bot[ev.isRunOnce() ? "once" : "on"](ev.getName(), (...args) => ev.exec(bot, ...args));
            console.log(`${ev.getName()} loaded.`);
        }).catch();
    });
}