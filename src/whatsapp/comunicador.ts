import { ILogger } from "../helpers/logger";
import { Mandala } from "../mandala/mandala";

export class Communicator {
  client: any;
  mandala: Mandala;
  logger: ILogger;
  constructor(client: any, logger: ILogger) {
    this.client = client;
    this.logger = logger;
    this.mandala = new Mandala(this.logger);
  }

  async processCommand(message: any) {
    this.logger.info(message);
    const command = message.body;
    this.logger.info(`Recieved command: ${command}`);;
    const addRegex = /^!add\((.+)\)$/;
    const removeRegex = /^!remover\((.+)\)$/;
    if (command.startsWith("!")) {
      switch (command) {
        case "!hello":
          this.client.sendText(message.from, "Ta querendo pica é?");
          break;
        case "!mandala":
          this.handleMandalaCommand(message);
          break;
        case "!get":
          this.handleGetCommand(message);
        default:
          if (addRegex.test(command)) {
            const name = command.match(addRegex)?.[1];
            await this.handleAddCommand(message, name);
          } else if (removeRegex.test(command)) {
            const name = command.match(removeRegex)?.[1];
            await this.handleRemoveCommand(message, name);
          } else {
            this.client.sendText(message.from, "Digita direito essa bagaça ai!");
          }
          break;
      }
    }
  }


  async handleMandalaCommand(message: any) {

    await this.client.sendText(message.from, "Gerando sua mandala...");
    await this.mandala.generateMandala();
  }

  async handleGetCommand(message: any) {

    const mandala = await this.mandala.getMandala();
    if (mandala === "") {
      await this.client.sendText(message.from, "A mandala tá vazia, !mandala para gerar.");
      return;
    }
    await this.client.sendText(message.from, mandala);
    await this.client.sendText(message.from, "Aproveita, quero ver essa casa um BRINCO!");
  }


  async handleAddCommand(message: any, name: string) {
    if (name) {
      await this.mandala.addPerson(name);
      await this.client.sendText(message.from, `Adicionando esse corno ${name}...`);
    } else {
      this.client.sendText(message.from, "Ta errado o comando.");
    }
  }

  async handleRemoveCommand(message: any, name: string) {
    if (name) {
      await this.mandala.removePerson(name);
      await this.client.sendText(message.from, `Removendo esse preguiçoso ${name}...`);
    } else {
      this.client.sendText(message.from, "Ta errado o comando.");
    }
  }

  extractParameter(command: any, action: any) {
    const regex = new RegExp(`!${action}\\(([^)]+)\\)`);
    const match = command.match(regex);
    return match ? match[1] : null;
  }
}