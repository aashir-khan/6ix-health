export interface UseCase<
  Request = Record<string, never>,
  Response = Record<string, never>
> {
  execute(request: Request): Promise<Response> | Response;
}
