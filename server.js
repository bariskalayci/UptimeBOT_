require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("Nzc4MzAxMzExNDkzMzQxMjA1.X7P_lA.6fBr9-x90zXg_AwOJMbyc42nNy0");
const fetch = require("node-fetch");
const fs = require("fs");

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Başarıyla Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

client.on("ready", () => {
  client.user.setActivity(`ch!ekle - ch!yardım Cheeis | Uptime BOT`);
  console.log(`Logined`);
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "ch!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send(
            "**Bu Projeyi Zaten Önceden Koymuşsun!**"
          );

        let yardım = new Discord.RichEmbed()
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription("**Artık İstediğin Proje 7/24!**")
          .setFooter(`${client.user.username}`)
          .setTimestamp();
        message.channel.send(yardım).then(msg => msg.delete(60000));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        let yardım = new Discord.RichEmbed()
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription("**Hata! Sadece düzgün url'ler ekleyebilirsiniz.**")
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        return message.channel.send(yardım).then(msg => msg.delete(60000));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "ch!botsay") {
    var link = spl[1];
    message.channel.send(`**${db.get("linkler").length} / 1000**`);
  }
});

const Discord = require("discord.js");

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "ch!yardım") {
    let embed = new Discord.RichEmbed()
      .setColor("#070706")
      .setDescription(
        `**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 1-5 dk bekleyin.**

 **ch!yardım** : Botun yardım menüsünü açar.

 **ch!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.

**ch!botsay** : Bot'umuzla uptime olan proje sayısını gösterir.

**sc!botbilgi** : Bot'un istastistik verilerini gösterir.`
      )
      .setAuthor(`Cheeis Uptime | Yardım Menüsü`, client.user.avatarURL)
      .setFooter(`Cheeis Uptime Botu`);
    return message.channel.send(embed);
  }
});
const log = message => {
  console.log(`${message}`);
};

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "ch!botbilgi") {
    var link = spl[1];
    message.channel.send(`**Çok yakında eklenecek!**`);
  }
});
//////////////////////////////////////

client.on("ready", () => {
  client.channels.get("778686616763891722").join();
});
