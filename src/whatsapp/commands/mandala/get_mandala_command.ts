import { Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";
import { WhatsGroups } from "../../core/groups";

export class GetMandalaCommand {
    command = "get_mandala";
    description = "Pega uma mandala gerada.";
    groups = [WhatsGroups.PULERO];

    constructor(private mandala: Mandala) {}

    async execute(client: Whatsapp): Promise<void> {
        await client.sendText(WhatsGroups.PULERO, "Pegando sua mandala...");
        const mandala = await this.mandala.getMandala();
        if (!mandala) {
            await client.sendText(WhatsGroups.PULERO, "Mandala não encontrada.");
            return;
        }
        await client.sendText(WhatsGroups.PULERO, mandala);
    }
}