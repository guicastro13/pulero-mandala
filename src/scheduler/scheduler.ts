import cron from "node-cron";
import { ILogger } from "../helpers/logger";
import { Task } from "./task_maneger";

export class Scheduler {
  private tasks: Task[] = [];
  private logger: ILogger;
  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public start() {
    this.tasks.forEach((task) => {
      cron.schedule(task.getCronExpression(), () => {
        this.logger.info(
          `[${new Date().toISOString()}] Executando: ${task.getName()}`
        );
        task.execute();
      });
    });

    this.logger.info("Scheduler inicializado. Aguardando tarefas...");
  }
}
