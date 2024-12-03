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
  private commandHandlers: Map<string, CommandHandler>;
  private punisher: PunishSystem;

  constructor(logger: ILogger, client: Whatsapp) {
    this.logger = logger;
    this.client = client;
    this.mandala = new Mandala(this.logger);
    this.commandHandlers = new Map();
    this.punisher = new PunishSystem(this.logger);

    this.registerCommands();
  }

  private registerCommands() {
    const commandsPath = path.resolve(__dirname, "./command/commands");
    fs.readdirSync(commandsPath).forEach((file) => {
        if (file.endsWith(".ts") || file.endsWith(".js")) {
          const commandModule = import(path.join(commandsPath, file));
            Object.values(commandModule).forEach((CommandClass: any) => {
                if (Reflect.getMetadata("isCommand", CommandClass)) {
                    const dependencies: string[] = Reflect.getMetadata("dependencies", CommandClass) || [];
                    const groupIdentifier = Reflect.getMetadata("group", CommandClass) || "default";
                    const args = dependencies.map(dep => {
                        switch(dep) {
                            case "mandala": return this.mandala;
                            case "punisher": return this.punisher;
                            default: throw new Error(`Dependência desconhecida: ${dep}`);
                        }
                    });

                    const commandInstance: ICommand = new CommandClass(...args);
                    if (!this.commandHandlers.has(groupIdentifier)) {
                      this.commandHandlers.set(groupIdentifier, new CommandHandler(this.logger));
                    }
                    this.commandHandlers.get(groupIdentifier)!.registerCommand(commandInstance);
                }
            });
        }
    });
  } 

  async processCommand(message: Message) {
    this.logger.info("PROCESSING MESSAGE");
    const groupIdentifier = this.extractGroupIdentifier(message);
    const commandHandler = this.commandHandlers.get(groupIdentifier) || this.commandHandlers.get("default");
    if (commandHandler && this.client) {
      await commandHandler.handleCommand(this.client, message);
    }
  }
  private extractGroupIdentifier(message: Message): string {
    const chatId = message.chatId;
    if (typeof chatId === "string") {
      this.logger.info(`CHATID: ${chatId}`)
      return chatId
    }
    return "default";
  }
}