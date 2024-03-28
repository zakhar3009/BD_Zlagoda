package controller.command.commands;

import controller.command.Command;

public class CommandFactory {


    private CommandFactory() {}

    public static Command getCommand(String commandKey) {

        Command command = ManagerCommands.getCommand(commandKey);
        return command;
    }
}

