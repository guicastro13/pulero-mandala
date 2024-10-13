import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ILogger } from "../helpers/logger";
import { Mandala } from "../mandala/mandala";
import { CommandHandler } from "./command/command_handler";
import { HelloCommand } from "./command/commands/hello_command";
import { MandalaCommand } from "./command/commands/mandala_command";
import { AddPersonMandalaCommand } from "./command/commands/add_person_mandala_command";
import { RemoverPersonMandalaCommand } from "./command/commands/remover_person_mandala_command";


export class Communicator {
  client?: Whatsapp;
  mandala: Mandala;
  logger: ILogger;
  commandHandler: CommandHandler;

  constructor(logger: ILogger, client?: Whatsapp) {
    this.logger = logger;
    this.client = client;
    this.mandala = new Mandala(this.logger);
    this.commandHandler = new CommandHandler();

    this.registerCommands();
  }

  private registerCommands() {
    this.commandHandler.registerCommand(new HelloCommand());
    this.commandHandler.registerCommand(new MandalaCommand(this.mandala));
    this.commandHandler.registerCommand(new AddPersonMandalaCommand(this.mandala));
    this.commandHandler.registerCommand(new RemoverPersonMandalaCommand(this.mandala));
  }

  async processCommand(message: Message) {
    this.logger.info(`Recieved command: ${message.body}`);
    if (this.client) {
      await this.commandHandler.handleCommand(this.client, message);
    }
  }
}