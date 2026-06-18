fix: corrige src/controllers/UserController.ts (QA human review #1)

Removida a dependência direta do UserRepository, injetando agora CreateUserService e GetUserService. Adicionados testes unitários.