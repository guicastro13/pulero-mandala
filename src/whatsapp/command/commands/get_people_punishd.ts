import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { PunishSystem } from "../../../punish_points/punish_points";
import { Command } from "../command_decorator";

@Command()
export class GetPeoplePunishdCommand {
    command = "!get_punished";
    description = "Retorna as pessoas que foram multadas.";
    constructor(private punish_system: PunishSystem) {}
    async execute(client: Whatsapp, message: Message): Promise<void> {
        var list  = await this.punish_system.getFormattedTotalPoints()
        await client.sendText(message.from, list);
    }
}