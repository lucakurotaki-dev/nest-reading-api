export interface ICrudRepository<T> {
  create(input: unknown): Promise<T>;
  findById(id: string): Promise<T | null>;
  updateById(input: unknown): Promise<T>;
  deleteById(id: string): Promise<boolean>;
}
