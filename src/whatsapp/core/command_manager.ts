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
      const chatId = typeof message.chatId === "string" ? message.chatId : message.chatId._serialized;
      console.log(chatId)

      if (!message.body || !message.body.startsWith(this.prefix)) {
        return;
      }

      const [commandName, ...args] = message.body.slice(this.prefix.length).split(" ");
      const command = this.commands.get(commandName);

      if (!command) {
        return;
      }
     
      if (!command.groups.includes(chatId)) {
        await client.sendText(chatId, "❌ Você não tem permissão para usar este comando aqui.");
        return;
      }

      const argString = args.length > 0 ? args.join(" ").trim() : undefined;

      await command.execute(client, message, argString);
    } catch (error) {
      console.error("Erro ao processar comando:", error);
    }
  }
}
