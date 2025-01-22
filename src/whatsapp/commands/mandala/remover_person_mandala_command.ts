import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { WhatsGroups } from "../../core/groups";
import { ICommand } from "../../core/interfaces";

export class RemoverPersonMandalaCommand implements ICommand {
    command = "remover";
    description = "Remove uma pessoa da mandala. Uso: !remover(nome)";
    groups = [WhatsGroups.PULERO];
    constructor(private mandala: Mandala) {}
  
    async execute(client: Whatsapp, message: Message, args?: string): Promise<void> {
      const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
  
      if (!args || args.trim().length === 0) {
        await client.sendText(chatId, "❌ Você precisa informar o nome da pessoa que deseja remover.");
        return;
      }
  
      const person = args.trim();
      const removed = this.mandala.removePerson(person);
  
      if (removed) {
        await client.sendText(chatId, `✅ Pessoa ${person} removida da mandala.`);
      } else {
        await client.sendText(chatId, `⚠️ Pessoa ${person} não encontrada na mandala.`);
      }
    }
  }