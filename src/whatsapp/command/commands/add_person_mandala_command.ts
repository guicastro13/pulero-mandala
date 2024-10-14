import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../interface_command";

export class AddPersonMandalaCommand implements ICommand {
    command = "!add";
    description = "Adiciona uma pessoa à mandala. Uso: !add(nome)";
 
    constructor(private mandala: Mandala) {}
  
    async execute(client: Whatsapp, message: Message, args: string): Promise<void> {
      if (args) {
        await this.mandala.addPerson(args);
        await client.sendText(message.from, `Adicionando esse corno ${args}...`);
      } else {
        await client.sendText(message.from, "Ta errado o comando.");
      }
    }
  }
  