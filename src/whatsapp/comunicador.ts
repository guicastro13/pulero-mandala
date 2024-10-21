import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ILogger } from "../helpers/logger";
import { Mandala } from "../mandala/mandala";
import { CommandHandler } from "./command/command_handler";
import { HelloCommand } from "./command/commands/hello_command";
import { GenerateMandalaCommand } from "./command/commands/generate_mandala_command";
import { AddPersonMandalaCommand } from "./command/commands/add_person_mandala_command";
import { RemoverPersonMandalaCommand } from "./command/commands/remover_person_mandala_command";
import { GetMandalaMembersCommand } from "./command/commands/get_mandala_members";
import { GetMandalaCommand } from "./command/commands/get_mandala_command";
import { GetPeoplePunishdCommand } from "./command/commands/get_people_punishd";
import { PunishSystem } from "../punish_points/punish_points";
import { PunishPersonCommand } from "./command/commands/punish_person";
import { RemoveAllPunishCommand } from "./command/commands/remove_all_punish";

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
    this.commandHandler.registerCommand(new HelloCommand());
    this.commandHandler.registerCommand(new GenerateMandalaCommand(this.mandala));
    this.commandHandler.registerCommand(new AddPersonMandalaCommand(this.mandala));
    this.commandHandler.registerCommand(new RemoverPersonMandalaCommand(this.mandala));
    this.commandHandler.registerCommand(new GetMandalaMembersCommand(this.mandala));
    this.commandHandler.registerCommand(new GetMandalaCommand(this.mandala));
    this.commandHandler.registerCommand(new PunishPersonCommand(this.punisher));
    this.commandHandler.registerCommand(new GetPeoplePunishdCommand(this.punisher));
    this.commandHandler.registerCommand(new RemoveAllPunishCommand(this.punisher));
  }

  async processCommand(message: Message) {
    this.logger.info(`Recieved command: ${message.body}`);
    if (this.client) {
      await this.commandHandler.handleCommand(this.client, message);
    }
  }
}