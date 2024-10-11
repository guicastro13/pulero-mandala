import { CreateOptions, Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ILogger } from "../helpers/logger";
import { Communicator } from "./comunicador";
const wppconnect = require('@wppconnect-team/wppconnect');
export class WhatsServer{
    public whatsApp?: Whatsapp;
    private logger: ILogger;
    constructor(logger: ILogger) {
    this.logger = logger;
  }
  async start(config: CreateOptions) {
    try {
      this.whatsApp = await wppconnect.create(config);
      this.logger.info("WhatsApp server started");
      this.listenForMessages();
    } catch (error) {
      this.logger.error("Error initializing WhatsApp server: ");
    }
  }
  private listenForMessages() {
    if (!this.whatsApp) {
      this.logger.error("WhatsApp client not initialized.");
      return;
    }

    this.whatsApp.onAnyMessage((message: Message) => {
      this.handleMessage(message);
    });
  }

  private handleMessage(message: Message) {
    const communicator = new Communicator(this.whatsApp, this.logger);
    communicator.processCommand(message);
  }
}