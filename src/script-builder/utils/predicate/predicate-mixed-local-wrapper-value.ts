import { Predicate3 } from './predicate-class';
import {
  MixedWrapperValue,
  LocalMixedWrapperValue,
  OtherMixedWrapperValue,
  ContextMixedWrapperValue,
} from '../interface/wrapper-arguments.interface';

export class PredicateLocalInMixedArgumentsWrapper extends Predicate3<
  LocalMixedWrapperValue,
  OtherMixedWrapperValue,
  ContextMixedWrapperValue
> {
  public predicate(arg: MixedWrapperValue): arg is LocalMixedWrapperValue {
    return arg.placement === 'local';
  }
}
