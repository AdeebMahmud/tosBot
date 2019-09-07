const Bot = require('keybase-bot');

const bot = new Bot();

const username = 'tosbot';
const paperkey = require('./creds.json');

function messageSent() {}

function buildDrawPage() {
    drawPages = [] //key value pair unique Id and subscriber
    
    return URL;
}
/*function findKeywords(TOS) {
    const keywords = ["credit card", "address", "history","age","personal","street","city"];
    var TOSArray = TOS.split(" ");
    var output = [];
    var i;
    var firstPeriod = 0;
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
            output.push(TOSArray.slice(TOSArray[firstPeriod+1],TOSArray[nextPeriod]));
        }
    return output;
    }
}*/

bot
  .init(username, paperkey.paperkey, {verbose: false})
  .then(() => {
    console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)
    
    var finalMessage = "";
    
    bot.chat.watchAllChannelsForNewMessages(message => {
      
        const channel = message.channel;
        
        if(message[0,4] == '!draw') {
            bot.chat.send(channel, {body: URL}).then(messageSent);
        };
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