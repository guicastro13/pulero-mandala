import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ICommand } from "../../core/interfaces";
import { WhatsGroups } from "../../core/groups";


export class HelloCommand implements ICommand {
    command = "hello";
    description = "Responde uma mensagem engraçada.";
    groups = [WhatsGroups.PULERO];
  
    async execute(client: Whatsapp, message: Message): Promise<void> {
    const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
      await client.sendText(chatId, "Ta querendo pica é?!🐛");
    }
  }