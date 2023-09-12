import {
  FrontContextWrapperArguments,
  WrapperArguments,
} from '../interface/front-wrapper-model.interface';

export function predicateFrontWrapper(
  arg: WrapperArguments,
): arg is FrontContextWrapperArguments {
  return (
    (arg as FrontContextWrapperArguments).arg_schema !== undefined &&
    (arg as FrontContextWrapperArguments).avalible_from !== undefined
  );
}
