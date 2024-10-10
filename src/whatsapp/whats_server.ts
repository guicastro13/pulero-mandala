import { Communicator } from "./comunicador";

const wppconnect = require('@wppconnect-team/wppconnect');

export class WhatsServer{
    client: any;
    constructor() {
    this.client = null;
    this.init();
  }

  async init() {
    try {
      this.client = await wppconnect.create({
        headless: true,
        logQR: true,
        updatesLog: false,
        phoneNumber: process.env.PHONE_NUMBER,
        catchLinkCode: (str: any) => console.log('Code: ' + str),
    });
      console.log("WhatsApp server started");
      this.listenForMessages();
    } catch (error) {
      console.error("Error initializing WhatsApp server: ", error);
    }
  }

  listenForMessages() {
    if (!this.client) {
      console.error("WhatsApp client not initialized.");
      return;
    }

    this.client.onMessage((message: any) => {
      this.handleMessage(message);
    });
  }

  handleMessage(message: any) {
    const communicator = new Communicator(this.client);
    communicator.processCommand(message);
  }
}