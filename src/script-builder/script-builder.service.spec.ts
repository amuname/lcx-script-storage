import { Test, TestingModule } from '@nestjs/testing';
import { ScriptBuilderService } from './script-builder.service';
import { BlockCallSchema } from './utils/interface/front-wrapper-model.interface';
import {
  // ContextWrapperArguments,
  MixedWrapperArguments,
} from './utils/interface/wrapper-arguments.interface';

describe('PrismaServiceService', () => {
  let service: ScriptBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptBuilderService],
    }).compile();

    service = module.get<ScriptBuilderService>(ScriptBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('build data from script', async () => {
    const script: BlockCallSchema = {
      start: {
        id: 'start',
        prev_id: '',
        module: 'StartEnd',
        wrapper: 'Start',
        wrapper_arguments: {} as any,
        wrapper_result_schema: [],
        next: [{ id: '5dde4deb-86d6-43ba-8d3d-d282af6aca2b' }],
      },
      end: {
        id: 'end',
        prev_id: 'd7b987c6-e262-4449-a4a1-886d8654e00c',
        module: 'StartEnd',
        wrapper: 'End',
        wrapper_arguments: {} as any,
        wrapper_result_schema: [],
        next: [],
      },
      '5dde4deb-86d6-43ba-8d3d-d282af6aca2b': {
        id: '5dde4deb-86d6-43ba-8d3d-d282af6aca2b',
        module: 'Math',
        wrapper: 'AddNumbers',
        wrapper_arguments: {
          placement: 'mixed',
          value: {
            a: { placement: 'context', value: ['primitive', 'number'] },
            b: { placement: 'local', value: 1 },
          },
        },
        wrapper_result_schema: ['primitive', 'number'],
        prev_id: 'start',
        next: [{ id: 'd7b987c6-e262-4449-a4a1-886d8654e00c' }],
      },
      'd7b987c6-e262-4449-a4a1-886d8654e00c': {
        id: 'd7b987c6-e262-4449-a4a1-886d8654e00c',
        module: 'Math',
        wrapper: 'AddOne',
        wrapper_arguments: {
          placement: 'local',
          value: { a: { placement: 'local', value: 0 } },
        },
        wrapper_result_schema: ['primitive', 'number'],
        prev_id: '5dde4deb-86d6-43ba-8d3d-d282af6aca2b',
        next: [{ id: 'end' }],
      },
    };

    const { arguments_schema, script_schema, result_schema } =
      await service.createScriptVersionData(script);

    // console.log('arguments_schema => ', arguments_schema);
    expect(Object.values(arguments_schema)[0]).toStrictEqual({
      placement: 'local',
      value: ['primitive', 'number'],
    });
    expect(
      typeof (
        script_schema['5dde4deb-86d6-43ba-8d3d-d282af6aca2b']
          .wrapper_arguments as MixedWrapperArguments
      ).value['a'].value === 'string' &&
        (
          script_schema['5dde4deb-86d6-43ba-8d3d-d282af6aca2b']
            .wrapper_arguments as MixedWrapperArguments
        ).value['a'].placement === 'context',
    ).toBe(true);
    expect(result_schema).toStrictEqual(['primitive', 'number']);
  });
});
