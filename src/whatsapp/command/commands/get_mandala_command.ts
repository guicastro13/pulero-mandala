import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { Command } from "../command_decorator";
import { WhatsGroups } from "../command_handler";

@Command({ group: WhatsGroups.PULERO, requires: ["mandala"] })
export class GetMandalaCommand {
    command = "!get_mandala";
    description = "Pega uma mandala gerada.";

    constructor(private mandala: Mandala) {}

    async execute(client: Whatsapp, message: Message): Promise<void> {
        await client.sendText(WhatsGroups.PULERO, "Pegando sua mandala...");
        const mandala = await this.mandala.getMandala();
        if (!mandala) {
            await client.sendText(WhatsGroups.PULERO, "Mandala não encontrada.");
            return;
        }
        await client.sendText(WhatsGroups.PULERO, mandala);
    }
}