import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { PunishSystem } from "../../../punish_points/punish_points";
import { ICommand } from "../interface_command";
import { Command } from "../command_decorator";
import { WhatsGroups } from "../../core/groups";

@Command({ group: WhatsGroups.PULERO ,requires: ["punisher"] })
export class RemoveAllPunishCommand implements ICommand {
    command = "!caducou";
    description = "Remove todas as multas aplicadas.";
    constructor(private punish_system: PunishSystem) {}

    async execute(client: Whatsapp): Promise<void> {
        this.punish_system.clearAllPoints()
        await client.sendText(WhatsGroups.PULERO, `Caducou geral`);
    }
}