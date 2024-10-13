import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../interface_command";

export class MandalaCommand implements ICommand {
    command = "!mandala";
    description = "Gera uma mandala.";
  
    constructor(private mandala: Mandala) {}
  
    async execute(client: Whatsapp, message: Message): Promise<void> {
      await client.sendText(message.from, "Gerando sua mandala...");
      await this.mandala.generateMandala();
    }
  }
  