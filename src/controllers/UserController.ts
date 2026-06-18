fix: corrige src/controllers/UserController.ts (QA human review #1)

Refatorado para utilizar DeleteUserService e UpdateUserService, removendo a dependência direta do UserRepository. Adicionado construtor para injeção de dependência.