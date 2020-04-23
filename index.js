const axios = require("axios");
const Telegraf = require("telegraf");

let BOT_TOKEN = "10xxxx:AAEWxxxxx";
let api_key = "xxx";
let api_url = "https://xxxx/nik";

const bot = new Telegraf(BOT_TOKEN);
bot.hears(/ktp (.+)/, async (ctx) => {
    console.log(ctx);
    console.log(ctx.match[1]);

    let params = {
        nik: ctx.match[1],
        api_key: api_key,
    };
    let data = await getKtp(params);
    console.log(data.data.content);
    ctx.reply(await fetch(data.data.content));
});
bot.startPolling();

async function fetch(data) {
    let message = "";
    if (data) {
        message =
            "Data KTP Anda : \n" +
            "Nik:  " +
            data.nik +
            " \n" +
            "Nama: " +
            data.nama +
            " \n" +
            "Alamat: " +
            data.alamat +
            " " +
            data.kec +
            " " +
            data.kab +
            " " +
            data.kel +
            " \n" +
            "TTL: " +
            data.ttl +
            " \n" +
            "Pekerjaan: " +
            data.pekerjaan +
            " \n" +
            "Gol Darah: " +
            data.gol_darah +
            " \n";
    }
    console.log(message);
    return message;
}
async function getKtp(params) {
    let res = await axios
        .post(api_url, params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
}