import { CreateOptions, Message, StatusFind, Whatsapp } from "@wppconnect-team/wppconnect";
import { ILogger } from "../helpers/logger";
import { Communicator } from "./comunicador";
import QRCode from 'qrcode'
var qrcode = require('qrcode-terminal');

const wppconnect = require('@wppconnect-team/wppconnect');

export class WhatsServer{
    private whatsApp!: Whatsapp;
    private logger: ILogger;
    public status:  StatusFind = StatusFind.notLogged;
    public porcent: number = 0;
    public messageLoading = '';
    constructor(logger: ILogger) {
    this.logger = logger;
  }
 
  async start(config: CreateOptions) {
    try {
      this.whatsApp = await wppconnect.create({
        ...config,
        statusFind: (status: StatusFind, session: string) => {this.statusFind(status, session)},
        catchQR: (qrCode: string, asciiQR: string, attempt: number, urlCode?: string) => {this.catchQR(urlCode)},
        onLoadingScreen: (percent: number, message: string) => {this.onLoadingScreen(percent, message)}
    });
      this.logger.info("WhatsApp server started");
      this.listenForMessages();
    } catch (error) {
      this.logger.error("Error initializing WhatsApp server: ");
    }
  }

  private statusFind(status: StatusFind, session: string) {
    this.logger.info(`Status find: ${status}`);
    this.status = status;
  }
  private catchQR(urlCode?: string) {
    QRCode.toString(urlCode ?? '', { type: 'terminal' }, function (err, url) {
      console.log(url)
    });
  }
  private onLoadingScreen(percent: number, message: string) {
    this.porcent = percent;
    this.messageLoading = message;
    this.logger.info(`Loading: ${percent} - ${message}`);
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
    const communicator = new Communicator(this.logger, this.whatsApp);
    communicator.processCommand(message);
  }
}