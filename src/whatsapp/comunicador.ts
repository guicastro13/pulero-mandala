import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ILogger } from "../helpers/logger";
import { Mandala } from "../mandala/mandala";
import { CommandHandler } from "./command/command_handler";
import { PunishSystem } from "../punish_points/punish_points";
import { ICommand } from "./command/interface_command";
import "reflect-metadata";
import * as fs from "fs";
import * as path from "path";

export class Communicator {
  private client: Whatsapp;
  private mandala: Mandala;
  private logger: ILogger;
  private commandHandler: CommandHandler;
  private punisher: PunishSystem;

  constructor(logger: ILogger, client: Whatsapp) {
    this.logger = logger;
    this.client = client;
    this.mandala = new Mandala(this.logger);
    this.commandHandler = new CommandHandler();
    this.punisher = new PunishSystem(this.logger);

    this.registerCommands();
  }

  private registerCommands() {
    const commandsPath = path.resolve(__dirname, "./command/commands");
    fs.readdirSync(commandsPath).forEach((file) => {
      if (file.endsWith(".ts") || file.endsWith(".js")) {
        const commandModule = require(path.join(commandsPath, file));
        Object.values(commandModule).forEach((CommandClass: any) => {
          if (Reflect.getMetadata("isCommand", CommandClass)) {
            const commandInstance: ICommand = new CommandClass(this.mandala, this.punisher);
            this.commandHandler.registerCommand(commandInstance);
          }
        });
      }
    });
  }

  async processCommand(message: Message) {
    this.logger.info(`Recieved command: ${message.body}`);
    if (this.client) {
      await this.commandHandler.handleCommand(this.client, message);
    }
  }
}