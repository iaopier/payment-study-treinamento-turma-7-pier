fix: corrige src/controllers/UserController.ts (QA human review #1)

Refatorado para delegar lógica de negócio para serviços, removendo dependência direta do UserRepository. Adicionado construtor para injeção de dependência.