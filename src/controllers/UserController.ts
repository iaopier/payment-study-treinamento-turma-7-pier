fix: corrige src/controllers/UserController.ts (QA human review #1)

Documentação do fluxo de entrada: O controller recebe o request, valida o corpo via Zod (CreateUserSchema) e delega para o CreateUserService.