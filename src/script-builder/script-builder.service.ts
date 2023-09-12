import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PredicateMixedArgumentsWrapper } from './utils/predicate/predicate-mixed-arguments-wrapper';
// import { PredicateLocalInMixedArgumentsWrapper } from './utils/predicate/predicate-mixed-local-wrapper-value';
// import { PredicateOtherInMixedArgumentsWrapper } from './utils/predicate/predicate-mixed-other-wrapper-value';
import { PredicateContextInMixedArgumentsWrapper } from './utils/predicate/predicate-mixed-context-wrapper-value';
// import { PredicateContextArgumentsWrapper } from './utils/predicate/predicate-context-arguments-wrapper';
import {
  BlockCallSchema,
  MixedWrapperArguments,
  MixedWrapperValue,
  WrapperArguments,
} from './utils/interface/front-wrapper-model.interface';
import { predicateFrontWrapper } from './utils/predicate/predicate-front-wrapper';
import {
  predicateMixedFrontContextWrapper,
  predicateMixedFrontWrapper,
} from './utils/predicate/predicate-mixed-front-wrapper';
// import { predicateLocalWrapper } from './utils/predicate/predicate-local-wrapper';
// import { PredicateLocalInMixedArgumentsWrapper } from './utils/predicate/predicate-mixed-local-wrapper-value';
// import { PredicateLocalArgumentsWrapper } from './utils/predicate/predicate-local-arguments-wrapper';
// import { PredicateOtherArgumentsWrapper } from './utils/predicate/predicate-other-arguments-wrapper';

@Injectable()
export class ScriptBuilderService {
  async createScriptVersionData(script: BlockCallSchema) {
    const arguments_schema_map = {};

    // TODO редкостное гавно
    Object.values(script).forEach((block) => {
      // if (predicateLocalWrapper(block.wrapper_arguments)) {
      //   block.wrapper_arguments.value = Object.entries(
      //     block.wrapper_arguments.value,
      //   ).reduce((acc, key) => ((acc[key[0]] = key[1].value), acc), {});
      // }
      if (predicateFrontWrapper(block.wrapper_arguments)) {
        const uuid_key = uuidv4();
        arguments_schema_map[uuid_key] = block.wrapper_arguments;
        block.wrapper_arguments = {
          placement: 'context',
          value: uuid_key,
        };
      }
      if (predicateMixedFrontWrapper(block.wrapper_arguments)) {
        Object.entries(block.wrapper_arguments.value).forEach(([key, arg]) => {
          if (predicateMixedFrontContextWrapper(arg)) {
            const uuid_key = uuidv4();
            arguments_schema_map[uuid_key] = {
              placement: 'local',
              value: arg.value,
            };
            (
              (block.wrapper_arguments as MixedWrapperArguments)
                .value as Record<string, MixedWrapperValue>
            )[key] = {
              placement: 'context',
              value: uuid_key,
            };
          }
        });
      }
    });

    const last_proc_id = script['end'].prev_id;
    const last_proc = script[last_proc_id];
    return {
      arguments_schema: arguments_schema_map,
      script_schema: script,
      result_schema: last_proc.wrapper_result_schema,
    };
  }

  // private getWrapperArgumentsFromBlock(block: WrapperBlockSchema) {
  //   if (
  //     new PredicateMixedArgumentsWrapper().predicate(block.wrapper_arguments)
  //   ) {
  //     return Object.entries(block.wrapper_arguments.value).reduce(
  //       (acc, [key, val]) => {
  //         if (new PredicateContextInMixedArgumentsWrapper().predicate(val)) {
  //           const uuid_key = uuidv4();
  //           acc[uuid_key] = val;
  //           block.wrapper_arguments.value[key] = uuid_key;
  //           return acc;
  //         }
  //         return acc;
  //       },
  //       {},
  //     );
  //   }

  //   return {};

  //   // if (
  //   //   new PredicateContextArgumentsWrapper().predicate(block.wrapper_arguments)
  //   // ) {
  //   //   return block.wrapper_arguments.value;
  //   // }
  // }
}
