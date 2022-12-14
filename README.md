# Genshin Card
## This tool generates images with your statistics.

|     |Example 1|Example 2|Example 3|Default|
|-----|-----|-----|-----|-----|
|Params|CARD_AVATAR="Ganyu" <br> CARD_BG="bg_3" <br> CARD_LANG="lang_UA"|CARD_AVATAR="Diluc" <br> CARD_BG="bg_9" <br> CARD_LANG="lang_ENG"|CARD_AVATAR="Shenhe" <br> CARD_BG="bg_10" <br> CARD_LANG="lang_RU"|CARD_AVATAR=Default <br> CARD_BG=Default <br> CARD_LANG=Default|
|Immage|![Ganyu UA Card](README/Ganyu_UA.png)|![Diluc ENG Card](README/Diluc_ENG.png)|![Shenhe RU Card](README/Shenhe_RU.png)|![Default Card](README/Default_card.png)


---

## How to use this tool?
**Fork this repository and you can move on to the next step.**

How to configure the app:
- You provide the app with some settings of your HoYoLab website cookies.
- You provide the app with your Telegram bot token
- You launch the app and send a message to the bot, and you'll receive your chat ID in response
- You provide the program with your chat id
- If you have configured the card parameters, they will be applied during generation, if not, then the default parameters will be used during generation
- The bot will send you your stats card


  
### 1) Receiving Your Account Cookies
  <details>
  <summary>Instruction</summary>

1. I'm using Chrome browser, if you're using a different browser, some names may vary.
2. Open the **[get cookies skript](get_cookies.js)** file and copy its contents.
    ```
    var cookie=start();
    var ask=confirm('Cookie: '+cookie+'\n\nClick confirm to copy Cookie.');if(ask==true){copy(cookie);msg=cookie}else{msg='Cancel'}
    function start() {
        return "ltoken=" + getCookie("ltoken") + ";ltuid=" + getCookie("ltuid") + ";";
        function getCookie(name) {
            const value = ";" + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    }
    ```
3. Go to https://www.hoyolab.com/genshin/ then login.
4. Right-click on the page and click on **View Code**, then click on the **Console** tab.
5. Paste the code you copied in the second paragraph and press **Enter**.
6. In the window that appears, click **Ok** and the necessary Cookies will be automatically copied to your clipboard. 
![Cookie copy window](README/HoYoLab/Cookie.png)
</details>

### 2) Create your own Telegram bot
<details>
<summary>Instruction</summary>

