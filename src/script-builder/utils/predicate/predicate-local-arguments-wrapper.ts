import { Predicate3, Predicate4 } from './predicate-class';
import {
  WrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments,
  // ContextWrapperArguments,
  MixedWrapperArguments,
} from '../interface/wrapper-arguments.interface';

export class PredicateLocalArgumentsWrapper extends Predicate3<
  LocalWrapperArguments,
  OtherWrapperArguments,
  // ContextWrapperArguments,
  MixedWrapperArguments
> {
  public predicate(arg: WrapperArguments): arg is LocalWrapperArguments {
    return arg.placement === 'local';
  }
}
