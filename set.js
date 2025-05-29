const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-MD-XFORCE😜<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ09jQmREelNoeGdpUVIvWkJIUUhJNWN3THVZbFpmS2ozNnJ6VmxKdERrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzlRc3lta29NTFZZU1NISXprajFxNHBtVm5xNE5keXNkR1VjOVZPRDJnQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RVNuenJGV2xKMFZCUFNEb09IVVZjaUVFS1orZ2FpL0xMTmxvdnhFQzNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmQURzRmt3K2RMTERORzgzM09OWVRQZEZVV3BHWVVQcjJqZ1A1WUpET1JjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVKTnhFMCtqZ0pOTEE5Q3NmWGN2NGV3Mi9JaGRCenJKWVBDYjdFSldtMjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijk3U1JRMTBCd3JlYTlFQ2sydDZDeDIyeWRDdzBNSkVEcWkxMnRFT295aDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU15TDFKbXRVZzhFQlBvTGEwbk9HWjkyNXVoNjB5SkhUVEJxYVJ6RHVIUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVJTcitnbWV0R2dWU3lZRHFCRk1ocWprWGJMUEJ4T1VUeXRlcHJwYk5rRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Img1VzB4ekNBUE1pL3pTUmV5ejJqWjMvMmhtOVJNMlF3RmxpY0VyQ3F1Z2txTEpZQjFnR2ZWbkhvY2VITStPU0ZJMVpCU1owaFhNdHU3aFh2bmZ2NERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjIsImFkdlNlY3JldEtleSI6IlpjMWJDbXc2VjRYM1VYZEFkZldlYkFldjVVdmdoM3pmZnh6V2hMVVl6NUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImF3SGVqZ1ZGU3VTZ3owYTZ0dFVmbUEiLCJwaG9uZUlkIjoiOWUwYTNkNWEtZjcxMy00N2ZjLWEwNDMtMWM3NTcyNzk3ZDlhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNGZDhFRG9vRVV2YmlyUy9jSC9vSjlwa0NnND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOZTZFZDV3dmNqU2J4aWdLK29KT294ZGd6NzQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjI1NTc1Njg4NjQ5Mjo3NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIq4ouG6qeB8JOKiPCdlYLwnZWQ8J2Vg/CdlLxfIOC8hOGthPCdlLnwnZWG8J2VkOKLhuGhleGgteGgiuGhg+C7iOChmuCgouCgmOK4neC7iOCgoeGgit+v4aGB4KCj4KCY4aCK4aCK4KCi4KCY5rCU5Lqg6qeC4oiYKiIsImxpZCI6IjIxMDc4NDY4MDQzMTY5NTo3NkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lam1PQUVFUDZsNHNFR0dERWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxobFZBUTFDdlV2SUprcGdxMkN0eEJld0ZXcHZCVEJHNlE5S0Z3azJWeEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBtSGQ4SVUzcUE3N0lkaXFMYlVoMkQzSDBXYzFWcUxzRFprSXppZ3RUemg1TUVvcUY0OUcwUmhReXNIcnNPYmZydUdMSHhpUWNuNnlSSklGSEtUb0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3eTM2bU5WVHJEajVOUmFFc3FlcHFQOUFic2tNVXY3Y3grRmFkTFN6SnVoTEZyMkprU2RxY0FSckVqSXVkUzRSRnhSNHFIK3Jzcy9JTGpPaDMzcWJBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc1Njg4NjQ5Mjo3NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTNFpWUUVOUXIxTHlDWktZS3RncmNRWHNCVnFid1V3UnVrUFNoY0pObGNTIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDg1MzgxMjQsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTEpLIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "KYLE",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255756886492",  
              
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
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️LUCKY-MD-XFORCE☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "☢️LUCKY-MD-XFORCE☢️",
    BOT : process.env.BOT_NAME || '☢️LUCKY-MD-XFORCE☢️⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dar_Es_Salam", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
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
