const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUk1d0ZyUUgwQ3p3SzNGYUI3SGNwWk9sdmk1eDhpdW1ESTUrMDVZdW4zZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicC9pekZCMVN1SG4xVEtiblgrUHQ0QjdnaGp1QVNVRGJpL2Y2amw5YlNVZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpT3d1NU1SNmF4YXZKVGIrbDdweU1KQTl4enlsR0I4ZXpsKzE4L0NNdTA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaa0grU3RXaHdVWXE5a0ZVTk0xdENEcStMdU4xdUN3bTZJY1FoYTl1d2o0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitHVFBFVklBR2UxdjdISTRqdjltOFl0Z0NuZ082bVgraWRhMjk2dFlFMkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNhL29zUWFjZ0s3d1BjK1VMQkpVeHRJWit0RGxQdU1lZ2o1NVEwSkhreDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT011NDNxeWlwWG1HNzltWTkzelo2aEU5dFFPK1QyVW5OcjJSR2dhTkVHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVFNVcTlLeEtIR0I1SVNybUFLODYwbnFEZExJcEpTcEVBdEoxbFBjbGJCOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR1anY0VWR0N25JTzRBdnZ1WXFZa1NmZHZIOUdkRmRGVDRpVG1hamdjMFlJQnJWaGYvNFFkcmdKNlJQRy9TcHRqN0JUblpXcS9UVTRjanVrd3hZSERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6ImxtUUY3YmVWRDdEczc5ZXZrUnJTZWlJdzJIV0JrVWlTRWx6RVBTM2xrQ0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzU2ODg2NDkyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA1ODgxMkE0OTkxOEU2RjIzMkJCMDJCOTE5RDdDNTM2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk4MjAxODN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTc1Njg4NjQ5MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBMjI0RENERjE4M0E1ODQ5N0UwRDE3NEI0RjA2MThGNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODIwMTg0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyMThwWVZBS1QyNmhqNjF1MFpQTU93IiwicGhvbmVJZCI6IjI2YjVhNWNhLWU5OGEtNGI4Yy05YTI0LWYwZDQyMWFkNDRhMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtenBYV2lQY2ZKVGxPWUQ0VncybExsZmErYjA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWlkRHpZTXZ0Rllud0hEd3lXeGJJTjRpWHZNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZSRURFWlJBIiwibWUiOnsiaWQiOiIyNTU3NTY4ODY0OTI6OTZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiKuKLhuqngeGAr+Gqs/CdlYLwnZWQ8J2Vg/CdlLxf8J2UufCdlYbwnZWQ4YC+4aqz6qeC4oiYKiIsImxpZCI6IjIxMDc4NDY4MDQzMTY5NTo5NkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lam1PQUVFUGJGc01JR0dFNGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxobFZBUTFDdlV2SUprcGdxMkN0eEJld0ZXcHZCVEJHNlE5S0Z3azJWeEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNOcTlsdkJrcVZvVlQ3eFlUKzdTMk1JSnJNeXB1LzloU0FDLzB2bWhRLy8rVTYrYXJET2xiKzY3YnpwRHBJMHRwV2dhWGVQZDVJYlBtVlJ5TEhIOERBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJuU2MyMisxZ2tLMGxZaFp1dHRoMVJVOVJLK0VpOVlkbUFGbnJiY1JhYjlrcVlaWE0wTC9DdytYTkNGY3NXOSs3RjR0VE5hTnZyeDZ2c1RVQzBLZzhDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc1Njg4NjQ5Mjo5NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTNFpWUUVOUXIxTHlDWktZS3RncmNRWHNCVnFid1V3UnVrUFNoY0pObGNTIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDk4MjAxNjQsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTEpLIn0=',
    PREFIXE: process.env.PREFIX || "/",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "~᭡ ꙰𖤛➣KYLE BOY᭡ ꙰𖤛➣",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255756886492",
    DEV : process.env.DEV || "FrediEzra Tz",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    CHAT_BOT : process.env.CHATBOT_INBOX || "no",
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
