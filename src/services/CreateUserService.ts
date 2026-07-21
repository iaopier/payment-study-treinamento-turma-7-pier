export class CreateUserService {
  async execute(data: any) {
    return { id: '1', ...data };
  }
}