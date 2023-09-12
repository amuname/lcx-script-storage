import {
  LocalWrapperArguments,
  WrapperArguments,
} from '../interface/front-wrapper-model.interface';

export function predicateLocalWrapper(
  arg: WrapperArguments,
): arg is LocalWrapperArguments {
  return (
    (arg as LocalWrapperArguments).placement !== undefined &&
    (arg as LocalWrapperArguments).placement === 'local'
  );
}
