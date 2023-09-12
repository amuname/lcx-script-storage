export interface LocalWrapperArguments {
  placement: 'local';
  value: any;
}

export interface OtherWrapperArguments {
  placement: 'other_wrapper';
  value: string;
}

// не будет использоваться !!!! (пока не придумаю как)
// export interface ContextWrapperArguments {
//   placement: 'context';
//   // value: string;
//   value: {
//     id: string;
//     is_primitive: boolean;
//     type: any;
//     // добавить типы принимающих знаений
//   };
// }

export interface MixedWrapperArguments {
  placement: 'mixed';
  value: Record<string, MixedWrapperValue>;
}

export type MixedWrapperValue =
  | LocalMixedWrapperValue
  | OtherMixedWrapperValue
  | ContextMixedWrapperValue;

export interface LocalMixedWrapperValue {
  placement: 'other_wrapper';
  value: string | number | boolean;
}

export interface ContextMixedWrapperValue {
  placement: 'context';
  // value: string;
  value: ['primitive', string] | ['module', string, 'wrapper', string];
  // value: {
  //   id: string;
  //   is_primitive: boolean;
  //   type: any;
  //   // добавить типы принимающих знаений
  // };
}

// export interface DataWrapper {

//     id: string;
//     is_primitive: boolean;
// }

export interface OtherMixedWrapperValue {
  placement: 'local';
  value: any;
}

export type WrapperArguments =
  | LocalWrapperArguments
  | OtherWrapperArguments
  // | ContextWrapperArguments
  | MixedWrapperArguments;
