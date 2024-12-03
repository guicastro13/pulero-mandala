import { Message, Whatsapp } from "@wppconnect-team/wppconnect";

export interface ICommand {
  execute(client: Whatsapp, message: Message, args?: string): Promise<void>;
  command: string;
  description: string;
  groups: string[];
}


export interface IGroup {
  name: string;
  commands: ICommand[];
}
