import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../interface_command";
import { Command } from "../command_decorator";
import { WhatsGroups } from "../command_handler";

@Command({ group: WhatsGroups.PULERO, requires: ["mandala"] })
export class AddPersonMandalaCommand implements ICommand {
    command = "!add";
    description = "Adiciona uma pessoa à mandala. Uso: !add(nome)";
 
    constructor(private mandala: Mandala) {}
  
    async execute(client: Whatsapp, message: Message, args: string): Promise<void> {
      if (args) {
        await this.mandala.addPerson(args);
        await client.sendText(WhatsGroups.PULERO, `Adicionando o cornno do ${args}...`);
      } else {
        await client.sendText(WhatsGroups.PULERO, "Ta errado o comando.");
      }
    }
  }
  