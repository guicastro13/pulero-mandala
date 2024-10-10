import fs from "node:fs";
import path from  "node:path";

interface Place {
  name: string;
  weight: number;
}

export class Mandala {
    private people: string[];
    private places: Place[];
    private taskDirectory: string;

    constructor() {
        this.taskDirectory = path.join(__dirname, 'Tasks');
        this.people = this.loadData('people');
        this.places = this.loadData('places').map((place: any) => ({
        name: place.name,
        weight: place.weight
        }));

        if (!fs.existsSync(this.taskDirectory)) {
        fs.mkdirSync(this.taskDirectory);
        }
    }  

    loadData(type: 'people' | 'places'): any[] {
        const filePath = path.join(__dirname, `../data/${type}.json`);
        if (!fs.existsSync(filePath)) {
        throw new Error(`${type}.json não encontrado.`);
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    saveData(type: 'people' | 'places', data: any[]) {
        const filePath = path.join(__dirname, `../data/${type}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    getMandala(): string {
        try {
            // Lê os arquivos no diretório de tarefas
            const files = fs.readdirSync(this.taskDirectory);
            
            // Verifica se há arquivos no diretório
            if (files.length === 0) {
                return "Nenhuma tarefa encontrada na mandala.";
            }

            const latestFile = files.sort().pop();
            const filePath = path.join(this.taskDirectory, latestFile as string);
            const mandalaContent = fs.readFileSync(filePath, 'utf8');

            return mandalaContent;
        } catch (err) {
            console.error("Erro ao ler o diretório de tarefas", err);
            return "Erro ao ler as tarefas.";
        }
    }
    generateMandala(): string {
        const sizeMandala = this.people.length;
        let dicio: Map<string, string[]> = new Map();
    
        console.log("Inicializar as tarefas possíveis para cada pessoa")
        this.people.forEach(person => {
            dicio.set(person, []);
        });
    
        let dicioRemove: { [key: string]: string } = {};
        const maxAttempts = 1000;
        let attempts = 0;
    
        while (attempts < maxAttempts) {
        let placesAux = [...this.places];
        let peopleAux = [...this.people];
        dicioRemove = {};
        
        try {
            console.log("Tentativa de atribuir pessoas a lugares");
            
            for (const place of placesAux) {
            const { name } = place;
            this.assignPersonToPlace(name, peopleAux, dicio, dicioRemove);
            }

            for (const place of placesAux) {
            const { name, weight } = place;
            for (let i = 1; i < weight; i++) {
                this.assignPersonToPlace(name, peopleAux, dicio, dicioRemove);
            }
            }
            
            console.log("Atribuições concluídas com sucesso");
            break;
        } catch (error) {
            console.log("Erro ao atribuir pessoas:", error);
            attempts++;
            if (attempts >= maxAttempts) {
            console.error("Limite de tentativas alcançado. Verifique a configuração de pesos ou disponibilidade de pessoas.");
            throw new Error("Não foi possível gerar a mandala após várias tentativas.");
            }
        }
        }
    

        let today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const historyPath = path.join(this.taskDirectory, `Tasks_Limpeza_${formattedDate}.txt`);
    
        if (!fs.existsSync(this.taskDirectory)) {
        fs.mkdirSync(this.taskDirectory, { recursive: true });
        }
    
        const history = fs.createWriteStream(historyPath);

        history.write(`Mandala de Tarefas - Semana ${today.toLocaleDateString()}\n\n`);

        this.places.forEach(place => {
        history.write(`${place.name}:\n`);
        for (const person in dicioRemove) {
            if (dicioRemove[person] === place.name && person != "undefined") {
                history.write(`- ${person}\n`);
            }
        }
        history.write("\n");
        });

        history.write("\n");
        history.end();

        return `Mandala de tarefas gerada para a semana. Verifique o diretório Tasks.`;
    }
    private assignPersonToPlace(place: string, availablePeople: string[], assignments: Map<string, string[]>, dicioRemove: { [key: string]: string }) {
        const shuffledPeople = this.shuffleArray(availablePeople);
        const person = shuffledPeople[0];
        assignments.get(person)?.push(place);
        dicioRemove[person] = place;
        const index = availablePeople.indexOf(person);
        if (index > -1) {
        availablePeople.splice(index, 1);
        }
    }
    private shuffleArray(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    addPerson(name: string): string {
    const people = this.loadData('people');
    if (people.includes(name)) {
        return `A pessoa "${name}" já existe na lista.`;
    }
    people.push(name);
    this.saveData('people', people);
    return `A pessoa "${name}" foi adicionada com sucesso.`;
    }   
    removePerson(name: string): string {
    const people = this.loadData('people');

    const index = people.indexOf(name);
    if (index === -1) {
        return `A pessoa "${name}" não foi encontrada na lista.`;
    }
    people.splice(index, 1);
    this.saveData('people', people);
    return `A pessoa "${name}" foi removida com sucesso.`;
    }
}