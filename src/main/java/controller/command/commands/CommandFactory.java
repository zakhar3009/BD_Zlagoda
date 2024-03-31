package controller.command.commands;

import controller.command.Command;

public class CommandFactory {

    private CommandFactory() {}

    public static Command getManagerCommand(String commandKey) {
        return ManagerCommands.valueOf(commandKey).getCommand();
    }

    public static Command getCashierCommand(String commandKey){
        return CashierCommands.valueOf(commandKey).getCommand();
    }
}

