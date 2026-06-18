fix: corrige src/controllers/UserController.ts (QA human review #1)

Refatorado para injetar DeleteUserService e UpdateUserService, removendo dependência direta do UserRepository. Adicionados testes unitários.