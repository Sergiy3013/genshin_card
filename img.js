core = require('@actions/core');
require('dotenv').config()
const fs = require('fs')
const { registerFont, createCanvas, loadImage } = require('canvas')

hideId = process.env.CARD_HIDE_ID

async function start(data, bg, avatar, lang) {
    bg = `./img/bg/${bg || "bg_1"}.png`
    avatar = `./img/avatars/${avatar || "Paimon"}.png`
    lang = `./img/lang/${lang || "lang_ENG"}.png`
    registerFont('./font/TTCommons-Regular.ttf', { family: 'MyFont' })

    console.log("Checking the presence of necessary image fragments");
    if (!fs.existsSync(bg)) {
        core.setFailed(" Background file not found");
        return false
    }
    if (!fs.existsSync(avatar)) {
        core.setFailed(" Avatar file not found");
        return false
    }
    if (!fs.existsSync(lang)) {
        core.setFailed(" Language file not found");
        return false
    }

    console.log("Attempting to create an canvas based on the selected background.");
    try {
        await loadImage(bg).then(image => {
            width = image.naturalWidth;
            height = image.naturalHeight;
            bgimg = image
        })
        canvas = createCanvas(width, height)
        context = canvas.getContext('2d')
        context.drawImage(bgimg, 0, 0, width, height)
    } catch (error) {
        console.log(error);
        core.setFailed(" Failed to create canvas");
        return false
    }

    console.log("Trying to merge the selected images");
    try {
        await addImg(avatar, left = 60, top = 140, width = null, height = null)
        await addImg(bg)
        await addImg(lang)
    } catch (error) {
        console.log(error);
        core.setFailed(" Error adding avatar, background or language");
        return false
    }

    console.log("Add basic user information (name, server, level and ID)");
    try {
        if (hideId == "All" || hideId == "Card") {
            await addText(data.User.Name, 350, 240, 50); // Name
            await addText(`${data.User.Server}  |  Lv.${data.User.lvl}`, 350, 300, 35); // Server
        } else{
            await addText(data.User.Name, 350, 230, 50); // Name
            await addText(`${data.User.Server}  |  Lv.${data.User.lvl}`, 350, 285, 35); // Server
            await addText(`UID: ${data.User.id}`, 350, 325, 35); // ID        
        }
    } catch (error) {
        console.log(error);
        core.setFailed(" Error adding basic user information");
        return false
    }

    console.log("Attempting to write user statistics");
    try {
        await addText(data.Summary.Days_Active, indent(200, data.Summary.Days_Active), 510);
        await addText(data.Summary.Achievements, indent(445, data.Summary.Achievements), 510);
        await addText(data.Summary.Characters, indent(690, data.Summary.Characters), 510);

        await addText(data.Summary.Anemoculi, indent(200, data.Summary.Anemoculi), 710);
        await addText(data.Summary.Geoculi, indent(445, data.Summary.Geoculi), 710);
        await addText(data.Summary.Electroculi, indent(690, data.Summary.Electroculi), 710);

        await addText(data.Summary.Dendroculi, indent(200, data.Summary.Dendroculi), 900);
        await addText(data.Summary.Waypoints_Unlocked, indent(445, data.Summary.Waypoints_Unlocked), 900);
        await addText(data.Summary.Domains_Unlocked, indent(690, data.Summary.Domains_Unlocked), 900);

        await addText(data.Summary.Spiral_Abyss, indent(200, data.Summary.Spiral_Abyss), 1080);
        await addText(data.Summary.Common_Chests_Opened, indent(445, data.Summary.Waypoints_Unlocked), 1080);
        await addText(data.Summary.Exquisite_Chests_Opened, indent(690, data.Summary.Exquisite_Chests_Opened), 1080);

        await addText(data.Summary.Precious_Chests_Opened, indent(200, data.Summary.Precious_Chests_Opened), 1260);
        await addText(data.Summary.Luxurious_Chests_Opened, indent(445, data.Summary.Luxurious_Chests_Opened), 1260);
        await addText(data.Summary.Number_of_Remarkable_Chests, indent(690, data.Summary.Number_of_Remarkable_Chests), 1260);
    } catch (error) {
        console.log(error);
        core.setFailed(" Failed to write statistics data");
        return false
    }

    console.log("Trying to save a file");
    try { await saveFile(`card_${data.User.id}.png`) }
    catch (error) {
        console.log(error);
        core.setFailed(" Failed to save filea");
        return false
    }

    return true

    //! Functions
    //* Adding an image
    async function addImg(img, left = 0, top = 0, width = null, height = null) {
        await loadImage(img).then(image => {
            context.drawImage(image, left, top, width || image.naturalWidth, height || image.naturalHeight)
        })
    }
    //* Adding text
    async function addText(text, x = 0, y = 0, fontSize = 50, fontType = "MyFont" || "Arial", fontColor = '#fff') {
        text = text.trim()
        if (text.length != 0) {
            context.textBaseline = 'top'
            context.font = `${parseInt(fontSize)}px ${fontType}`;

            // Фона
            if (false) {
                context.fillStyle = '#3574d4'
                textWidth = context.measureText(text).width
                context.fillRect(x - 10, y - 5, textWidth + 20, 100);
            }
            // Текст
            context.fillStyle = fontColor
            context.fillText(text, x, y)
            // context.strokeText(text, x, y)
        }
    }
    //* Indent to display text in the middle of the specified width coordinate
    function indent(coord, text) {
        return (coord - context.measureText(text).width / 2)
    }
    async function saveFile(fileName) {
        folder = "./tmp/"
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        fs.writeFileSync(folder + fileName, canvas.toBuffer('image/png'))
    }
}

// start()
module.exports.start = start;
