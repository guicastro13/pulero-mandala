import fs from "node:fs";
import path from "node:path";
import { ILogger } from "../helpers/logger";

interface Person {
    name: string;
    points: {
        total: number;
        reasons: string[];
    };
}

export class PunishSystem {
    private logger: ILogger;
    private people: Person[];
    constructor(logger: ILogger) {
        this.logger = logger;
        this.people = this.loadPeopleData('people');
    }

    loadPeopleData(type: 'people') {
        const filePath = path.resolve(process.cwd(), `data/${type}.json`);
        if (!fs.existsSync(filePath)) {
            this.logger.error(`${type}.json não encontrado.`);
            throw new Error(`${type}.json não encontrado.`);
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    savePeopleData(type: 'people', data: any[]) {
        const filePath = path.resolve(process.cwd(), `data/${type}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    addPoints(name: string, reason: string): void {
        const user = this.people.find(person => person.name === name);
        if (user) {
            user.points.total += 1;
            user.points.reasons.push(reason);
            this.savePeopleData('people', this.people);
        } else {
            this.logger.error(`Usuário ${name} não encontrado.`);
        }
    }
    getTotalPoints(): { name: string; totalPoints: number }[] {
        return this.people.map(person => ({
            name: person.name,
            totalPoints: person.points.total
        }));
    }
    clearPoints(name: string): void {
        const user = this.people.find(person => person.name === name);
        if (user) {
            user.points.total = 0;
            user.points.reasons = [];
            this.savePeopleData('people', this.people);
        } else {
            this.logger.error(`Usuário ${name} não encontrado.`);
        }
    }
    getReasonsByName(name: string): string[] {
        const user = this.people.find(person => person.name === name);
        if (user) {
            return user.points.reasons;
        } else {
            this.logger.error(`Usuário ${name} não encontrado.`);
            return [];
        }
    }
    clearAllPoints(): void {
        this.people.forEach(person => {
            person.points.total = 0;
            person.points.reasons = [];
        });
        this.savePeopleData('people', this.people);
    }

    formatBold(text: string): string {
        return `*${text}*`;
    }
    formatItalic(text: string): string {
        return `_${text}_`;
    }
    formatStrikethrough(text: string): string {
        return `~${text}~`;
    }
    formatMonospace(text: string): string {
        return `\`${text}\``;
    }

    getFormattedTotalPoints(): string {
        const totals = this.getTotalPoints();
        return totals
            .map(person => `${this.formatBold(person.name)}: ${person.totalPoints} pontos`)
            .join('\n');
    }
    getFormattedReasonsByName(name: string): string {
        const reasons = this.getReasonsByName(name);
        if (reasons.length === 0) {
            return this.formatItalic(`Nenhum motivo registrado para ${name}.`);
        }

        return `${this.formatBold(name)} - Motivos:\n` +
            reasons.map(reason => `- ${this.formatMonospace(reason)}`).join('\n');
    }
}