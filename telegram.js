require('dotenv').config()
core = require('@actions/core');
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TG_API;
const UID = process.env.TG_UID;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (!UID || UID != chatId) {
        bot.sendMessage(chatId, `UID: ${chatId}`);
    }
});

async function sendImg(image,id) {
    console.log("Trying to send a card to Telegram");
    try {
        if (hideId == "All" || hideId == "Message") caption = ""
        else caption = `ID: ${id}`
        await bot.sendPhoto(UID,image,{caption: caption})
    } catch (error) {
        console.log(error);
        core.setFailed('Error sending file!');
        return false
    }
    return true

    // A new method of sending files (for a future update)
    var buffer = bufferFile(image);
    fileOptions = {
        filename: image.split("/")[-1],
        contentType: "image/png"
    }
    // await bot.sendPhoto(UID,buffer,{caption: `ID: ${id}`},fileOptions)
    await bot.sendPhoto(UID,buffer,{},fileOptions)
}

function bufferFile(relPath) {
    var fs = require('fs');
    var path = require('path');  
    return fs.readFileSync(path.join(__dirname, relPath));
}

module.exports.sendImg = sendImg;