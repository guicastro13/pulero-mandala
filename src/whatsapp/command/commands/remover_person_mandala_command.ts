import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../interface_command";

export class RemoverPersonMandalaCommand implements ICommand {
    command = "!remover";
    description = "Remove uma pessoa da mandala. Uso: !remover(nome)";
  
    constructor(private mandala: Mandala) {}
  
    async execute(client: Whatsapp, message: Message, args?: string): Promise<void> {
      if (!args) {
        await client.sendText(message.from, "Você precisa informar o nome da pessoa que deseja remover.");
        return;
      }
  
      const person = args.trim();
      const removed = this.mandala.removePerson(person);
  
      if (removed) {
        await client.sendText(message.from, `Pessoa ${person} removida da mandala.`);
      } else {
        await client.sendText(message.from, `Pessoa ${person} não encontrada na mandala.`);
      }
    }
  }