import { ICommand } from "./interfaces";
import { Message, Whatsapp } from "@wppconnect-team/wppconnect";

export class CommandManager {
  private commands: Map<string, ICommand> = new Map();
  private prefix: string;

  constructor(prefix: string = "!") {
    this.prefix = prefix;
  }

  registerCommand(command: ICommand) {
    this.commands.set(command.command, command);
  }

  async handleCommand(client: Whatsapp, message: Message) {
    try {
      if (!message.body || !message.body.startsWith(this.prefix)) {
        return;
      }

      // Divide o comando e argumentos
      const [commandName, ...args] = message.body.slice(this.prefix.length).split(" ");
      const command = this.commands.get(commandName);

      if (!command) {
        return; // Comando não registrado
      }

      // Verifica se o chat está autorizado a usar o comando
      const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
      if (!command.groups.includes(chatId)) {
        await client.sendText(chatId, "❌ Você não tem permissão para usar este comando aqui.");
        return;
      }

      // Combina os argumentos em uma string única
      const argString = args.length > 0 ? args.join(" ").trim() : undefined;

      // Executa o comando
      await command.execute(client, message, argString);
    } catch (error) {
      console.error("Erro ao processar comando:", error);
    }
  }
}
