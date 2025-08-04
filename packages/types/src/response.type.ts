export type Response<T> = ({
  successed: true,
  error?: null,
  data: T
} | {
  successed: false,
  error: string,
  data?: T|null
});