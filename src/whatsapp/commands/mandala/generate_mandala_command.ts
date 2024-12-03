import { Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../../command/interface_command";
import { WhatsGroups } from "../../core/groups";

export class GenerateMandalaCommand implements ICommand {
    command = "mandala";
    description = "Gera uma mandala.";
    groups = [WhatsGroups.PULERO];

    constructor(private mandala: Mandala) {
    }
  
    async execute(client: Whatsapp): Promise<void> {
      await this.mandala.generateMandala();
      await client.sendText(WhatsGroups.PULERO, "Mandala gerada");
    }
  }
  