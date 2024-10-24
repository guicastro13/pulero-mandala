import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../interface_command";
import { Command } from "../command_decorator";
import { WhatsGroups } from "../command_handler";

@Command({ group: WhatsGroups.PULERO, requires: ["mandala"] })
export class GenerateMandalaCommand implements ICommand {
    command = "!mandala";
    description = "Gera uma mandala.";

    constructor(private mandala: Mandala) {
    }
  
    async execute(client: Whatsapp,message: Message,): Promise<void> {
      await this.mandala.generateMandala();
      await client.sendText(WhatsGroups.PULERO, "Mandala gerada");
    }
  }
  