package service;

import dao.DaoFactory;
import dao.EmployeeDao;
import entity.Employee;
import java.util.List;

public class EmployeeService {

    private final DaoFactory daoFactory;

    EmployeeService(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }

    private static class Holder {
        static final EmployeeService INSTANCE = new EmployeeService(DaoFactory.getDaoFactory());
    }

    public static EmployeeService getInstance() {
        return Holder.INSTANCE;
    }

    public List<Employee> getAllEmployees() {
        try (EmployeeDao employeeDao = daoFactory.createEmployeeDao()) {
            return employeeDao.getAll();
        }
    }
/*
    public Optional<User> getUserById(Long userId) {
        LOGGER.info(String.format(GET_USER_BY_ID, userId));
        try (UserDao userDao = daoFactory.createUserDao()) {
            return userDao.getById(userId);
        }
    }

    public Optional<User> getUserByCredentials(CredentialsDto credentials) {
        LOGGER.info(String.format(GET_USER_BY_CREDENTIALS, credentials.getEmail()));
        try (UserDao userDao = daoFactory.createUserDao()) {
            return userDao.getUserByCredentials(credentials.getEmail(), credentials.getPassword());
        }
    }

    public void createUser(EmployeeDao userDto) {
        LOGGER.info(String.format(CREATE_USER, userDto.getEmail()));
        User user = UserDtoUserConverter.toUser(userDto);
        try (UserDao userDao = daoFactory.createUserDao()) {
            userDao.create(user);
        }
    }

    public void updateUser(UserDto userDto) {
        LOGGER.info(String.format(UPDATE_USER, userDto.getId()));
        User user = UserDtoUserConverter.toUser(userDto);
        try (UserDao userDao = daoFactory.createUserDao()) {
            userDao.update(user);
        }
    }

    public void deleteUser(Long userId) {
        LOGGER.info(String.format(DELETE_USER, userId));
        try (UserDao userDao = daoFactory.createUserDao()) {
            userDao.delete(userId);
        }
    }

    public List<User> searchUsersBySurname(String surname) {
        LOGGER.info(String.format(SEARCH_USERS_BY_SURNAME, surname));
        try (UserDao userDao = daoFactory.createUserDao()) {
            return userDao.searchUsersBySurname(surname);
        }
    }

    public List<User> searchUsersByRole(Role role) {
        LOGGER.info(String.format(SEARCH_USERS_BY_ROLE, role.getValue()));
        try (UserDao userDao = daoFactory.createUserDao()) {
            return userDao.searchUsersByRole(role);
        }
    }

    public List<User> searchBestWaitersPerPeriod(LocalDate fromDate, LocalDate toDate) {
        LOGGER.info(String.format(SEARCH_BEST_WAITER_PER_PERIOD, fromDate.toString(), toDate.toString()));
        try (UserDao userDao = daoFactory.createUserDao()) {
            return userDao.searchBestWaitersPerPeriod(fromDate, toDate);
        }
    }
    */

}
