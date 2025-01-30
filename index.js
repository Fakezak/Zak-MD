const { default: makeWASocket } = require('@whiskeysockets/baileys');

async function startBot() {
    const sock = makeWASocket({});
    sock.ev.on('connection.update', (update) => {
        if (update.connection === 'open') {
            console.log('Bot connected!');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        const text = message.message?.conversation || '';

        if (text === '.menu' || text === '!menu') {
            await sock.sendMessage(message.key.remoteJid, { react: { text: "😩", key: message.key }});
            await sock.sendMessage(message.key.remoteJid, { text: `@${message.key.participant.split('@')[0]} Here is the bot menu:\n[Your Bot Menu Here]`, mentions: [message.key.participant] });
        }

        if (text === '.owner') {
            await sock.sendMessage(message.key.remoteJid, { text: 'Owner: +1234567890' });
        }
    });
}

startBot();
