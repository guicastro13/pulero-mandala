import { Repository, EntityTarget, ObjectLiteral } from "typeorm";
import { AppDataSource, initializeDataSource } from "../data-source";

export class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity);
    }

    private async ensureInitialized() {
        await initializeDataSource();
    }


    async getAll(): Promise<T[]> {
        await this.ensureInitialized();
        return await this.repository.find();
    }

    async getById(id: number): Promise<T | null> {
        await this.ensureInitialized();
        return await this.repository.findOneBy({ id } as any);
    }

    async add(entity: T): Promise<T> {
        await this.ensureInitialized();
        return await this.repository.save(entity);
    }

    async update(entity: T): Promise<T> {
        await this.ensureInitialized();
        return await this.repository.save(entity);
    }

    async delete(id: number): Promise<void> {
        await this.ensureInitialized();
        await this.repository.delete(id);
    }
}
