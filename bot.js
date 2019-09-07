const Bot = require('keybase-bot');

const bot = new Bot();
const username = 'tosbot';
const paperkey = require('./creds.json');
bot
  .init(username, paperkey, {verbose: false})
  .then(() => {
    console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)

    const channel = {name: 'tosbot,' + bot.myInfo().username, public: false, topicType: 'chat'}
    const message = {
      body: `Hello kbot! This is ${bot.myInfo().username} saying hello from my device ${bot.myInfo().devicename}`,
    }

    bot.chat
      .send(channel, message)
      .then(() => {
        console.log('Message sent!')
        bot.deinit()
      })
      .catch(error => {
        console.error(error)
        bot.deinit()
      })
  })
  .catch(error => {
    console.error(error)
    bot.deinit()
  })