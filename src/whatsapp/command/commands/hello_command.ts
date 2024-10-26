import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ICommand } from "../interface_command";
import { Command } from "../command_decorator";
import { WhatsGroups } from "../command_handler";

@Command({ group: WhatsGroups.PULERO, requires: [] })
export class HelloCommand implements ICommand {
    command = "!hello";
    description = "Responde uma mensagem engraçada.";
  
    async execute(client: Whatsapp): Promise<void> {
      await client.sendText(WhatsGroups.PULERO, "Ta querendo pica é?!");
    }
  }