import { WrapperArguments } from './wrapper-arguments.interface';

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

const schema = {
  start: {
    id: 'start',
    prev_id: '',
    module: 'module1',
    wrapper: 'wrapper1',
    wrapper_arguments: {
      placement: 'local',
      value: 'some value',
    },
    wrapper_result_schema: {},
    next: [
      {
        id: 'block1',
      },
    ],
  },
  block1: {
    id: 'block1',
    prev_id: 'start',
    module: 'module2',
    wrapper: 'wrapper2',
    wrapper_arguments: {
      placement: 'other_wrapper',
      value: 'wrapper value',
    },
    wrapper_result_schema: {},
    next: [
      {
        id: 'end',
      },
    ],
  },
  end: {
    id: 'end',
    prev_id: 'block1',
    module: 'module3',
    wrapper: 'wrapper3',
    wrapper_arguments: {
      placement: 'context',
      value: 'context value',
    },
    wrapper_result_schema: {},
    next: [],
  },
};
