export interface CarData {
  name?: string;
  color?: string;
  id?: number;
}

export type RouterOptions = { [key: string]: () => void };
