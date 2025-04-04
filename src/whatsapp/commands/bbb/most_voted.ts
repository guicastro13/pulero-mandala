import { Contact, Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ICommand } from "../../core/interfaces";
import { WhatsGroups } from "../../core/groups";
import * as fs from "fs";

export class VoteCommand implements ICommand {
    command = "vote";
    description = "Permite que os usuários votem em uma lista pré-definida.";
    groups = [WhatsGroups.PULERO];
    private allowedVotes = ["Opção1", "Opção2", "Opção3"]; // Lista de opções válidas
    private votesFile = "./votes.json";

    constructor() {
        if (!fs.existsSync(this.votesFile)) {
            fs.writeFileSync(this.votesFile, JSON.stringify({}));
        }
    }

    private async saveVote(userId: string, vote: string): Promise<void> {
        const data = JSON.parse(fs.readFileSync(this.votesFile, "utf-8"));
        data[userId] = vote;
        fs.writeFileSync(this.votesFile, JSON.stringify(data, null, 2));
    }

    private async hasVoted(userId: string): Promise<boolean> {
        const data = JSON.parse(fs.readFileSync(this.votesFile, "utf-8"));
        return data.hasOwnProperty(userId);
    }

    private async getResults(): Promise<Record<string, number>> {
        const data = JSON.parse(fs.readFileSync(this.votesFile, "utf-8"));
        const results: Record<string, number> = {};
        for (const vote of Object.values<string>(data)) {
            results[vote] = (results[vote] || 0) + 1;
        }
        return results;
    }

    private async getGroupMembers(client: Whatsapp, chatId: string): Promise<string[]> {
        const groupMetadata = await client.getGroupMembers(chatId);
        return groupMetadata.map((member: Contact) => member.pushname?? member.name ?? member.id);
    }


    async execute(client: Whatsapp, message: Message): Promise<void> {
        const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
        const senderId = message.from;

        if (!message.body || !message.chatId) {
            return;
        }
        const members = await this.getGroupMembers(client, chatId);
        const memberOptions = members.join(", ");
        const vote = message.body.split(" ")[1]?.trim();
        if (!vote || !members.includes(vote)) {
            await client.sendText(chatId, `Voto inválido. As opções disponíveis são: ${memberOptions}`);
            return;
        }

        if (await this.hasVoted(senderId)) {
            await client.sendText(chatId, "Você já votou. Cada pessoa pode votar apenas uma vez.");
            return;
        }

        await this.saveVote(senderId, vote);
        await client.sendText(chatId, `Seu voto em "${vote}" foi registrado com sucesso!`);
    }

    async getVoteResults(): Promise<void> {
        const results = await this.getResults();
        console.log("Resultados da votação:", results);
    }
}
