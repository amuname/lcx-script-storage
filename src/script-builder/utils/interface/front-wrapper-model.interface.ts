export interface Block {
  id: string;
  prev_id: string;
  module: string;
  wrapper: string;
  wrapper_arguments: WrapperArguments;
  wrapper_result_schema: Record<string, any>;
  next:
    | {
        id: string;
      }[]
    | never[];
}

export type BlockCallSchema = Record<string | 'start' | 'end', Block>;

export interface LocalWrapperArguments {
  placement: 'local';
  value: Record<string, LocalMixedWrapperValue>;
}

export interface PreparedLocalWrapperArguments {
  [x: string]: string | boolean | number;
}

export interface OtherWrapperArguments {
  placement: 'other_wrapper';
  value: string;
}

export interface FrontContextWrapperArguments {
  avalible_from: ['local', 'mixed', 'other_wrapper', 'context'];
  arg_schema: WrapperBlockArgumentsArgSchema;
}

export interface ContextWrapperArguments {
  placement: 'context';
  value: string;
}

export interface MixedWrapperArguments {
  placement: 'mixed';
  value: Record<string, MixedWrapperValue>;
}

export type MixedWrapperValue =
  | LocalMixedWrapperValue
  | OtherMixedWrapperValue
  | ContextMixedWrapperValue
  | BuildedContextMixedWrapperValue;
// | FrontContextMixedWrapperValue;

export interface LocalMixedWrapperValue {
  placement: 'local';
  value: string | number | boolean;
}

export interface FrontContextMixedWrapperValue {
  avalible_from: ['local', 'mixed', 'other_wrapper', 'context'];
  arg_schema: WrapperBlockArgumentsArgSchemaValue;
}

export interface WrapperBlockArgumentsArgSchema {
  [x: string]: WrapperBlockArgumentsArgSchemaValue;
}

export interface WrapperBlockArgumentsArgSchemaValue {
  avalible_from: ['local', 'mixed', 'other_wrapper', 'context'];
  type: ArgType;
}

export type ArgType = ModuleArg | PrimitiveArg;

export type PrimitiveArg = ['primitive', string];

export type ModuleArg = ['module', string, 'wrapper', string];

export interface ContextMixedWrapperValue {
  placement: 'context';
  value: ArgType;
}

export interface BuildedContextMixedWrapperValue {
  placement: 'context';
  value: string;
}

export interface OtherMixedWrapperValue {
  placement: 'other_wrapper';
  value: any;
}

export type WrapperArguments =
  | LocalWrapperArguments
  | PreparedLocalWrapperArguments
  // | OtherWrapperArguments
  | ContextWrapperArguments
  | FrontContextWrapperArguments
  | MixedWrapperArguments;
