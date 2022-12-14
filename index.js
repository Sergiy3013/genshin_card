core = require('@actions/core');
require('dotenv').config()
hoyolab = require("./hoyolab")
img = require("./img")



async function start() {
    if (!process.env.TG_API) {
        core.setFailed('You need to set up telegram to receive cards!');
        return
    }
    try {
        cookies = JSON.parse(process.env.HOYOLAB_COOKIES)
    } catch (error) {
        core.setFailed('It looks like you entered `HOYOLAB_COOKIES` incorrectly');
        return false
    }
    for (let i = 0; i < cookies.length; i++) {
        console.log(`\nCard ${i+1}/${JSON.parse(process.env.HOYOLAB_COOKIES).length}`);
        console.log("Trying to get account information\n");
        data = await hoyolab.start(JSON.parse(process.env.HOYOLAB_COOKIES)[i])
        if(data) {
            console.log("Account information successfully received\n");

            console.log("Card generation attempt\n");
            image = await img.start(data, bg = process.env.CARD_BG || null, avatar = process.env.CARD_AVATAR ||null , lang = process.env.CARD_LANG || null)
    
            if (image) {
                file = `./tmp/card_${data.User.id}.png`    
                if(process.env.TG_API){
                    telegram = require("./telegram")
                    await telegram.sendImg(file, data.User.id)
                }
            }
    
            console.log(`Done\n`);
        }
    }
    process.exit(0)
}
start()
