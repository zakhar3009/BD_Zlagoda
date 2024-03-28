package entity;

public enum Role {
    CASHIER("cashier"), MANAGER("manager");

    public static Role getRole(String rawValue){
        if(rawValue.equals(CASHIER.role)) return CASHIER;
        else return MANAGER;
    }

    private String role;

    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public static Role forValue(String value) {
        for (Role role : Role.values()) {
            if (role.getRole().equals(value)) {
                return role;
            }
        }
        throw new RuntimeException("Role with such string value doesn't exist");
    }
}
