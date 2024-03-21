package controller.command;

import controller.command.commands.ManagerCommands;

public class CommandFactory {
    private CommandFactory() {}

    public static Command getCommand(String commandKey) {
        Command command = ManagerCommands.getCommand(commandKey);
        return command;
    }
}
