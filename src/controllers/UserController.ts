fix: corrige src/controllers/UserController.ts (QA human review #1)

Removida a importação direta do UserRepository e refatorado para utilizar DeleteUserService e UpdateUserService, garantindo que o controller não conheça a camada de persistência.