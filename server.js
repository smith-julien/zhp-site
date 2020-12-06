const dotenv = require('dotenv').config();

const Discord = require("discord.js");
const config = require("./config.js");

console.log(config)

const client = new Discord.Client();

const fetch = require('node-fetch');

const AsciiTable = require('ascii-table')


const url = "https://www.zwiftpower.com/api3.php?do=team_riders&id=11815";

const settings = { method: "Get" };


const prefix = "!";

client.on("message", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();


  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  if (command === "hello") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Hello! je suis le bot Zwift mes commandes sont ping, sum, hello, team,... (bientôt de nouvelles vont arriver)`);
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
  else if (command === "team") {
    fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
        const table = new AsciiTable('Listes de coureurs de la Team ZHP')
        table.setHeading('Nom', 'P20min Watts', 'P20min Watts/Kg');
        table.setAlign(2, AsciiTable.RIGHT).setAlign(1, AsciiTable.RIGHT)
        json.data.forEach(element => {
          table.addRow(element.name, element.h_1200_watts, element.h_1200_wkg);
        });
        //table.setJustify()
        console.log(table.toString())
        message.channel.send(table.toString())
      });
  }
});

client.login(config.BOT_TOKEN);

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});