import { CreateOptions, Message } from "@wppconnect-team/wppconnect";
import { CommandManager } from "./command_manager";
import { DiceCommand } from "../commands/games/dice_command";
import { EchoCommand } from "../commands/utilities/echo_command";

import { Logger } from "../../helpers/logger";
import { HelloCommand } from "../commands/utilities/hello_command";
const wppconnect = require('@wppconnect-team/wppconnect');

export class WhatsAppServer {
  private commandManager = new CommandManager();
  private logger = new Logger();
  constructor() {
    this.commandManager = new CommandManager("!");
  }

  async start(config: CreateOptions) {
    const client = await wppconnect.create({ ...config});

    this.commandManager.registerCommand(new DiceCommand());
    this.commandManager.registerCommand(new EchoCommand());
    // this.commandManager.registerCommand(new AddPersonMandalaCommand(this.mandala));
    // this.commandManager.registerCommand(new GenerateMandalaCommand(this.mandala));
    // this.commandManager.registerCommand(new GetMandalaCommand(this.mandala));
    // this.commandManager.registerCommand(new GetMandalaCommand(this.mandala));
    // this.commandManager.registerCommand(new RemoverPersonMandalaCommand(this.mandala));
    this.commandManager.registerCommand(new HelloCommand())

    client.onAnyMessage(async (message: Message) => {
      await this.commandManager.handleCommand(client, message);
    });

  }
}
