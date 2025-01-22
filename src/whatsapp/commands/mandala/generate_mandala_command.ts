import { Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { WhatsGroups } from "../../core/groups";
import { ICommand } from "../../core/interfaces";

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
  