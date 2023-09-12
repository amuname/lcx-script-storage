import {
  FrontContextMixedWrapperValue,
  MixedWrapperValue,
  WrapperArguments,
  MixedWrapperArguments,
  ContextMixedWrapperValue,
} from '../interface/front-wrapper-model.interface';

export function predicateMixedFrontWrapper(
  arg: WrapperArguments,
): arg is MixedWrapperArguments {
  return (
    (arg as MixedWrapperArguments).placement !== undefined &&
    (arg as MixedWrapperArguments).placement === 'mixed'
  );
}

export function predicateMixedFrontContextWrapper(
  arg: MixedWrapperValue,
): arg is ContextMixedWrapperValue {
  return (
    (arg as ContextMixedWrapperValue).placement === 'context' &&
    Array.isArray((arg as ContextMixedWrapperValue).value)
  );
}
