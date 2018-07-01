export interface Props {
  default?: Function;
  required?: boolean;
  type: any;
  validator?: Function;
}

export declare class Typed {
  private _props;
  static get is(): Typed;
  get array(): Typed;
  get bool(): Typed;
  get date(): Typed;
  get define(): Props;
  get func(): Typed;
  get num(): Typed;
  get obj(): Typed;
  get required(): Typed;
  get str(): Typed;
  get sym(): Typed;
  default(value: any): Typed;
  type(value: any): Typed;
  validator(cb: Function): Typed;
}
