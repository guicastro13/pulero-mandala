import * as fs from "fs";

class VoteGame {
    private participants: string[] = [];
    private votes: Record<string, string> = {};
    private votesFile = "./votes.json";

    constructor() {
        if (fs.existsSync(this.votesFile)) {
            const data = JSON.parse(fs.readFileSync(this.votesFile, "utf-8"));
            this.participants = data.participants || [];
            this.votes = data.votes || {};
        } else {
            this.saveGame();
        }
    }

    private saveGame(): void {
        fs.writeFileSync(this.votesFile, JSON.stringify({
            participants: this.participants,
            votes: this.votes
        }, null, 2));
    }

    public setParticipants(participants: string[]): void {
        this.participants = participants;
        this.saveGame();
    }

    public getParticipants(): string[] {
        return this.participants;
    }

    public hasVoted(userId: string): boolean {
        return this.votes.hasOwnProperty(userId);
    }

    public castVote(userId: string, participant: string): boolean {
        if (!this.participants.includes(participant)) {
            return false;
        }
        this.votes[userId] = participant;
        this.saveGame();
        return true;
    }

    public getResults(): Record<string, number> {
        const results: Record<string, number> = {};
        for (const vote of Object.values(this.votes)) {
            results[vote] = (results[vote] || 0) + 1;
        }
        return results;
    }
}