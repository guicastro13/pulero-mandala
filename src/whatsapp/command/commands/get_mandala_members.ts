import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../interface_command";
import { Command } from "../command_decorator";
import { WhatsGroups } from "../command_handler";

@Command({ group: WhatsGroups.PULERO, requires: ["mandala"] })
export class GetMandalaMembersCommand implements ICommand {
    command = "!mandala_members";
    description = "Lista os membros da mandala.";
  
    constructor(private mandala: Mandala) {}

    async execute(client: Whatsapp): Promise<void> {
        const members = this.mandala.getMembers();
        if (!members) {
            await client.sendText(WhatsGroups.PULERO, "Lista de membros não encontrada.");
            return;
        }
        await client.sendText(WhatsGroups.PULERO, `Membros da mandala: ${members.join(", ")}`);
    }
}