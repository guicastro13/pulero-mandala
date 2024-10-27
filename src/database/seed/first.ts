import { AppDataSource } from "../data-source";
import { Person } from "../entity/person";
import { Place } from "../entity/place";

async function seedDatabase() {
    await AppDataSource.initialize();

    const placeRepository = AppDataSource.getRepository(Place);
    const personRepository = AppDataSource.getRepository(Person);

    const places = [
        { name: "Sala + Corredor Frente", weight: 1 },
        { name: "Lavabo + Corredor Quartos", weight: 1 },
        { name: "Banheiro Meio", weight: 1 },
        { name: "Banheiro Suite", weight: 1 },
        { name: "Fundo", weight: 2 },
        { name: "Garagem + Frente", weight: 2 },
        { name: "Salol + Sala Antiga", weight: 2 },
        { name: "Lavanderia + Banheiro Fundo + Cozinha", weight: 3 }
    ];

    const people = [
        { name: "Cabeca", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Cafe", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Bordel", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Chris", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Greg", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Dylan", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Castro", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Pix", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "James", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Penado", points: { total: 0, reasons: [] }, isMandalaPerson: true },
        { name: "Moises", points: { total: 0, reasons: [] }, isMandalaPerson: false },
        { name: "Xupeta", points: { total: 0, reasons: [] }, isMandalaPerson: false },
        { name: "Grecia", points: { total: 0, reasons: [] }, isMandalaPerson: false }
    ];

    for (const place of places) {
        const newPlace = placeRepository.create(place);
        await placeRepository.save(newPlace);
    }

    for (const person of people) {
        const newPerson = personRepository.create(person);
        await personRepository.save(newPerson);
    }

    console.log("Database seeding completed!");
    await AppDataSource.destroy();
}

seedDatabase().catch((error) => console.log("Error seeding database:", error));