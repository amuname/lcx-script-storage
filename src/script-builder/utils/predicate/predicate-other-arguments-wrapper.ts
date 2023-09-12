import { Predicate3, Predicate4 } from './predicate-class';
import {
  WrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments,
  // ContextWrapperArguments,
  MixedWrapperArguments,
} from '../interface/wrapper-arguments.interface';

export class PredicateOtherArgumentsWrapper extends Predicate3<
  OtherWrapperArguments,
  LocalWrapperArguments,
  // ContextWrapperArguments,
  MixedWrapperArguments
> {
  public predicate(arg: WrapperArguments): arg is OtherWrapperArguments {
    return arg.placement === 'other_wrapper';
  }
}
