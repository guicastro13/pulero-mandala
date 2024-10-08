export abstract class Task {
  constructor(private name: string, private cronExpression: string) {}
  abstract execute(): void;

  public getName(): string {
    return this.name;
  }
  public getCronExpression(): string {
    return this.cronExpression;
  }
}
