
import { Whatsapp, Message } from "@wppconnect-team/wppconnect";
import { ICommand } from "../../core/interfaces";
import { WhatsGroups } from "../../core/groups";

export class DiceCommand implements ICommand {
  command = "dice";
  description = "Rola um dado e retorna o resultado.";
  groups = [WhatsGroups.PULERO];

  async execute(client: Whatsapp, message: Message): Promise<void> {
    const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
    const result = Math.floor(Math.random() * 6) + 1;
    await client.sendText(chatId, `🎲 Você rolou: ${result}`);
  }
}
