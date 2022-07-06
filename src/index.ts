import {
    GatewayIntentBits,
    Client
} from "discord.js";
import {
    createEvents
} from "./automation/eventModule";

const token = "token";

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

console.log("Creating events...");
createEvents(bot);

console.log("Logging in the bot...");
bot.login(token).catch(error => {
    console.error(error);
});