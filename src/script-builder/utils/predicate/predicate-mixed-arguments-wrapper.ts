import { Predicate3 } from './predicate-class';
import {
  WrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments,
  MixedWrapperArguments,
} from '../interface/wrapper-arguments.interface';

export class PredicateMixedArgumentsWrapper extends Predicate3<
  MixedWrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments
> {
  public predicate(arg: WrapperArguments): arg is MixedWrapperArguments {
    return arg.placement === 'mixed';
  }
}
