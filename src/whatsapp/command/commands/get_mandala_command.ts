import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Mandala } from "../../../mandala/mandala";

export class GetMandalaCommand {
    command = "!mandala";
    description = "Gera uma mandala.";

    constructor(private mandala: Mandala) {}

    async execute(client: Whatsapp, message: Message): Promise<void> {
        await client.sendText(message.from, "Pegando sua mandala...");
        const mandala = await this.mandala.getMandala();
        if (!mandala) {
            await client.sendText(message.from, "Mandala não encontrada.");
            return;
        }
        await client.sendText(message.from, mandala);
    }
}