import { Predicate3 } from './predicate-class';
import {
  MixedWrapperValue,
  LocalMixedWrapperValue,
  OtherMixedWrapperValue,
  ContextMixedWrapperValue,
} from '../interface/wrapper-arguments.interface';

export class PredicateContextInMixedArgumentsWrapper extends Predicate3<
  ContextMixedWrapperValue,
  OtherMixedWrapperValue,
  LocalMixedWrapperValue
> {
  public predicate(arg: MixedWrapperValue): arg is ContextMixedWrapperValue {
    return arg.placement === 'context';
  }
}
