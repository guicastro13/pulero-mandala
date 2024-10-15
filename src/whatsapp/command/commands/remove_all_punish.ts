import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { PunishSystem } from "../../../punish_points/punish_points";
import { ICommand } from "../interface_command";

export class RemoveAllPunishCommand implements ICommand {
    command = "!caducou";
    description = "Remove todas as multas aplicadas.";
    constructor(private punish_system: PunishSystem) {}

    async execute(client: Whatsapp,message: Message): Promise<void> {
        this.punish_system.clearAllPoints()
        await client.sendText(message.from, `Caducou geral`);
    }
}