core = require('@actions/core');
puppeteer = require('puppeteer');
selectors = require('./selectors.json');
require('dotenv').config()

var headless = false;
// headless = true;

async function start(str) {
    cookies = []
    id = ""
    str = str.split(";")
    str.forEach(el => {
        if (el.trim().length > 0) {
            a = el.split("=")
            cookies.push({ name: a[0], value: a[1] })
        }
    });

    console.log("Trying to launch a browser");
    try {
        browser = await puppeteer.launch({ headless: headless });
        page = (await browser.pages())[0];
    } catch (error) {
        console.log(error);
        core.setFailed('Failed to launch browser!');
        await closeBrowser();
        return false
    }

    url = `https://act.hoyolab.com/app/community-game-records-sea/index.html#/ys`;

    console.log("Authentication attempt using cookies");
    try {
        for (let cookie of cookies) {
            console.log(" Setting cookies: ", cookie.name);
            page.setCookie({
                'name': cookie.name,
                'value': cookie.value,
                'domain': ".hoyolab.com"
            });
        }
    } catch (error) {
        console.log(error);
        core.setFailed('Failed to set cookies!');
        await closeBrowser();
        return false
    }

    console.log("Trying to open the HoYoLAB site");
    try {
        await page.goto(url)
    } catch (error) {
        console.log(error);
        core.setFailed('The site could not be opened');
        await closeBrowser();
        return false
    }

    console.log("Trying to find a key element on the page to confirm authorization");
    try {
        await page.waitForSelector(selectors.Summary.Days_Active)
    } catch (error) {
        console.log(error);
        core.warning(" The required page element was not found");
        core.setFailed('Oops, looks like we failed to authenticate');
        await closeBrowser();
        return false
    }

    console.log("Attempting to retrieve user data");
    try {
        User = await getUserData(selectors.userData)
    } catch (error) {
        console.log(error);
        core.setFailed('User data could not be retrieved. Please check the error code and inform the developer.');
        await closeBrowser();
        return false
    }

    console.log("Attempting to retrieve user statistics");
    try {
        Summary = await getSummary(selectors.Summary)
    } catch (error) {
        console.log(error);
        core.setFailed('Statistics could not be retrieved. Please check the error code and inform the developer.');
        await closeBrowser();
        return false
    }



    async function getSummary(selector) {
        return result = {
            "Days_Active": await getElText(selector.Days_Active),
            "Achievements": await getElText(selector.Achievements),
            "Characters": await getElText(selector.Characters),
            "Waypoints_Unlocked": await getElText(selector.Waypoints_Unlocked),
            "Anemoculi": await getElText(selector.Anemoculi),
            "Geoculi": await getElText(selector.Geoculi),
            "Electroculi": await getElText(selector.Electroculi),
            "Dendroculi": await getElText(selector.Dendroculi),
            "Domains_Unlocked": await getElText(selector.Domains_Unlocked),
            "Spiral_Abyss": await getElText(selector.Spiral_Abyss),
            "Luxurious_Chests_Opened": await getElText(selector.Luxurious_Chests_Opened),
            "Precious_Chests_Opened": await getElText(selector.Precious_Chests_Opened),
            "Exquisite_Chests_Opened": await getElText(selector.Exquisite_Chests_Opened),
            "Common_Chests_Opened": await getElText(selector.Common_Chests_Opened),
            "Number_of_Remarkable_Chests": await getElText(selector.Number_of_Remarkable_Chests),
        };
    }
    async function getUserData(selector) {
        // await page.waitForSelector(selector.close)
        // await page.click(selector.close)
        
        await page.waitForSelector(selector.name)
        userName = await getElText(selector.name)
        info = (await getElText(selector.info)).trim()
        server = info.split("Server")[0].trim()
        return {
            Name: userName,
            Server: server,
            lvl: info.split("Lv.")[1].trim(),
            // Info: info,
            id: await getUserId(server)
        }
    }
    async function getElText(selector) {
        await page.waitForSelector(selector);
        return page.evaluate(new Function(`return new Promise(resolve => {
            resolve(document.querySelector('${selector}').innerText)
        });`));
    }
    async function getUserId(server) {
        fetch = await browser.newPage();
        await fetch.goto("https://api-account-os.hoyolab.com/binding/api/getUserGameRolesByLtoken?game_biz=hk4e_global")
        res = JSON.parse(await fetch.evaluate(new Function(`return new Promise(resolve => {resolve(document.querySelector('body').innerText)});`))).data.list;
        // console.log(res);
        await fetch.close()
        res.forEach(el => {
            if (el.region_name.includes(server)) {
                res = el.game_uid
            }
        });
        return res
    }
    
    await closeBrowser();

    return {
        User: User,
        Summary: Summary
    }

    async function closeBrowser() {
        console.log("Trying to close the browser");
        try {
            await page.close();
            await browser.close();
        } catch (error) {
            console.log(error);
            core.warning("Failed to close browser. Don't worry, it will disappear when the action is finished, it should not affect the operation of the program");
        }
    }
}

module.exports.start = start;
