import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { ICommand } from "../interface_command";
import { Command } from "../command_decorator";

@Command()
export class GetMandalaMembersCommand implements ICommand {
    command = "!mandala_members";
    description = "Lista os membros da mandala.";
  
    constructor(private mandala: Mandala) {}

    async execute(client: Whatsapp, message: Message): Promise<void> {
        const members = this.mandala.getMembers();
        if (!members) {
            await client.sendText(message.from, "Lista de membros não encontrada.");
            return;
        }
        await client.sendText(message.from, `Membros da mandala: ${members.join(", ")}`);
    }
}