import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { ICommand } from "./interface_command";

export class CommandHandler {
    private commands: Map<string, ICommand> = new Map();
  
    registerCommand(command: ICommand) {
      this.commands.set(command.command, command);
    }
  
    async handleCommand(client: Whatsapp, message: Message) {
      const commandText = message.body!;
      const multaRegex = /^!multa\(\s*([^,\s][^,]*)\s*,\s*([^,\s][^)]*)\s*\)$/;
      const addRegex = /^!add\((.+)\)$/;
      const removeRegex = /^!remover\((.+)\)$/;
  
      if (commandText.startsWith("!")) {
        if (addRegex.test(commandText)) {
          const args = commandText.match(addRegex)?.[1];
          const cmd = this.commands.get("!add");
          if (cmd) {
            await cmd.execute(client, message, args);
          }
          return;
        } else if (multaRegex.test(commandText)) {
          const args = commandText.match(multaRegex)?.[1];
          const cmd = this.commands.get("!multa");
          console.log("AQUI")
          if (cmd) {
            await cmd.execute(client, message, args);
          }
          return;
        } else if (removeRegex.test(commandText)) {
          const args = commandText.match(removeRegex)?.[1];
          const cmd = this.commands.get("!remover");
          if (cmd) {
            await cmd.execute(client, message, args);
          }
          return;
        } 
  
        const cmd = this.commands.get(commandText);
        if (cmd) {
          await cmd.execute(client, message);
        } else {
            await this.sendHelpMessage(client, message);
        }
      }
    }

    listCommands(): { command: string; description: string }[] {
        return Array.from(this.commands.values()).map(cmd => ({
          command: cmd.command,
          description: cmd.description,
        }));
      }
    
    private async sendHelpMessage(client: Whatsapp, message: Message) {
        const commands = this.listCommands();
        let helpMessage = "Aqui estão os comandos disponíveis:\n\n";
    
        commands.forEach(cmd => {
          helpMessage += `${cmd.command}: ${cmd.description}\n`;
        });
    
        await client.sendText(message.from, helpMessage);
      }
  }
  