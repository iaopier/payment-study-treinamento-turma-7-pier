export class GetUserService {
  async execute(id: string) {
    return { id, name: 'User Test' };
  }
}