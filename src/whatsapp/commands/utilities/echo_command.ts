import { WhatsGroups } from "../../core/groups";
import { ICommand } from "../../core/interfaces";
import { Whatsapp, Message } from "@wppconnect-team/wppconnect";

export class EchoCommand implements ICommand {
  command = "!echo";
  description = "Repete a mensagem enviada pelo usuário.";
  groups = [WhatsGroups.PULERO];

  async execute(client: Whatsapp, message: Message): Promise<void> {
    if (!message.body || !message.chatId) {
      return;
    }
    const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
    const args = message.body.split(" ").slice(1).join(" ");
    await client.sendText(chatId, `🔊 ${args}`);
  }
}


