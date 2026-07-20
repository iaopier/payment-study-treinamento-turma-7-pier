fix: corrige src/services/CreateUserService.ts (QA human review #2)

Removido fallback hardcoded para JWT_SECRET, agora exige process.env.JWT_SECRET. Adicionada tipagem estrita e validações.