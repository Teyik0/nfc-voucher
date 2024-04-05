import express from 'express';
import http from 'http';
import { NFC, KEY_TYPE_A } from 'nfc-pcsc';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const nfc = new NFC();

nfc.on('reader', reader => {
    console.log(`${reader.reader.name} device attached`);

    reader.on('card', async (card) => {
        console.log(`Card detected`, card);

        try {
            const key = Buffer.from("FFFFFFFFFFFF", "hex");
            const blockNumber = 4; // Le bloc où les données ont été écrites précédemment

            await reader.authenticate(blockNumber, KEY_TYPE_A, key);
            console.log("Authentification réussie pour la lecture");

            const dataRead = await reader.read(blockNumber, 16); // Assurez-vous que la taille est correcte
            console.log("Data read from the card:", dataRead.toString('ascii')); // Affiche les données lues

            console.log("Data read from the card:", dataRead);
            console.log("Hex representation:", dataRead.toString('hex'));

            // Envoie les données lues via WebSocket
            io.emit('cardDetected', { uid: card.uid, data: dataRead.toString('ascii') });
        } catch (err) {
            console.error('Error reading from card:', err);
        }
    });

    reader.on('error', err => {
        console.error(`Error occurred`, err);
    });

    reader.on('end', () => {
        console.log(`Reader ${reader.reader.name} removed`);
    });

    io.on('connection', (socket) => {
        socket.on('writeToCard', async (data) => {
            console.log('Data to write:', data);
            const blockSize = 16;
            let dataBuffer = Buffer.alloc(blockSize, ' '); 
            dataBuffer.write(data, 0, 'ascii'); 

            try {
                const key = Buffer.from("FFFFFFFFFFFF", "hex");
                const blockNumber = 4;

                await reader.authenticate(blockNumber, KEY_TYPE_A, key);
                console.log("Authentification réussie");

                await reader.write(blockNumber, dataBuffer, 16);
                console.log("Écriture réussie");

                socket.emit('writeSuccess', `Data written to the card: ${data}`);
            } catch (err) {
                console.error('Error writing to card:', err);
                socket.emit('writeError', `Error writing to card: ${err.message}`);
            }
        });
    });
});

nfc.on('error', err => {
    console.error(`An error occurred`, err);
});

server.listen(3001, () => {
    console.log('NFC Server running on http://localhost:3001');
});
