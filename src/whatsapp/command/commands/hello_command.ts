import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ICommand } from "../interface_command";

export class HelloCommand implements ICommand {
    command = "!hello";
    description = "Responde uma mensagem engraçada.";
  
    async execute(client: Whatsapp, message: Message): Promise<void> {
      await client.sendText(message.from, "Ta querendo pica é?");
    }
  }