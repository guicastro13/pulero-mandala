import { DataSource } from "typeorm";
import { Place } from "./entity/place";
import { Person } from "./entity/person";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "mydatabase.sqlite",
    synchronize: true,
    logging: false,
    entities: [Place, Person],
    migrations: [],
    subscribers: [],
});
export async function initializeDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    }
}