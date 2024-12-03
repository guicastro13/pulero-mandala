import { Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../../command/interface_command";
import { WhatsGroups } from "../../core/groups";

export class GetMandalaMembersCommand implements ICommand {
    command = "mandala_members";
    description = "Lista os membros da mandala.";
    groups = [WhatsGroups.PULERO];
  
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