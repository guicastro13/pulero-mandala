import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../../core/interfaces";
import { WhatsGroups } from "../../core/groups";

export class AddPersonMandalaCommand implements ICommand {
  command = "add";
  description = "Adiciona uma pessoa à mandala. Uso: !add(nome)";
  groups = [WhatsGroups.PULERO];

  constructor(private mandala: Mandala) {}

  async execute(client: Whatsapp, message: Message, args?: string): Promise<void> {
    const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;

    if (args && args.trim().length > 0) {
      const personName = args.trim(); // Usa o argumento como string única
      await this.mandala.addPerson(personName);
      await client.sendText(chatId, `Adicionando o CORNO do ${personName}...`);
    } else {
      await client.sendText(chatId, "❌ Comando incorreto. Use: !add(nome)");
    }
  }
}
