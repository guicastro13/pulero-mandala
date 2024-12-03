import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { PunishSystem } from "../../../punish_points/punish_points";
import { Command } from "../command_decorator";
import { WhatsGroups } from "../../core/groups";

@Command({ group: WhatsGroups.PULERO, requires: ["punisher"] })
export class PunishPersonCommand {
    command = "!multa";
    description = "Multa uma pessoa. Uso: !multa(nome,motivo)";
    constructor(private punish_system: PunishSystem) {}
    async execute(client: Whatsapp, message: Message, args: string): Promise<void> {
        const nome_motivo = args;
        console.log(nome_motivo);
        const [person, motivo] = nome_motivo.split(',');
        this.punish_system.addPoints(person.trim(), motivo.trim());
        await client.sendText(WhatsGroups.PULERO, `${person} multado...`);
    }
}