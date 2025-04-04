import { Contact, Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { WhatsGroups } from "../../core/groups";
import { ICommand } from "../../core/interfaces";

export class AddPlayersCommand implements ICommand {
    command = "addplayers";
    description = "Adiciona todos os membros do grupo como participantes.";
    groups = [WhatsGroups.PULERO];

    async execute(client: Whatsapp, message: Message, voteGame: any): Promise<void> {
        const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
        const groupMembers = await client.getGroupMembers(chatId);
        const participants = groupMembers.map((member: Contact) => member.formattedName ?? member.name ?? member.id);
        voteGame.setParticipants(participants);
        await client.sendText(chatId, `Participantes registrados: ${participants.join(", ")}`);
    }
}
