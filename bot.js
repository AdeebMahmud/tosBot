const Bot = require('keybase-bot');

const bot = new Bot();
const keywords = ["credit card", "address", "history","age","personal","street","city"];
const username = 'tosbot';
const paperkey = require('./creds.json');

function findKeywords(TOS) {
    var TOSArray = TOS.split(" ");
    var output = [];
    var i;
    var lastPeriod = 0;
    var nextPeriod = 0;
    //Cycle through each word in array and find the first period.
    for (i = 0; i < TOSArray.length; i++) {
        if (TOSArray[i][-1] === "."){
            firstPeriod = i;
        }
        // If there exists a keyword loop through the array from firstPeriod until another period is found. Then break.
        if (keywords.includes(TOSArray[i]) || keywords.includes(TOSArray[i].slice(0,-1))) {
            
            for (var j = firstPeriod; j < TOSArray.length; j++){
                if (TOSArray[j][-1] === "."){
                    nextPeriod = j;
                    break
                }
            }
            // Output each word from period to period (forming a sentence with a keyword in it)
            output.push(TOSArray.slice(TOSArray[firstPeriod+1,nextPeriod]));
        }
    return output;
    }
}
bot
  .init(username, paperkey, {verbose: false})
  .then(() => {
    console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)

    const channel = {name: 'tosbot,' + bot.myInfo().username, public: false, topicType: 'chat'}
    const message = {
      body: `Hello kbot! This is ${bot.myInfo().username} saying hello from my device ${bot.myInfo().devicename}`,
    }
    // User command to paste in Terms of Service
    bot.chat.read(channel).then((message) => {
        if (message[0] == "#") {
            var TOS = message.slice(1);
        }
    })

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