1. Open a chat with an official Telegram  bot ([@botfather](https://t.me/botfather)) to create your own bot.
2. Send the bot the command "/newbot" to initiate the process of creating a new bot
3. Come up with a name for your bot, in my case it will be "GenshinCard"
4. Now we need to come up with a nickname for the bot, I chose "GenshinCardExampleBot"
5. In response, we will receive a message containing a link to your bot and an API token
</details>

### 3) Set up variables in GitHub

<details>
<summary>Instruction</summary>

#### Adding cookies

1. Let's add Cookies to the variable, for this go to the following path in the cloned repository
**Settings** -> **Secrets**  -> **Actions**  -> **New repository secret**
![Path to add Cookies to repository variable](README/GitHub/github_1.png)
2. Enter a variable name and Cookies depending on what you want to set up your repository for. 
![Page for adding variables](README/GitHub/github_2.png)
In the first field you need to specify the name of the variable, in the second field Cookies. See examples below.
3. Variable name: `HOYOLAB_COOKIES`, Cookies example: `["ltoken=a**************************************B;ltuid=1******2;","ltoken=c**************************************D;ltuid=3******4;","ltoken=e**************************************F;ltuid=5******6;"]`
In this case, you need to open square brackets `[` list received in the section `Getting your account's Cookies`, Cookies must be in double quotes `"`, separated by commas and then close square brackets `]`.
4. Click the **Add secret** button to add a variable.
![Adding Cookies for Multiple Accounts](README/GitHub/github_2.2.png)

#### Adding API keys of Telegram bot

The first two steps are similar, so let's move on to the third
3. Variable name: `TG_API`, Secret: `5656875323:AAG9KsVrNg02cvBgIbpUOs18htgaPKQehGw`(the API key of your bot)
![Adding Cookies](README/Telegram/TG_API.png)
</details>

### 4) Run the app to get your bot chat ID
<details>
<summary>Instruction</summary>

1. Open "Actions" in a new tab because we will still need the current one.
2. Create an action that will be executed daily at 06:00 (UTC+8)
	**Actions** -> **Card generate**  -> **Run workflow**  -> **Run workflow**
	![Adding Actions](README/GitHub/Add_Action.png)
3. Now go to your telegram bot and run it, if everything is done correctly you will get a message with your ID. Take your time, the bot needs time to install all modules and start. (You can send him any messages to make sure you don't miss a moment when he will be working)
	![Get UID](README/Telegram/YourBot_UID.png)
</details>

### 5) Add a UID variable so the bot knows who to send cards to
<details>
<summary>Instruction</summary>

1. We return to the first tab (do not close the second one, you will also need it a little later)
2. Add another secret, name: `TG_UID`, Secret: `1008299086` (Your UID)
	![Adding TG_UID](README/GitHub/TG_UID.png)
</details> 

### 6) Card settings (optional)
<details>
<summary>Instruction</summary>

#### Avatar settings

1. Choose an avatar
    <details>
    <summary>Show available avatars (53)</summary>

    |   Immage   |    Params    |   Immage   |    Params    |
    | ---------- | ------------ | ---------- | ------------ |
    | ![Albedo](img/avatars/Albedo.png)      | `Albedo`| ![Aloy](img/avatars/Aloy.png)      | `Aloy`|
    | ![Amber](img/avatars/Amber.png)      | `Amber`| ![Arataki_Itto](img/avatars/Arataki_Itto.png)      | `Arataki_Itto`|
    | ![Barbara](img/avatars/Barbara.png)      | `Barbara`| ![Beidou](img/avatars/Beidou.png)      | `Beidou`|
    | ![Bennett](img/avatars/Bennett.png)      | `Bennett`| ![Chongyun](img/avatars/Chongyun.png)      | `Chongyun`|
    | ![Diluc](img/avatars/Diluc.png)      | `Diluc`| ![Diona](img/avatars/Diona.png)      | `Diona`|
    | ![Eula](img/avatars/Eula.png)      | `Eula`| ![Fischl](img/avatars/Fischl.png)      | `Fischl`|
    | ![Ganyu](img/avatars/Ganyu.png)      | `Ganyu`| ![Gorou](img/avatars/Gorou.png)      | `Gorou`|
    | ![Hu_Tao](img/avatars/Hu_Tao.png)      | `Hu_Tao`| ![Jean](img/avatars/Jean.png)      | `Jean`|
    | ![Kaedehara_Kazuha](img/avatars/Kaedehara_Kazuha.png)      | `Kaedehara_Kazuha`| ![Kaeya](img/avatars/Kaeya.png)      | `Kaeya`|
    | ![Kamisato_Ayaka](img/avatars/Kamisato_Ayaka.png)      | `Kamisato_Ayaka`| ![Kamisato_Ayato](img/avatars/Kamisato_Ayato.png)      | `Kamisato_Ayato`|
    | ![Keqing](img/avatars/Keqing.png)      | `Keqing`| ![Klee](img/avatars/Klee.png)      | `Klee`|
    | ![Kujou_Sara](img/avatars/Kujou_Sara.png)      | `Kujou_Sara`| ![Kuki_Shinobu](img/avatars/Kuki_Shinobu.png)      | `Kuki_Shinobu`|
    | ![Lisa](img/avatars/Lisa.png)      | `Lisa`| ![Mona](img/avatars/Mona.png)      | `Mona`|
    | ![Ningguang](img/avatars/Ningguang.png)      | `Ningguang`| ![Noelle](img/avatars/Noelle.png)      | `Noelle`|
    | ![Paimon](img/avatars/Paimon.png)      | `Paimon`| ![Qiqi](img/avatars/Qiqi.png)      | `Qiqi`|
    | ![Raiden_Shogun](img/avatars/Raiden_Shogun.png)      | `Raiden_Shogun`| ![Razor](img/avatars/Razor.png)      | `Razor`|
    | ![Rosaria](img/avatars/Rosaria.png)      | `Rosaria`| ![Sangonomiya_Kokomi](img/avatars/Sangonomiya_Kokomi.png)      | `Sangonomiya_Kokomi`|
    | ![Sayu](img/avatars/Sayu.png)      | `Sayu`| ![Shenhe](img/avatars/Shenhe.png)      | `Shenhe`|
    | ![Shikanoin_Heizou](img/avatars/Shikanoin_Heizou.png)      | `Shikanoin_Heizou`| ![Sucrose](img/avatars/Sucrose.png)      | `Sucrose`|
    | ![Tartaglia](img/avatars/Tartaglia.png)      | `Tartaglia`| ![Thoma](img/avatars/Thoma.png)      | `Thoma`|
    | ![Traveler_Eather](img/avatars/Traveler_Eather.png)      | `Traveler_Eather`| ![Traveler_Lumine](img/avatars/Traveler_Lumine.png)      | `Traveler_Lumine`|
    | ![Venti](img/avatars/Venti.png)      | `Venti`| ![Xiangling](img/avatars/Xiangling.png)      | `Xiangling`|
    | ![Xiao](img/avatars/Xiao.png)      | `Xiao`| ![Xingqiu](img/avatars/Xingqiu.png)      | `Xingqiu`|
    | ![Xinyan](img/avatars/Xinyan.png)      | `Xinyan`| ![Yae_Miko](img/avatars/Yae_Miko.png)      | `Yae_Miko`|
    | ![Yanfei](img/avatars/Yanfei.png)      | `Yanfei`| ![Yelan](img/avatars/Yelan.png)      | `Yelan`|
    | ![Yoimiya](img/avatars/Yoimiya.png)      | `Yoimiya`| ![Yun_Jin](img/avatars/Yun_Jin.png)      | `Yun_Jin`|
    | ![Zhongli](img/avatars/Zhongli.png)      | `Zhongli`|
    </details> 

2. Add a secret with the name `CARD_AVATAR` and the avatar parameter of your choice. For example, I chose `Chongyun`
	![Adding CARD_AVATAR](README/GitHub/CARD_AVATAR.png)

#### Background settings

1. Choose an background
    <details>
    <summary>Show available backgrouns (11)</summary>

    |   Immage   |    Params    |   Immage   |    Params    |
    | ---------- | ------------ | ---------- | ------------ |
    | ![bg_1](img/bg/bg_1.png)      | `bg_1`| ![bg_2](img/bg/bg_2.png)      | `bg_2`|
    | ![bg_3](img/bg/bg_3.png)      | `bg_3`| ![bg_4](img/bg/bg_4.png)      | `bg_4`|
    | ![bg_5](img/bg/bg_5.png)      | `bg_5`| ![bg_6](img/bg/bg_6.png)      | `bg_1`|
    | ![bg_7](img/bg/bg_7.png)      | `bg_7`| ![bg_8](img/bg/bg_8.png)      | `bg_8`|
    | ![bg_9](img/bg/bg_9.png)      | `bg_9`| ![bg_10](img/bg/bg_10.png)      | `bg_10`|
    | ![bg_11](img/bg/bg_11.png)      | `bg_11`| 
    </details> 

2. Add a secret with the name `CARD_BG` and the avatar parameter of your choice. For example, I chose `bg_4`
	![Adding CARD_BG](README/GitHub/CARD_BG.png)

#### Language settings

1. Choose an language
    <details>
    <summary>Show available languages (3)</summary>

    |   Immage   |    Params    |   Immage   |    Params    |
    | ---------- | ------------ | ---------- | ------------ |
    | ![lang_UA](img/lang/lang_UA.png)      | `lang_UA`| ![lang_ENG](img/lang/lang_ENG.png)      | `lang_ENG`|
    | ![lang_RU](img/lang/lang_RU.png)      | `lang_RU`|
    </details> 

2. Add a secret with the name `CARD_LANG` and the avatar parameter of your choice. For example, I chose `lang_UA`
	![Adding CARD_LANG](README/GitHub/CARD_LANG.png)
</details> 



### 7) Let's go to start the action and get our card

<details>
<summary>Instruction</summary>

1. Follow the same steps as in section 4. I've made very detailed comments, so you'll always know what the app is doing right now.
	![App execution](README/GitHub/App_Execution.png)
2. If you did everything correctly, the bot will send you a card to each specified account
	![Cards in chat](README/Telegram/YourBot_Cards.png)
3. Result (Because telegram compresses the image before sending and changes the format to jpg, the background appears in the card. If you send cards without compression, the format will not change)
	![Result](README/Telegram/YourBot_Card.jpg)
</details> 
