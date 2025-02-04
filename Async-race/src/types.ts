export interface CarData {
  name?: string;
  color?: string;
  id?: number;
}

export interface EngineData {
  velocity: number;
  distance: number;
}

export type RouterOptions = { [key: string]: () => void };

export function checkedQuerySelector(
  parent: Element | Document,
  selector: string,
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error("Selector didn't match any elements.");
  }
  return el;
}

export type DriveResponse = { success: boolean };
