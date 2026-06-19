fix: corrige src/controllers/UserController.ts (QA human review #1)

Refatorado para injetar DeleteUserService e UpdateUserService via construtor, removendo dependência direta do UserRepository.