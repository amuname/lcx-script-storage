import { Inject, Injectable } from '@nestjs/common';
import { PrismaServiceService } from './prisma-service/prisma-service.service';
// import { prisma_client } from './prisma-service/prisma-service.service';
import { ClientProxy } from '@nestjs/microservices';
import { ScriptBuilderService } from './script-builder/script-builder.service';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    @Inject('TRANSPORT') private transport: ClientProxy,
    private prisma_client: PrismaServiceService,
    private scriptBuilderService: ScriptBuilderService,
  ) {}

  createAccount(payload: { account_id: string; user_id: string }) {
    return this.prisma_client.account.create({
      data: {
        id: payload.account_id,
        user_id: payload.user_id,
      },
    });
  }

  getScriptById(script_id: string) {
    return this.prisma_client.script.findUnique({
      where: {
        id: script_id,
      },
    });
  }

  getScriptByIdAndVersion(payload: { id: string; version: number }) {
    return this.prisma_client.scriptVersion.findUnique({
      where: {
        script_id_version: {
          script_id: payload.id,
          version: payload.version,
        },
      },
    });
  }

  getScriptsByAccountId(account_id: string) {
    // this.prismaServiceService.
    return this.prisma_client.script.findMany({
      where: {
        account_id,
      },
    });
  }

  getScriptVersionsById(script_id: string) {
    return this.prisma_client.scriptVersion.findMany({
      where: {
        script_id,
      },
    });
  }

  getScriptArgumentsSchema(payload: { id: string; version: number }) {
    return this.prisma_client.scriptVersion.findUnique({
      where: {
        script_id_version: {
          script_id: payload.id,
          version: payload.version,
        },
      },
      select: {
        arguments_schema: true,
      },
    });
  }

  getScriptReturnValueSchema(payload: { id: string; version: number }) {
    return this.prisma_client.scriptVersion.findUnique({
      where: {
        script_id_version: {
          script_id: payload.id,
          version: payload.version,
        },
      },
      select: {
        result_schema: true,
      },
    });
  }

  async saveScriptAsDraft(payload: {
    account_id: string;
    script: any;
    name: string;
    description: string;
    creator_id: string;
  }) {
    const script_schema_raw = JSON.stringify(payload.script);
    const script = await this.scriptBuilderService.createScriptVersionData(
      payload.script,
    );
    // TODO сделать обработку скрипта и
    // создание arguments_schema, script_schema, result_schema
    return this.prisma_client.script.create({
      data: {
        account: {
          connect: {
            id: payload.account_id,
          },
        },
        versions: {
          create: [
            {
              version: 1,
              script_schema: JSON.stringify(script.script_schema),
              script_schema_raw,
              arguments_schema: JSON.stringify(script.arguments_schema),
              result_schema: JSON.stringify(script.result_schema),
            },
          ],
        },
        name: payload.name,
        description: payload.description,
        creator_id: payload.creator_id,
      },
    });
  }

  async updateScriptDraft(payload: {
    script_id: string;
    version: number;
    script: any;
  }) {
    // const script = payload.script;
    const script_schema_raw = JSON.stringify(payload.script);
    const script = await this.scriptBuilderService.createScriptVersionData(
      payload.script,
    );
    // TODO сделать обработку скрипта и
    // создание arguments_schema, script_schema, result_schema
    return this.prisma_client.scriptVersion.update({
      where: {
        script_id_version: {
          script_id: payload.script_id,
          version: payload.version,
        },
      },
      data: {
        script_schema: JSON.stringify(script.script_schema),
        script_schema_raw,
        arguments_schema: JSON.stringify(script.arguments_schema),
        result_schema: JSON.stringify(script.result_schema),
      },
    });
  }

  saveScriptForTesting(payload: { script_id: string; version: number }) {
    return this.prisma_client.scriptVersion.update({
      where: {
        script_id_version: {
          script_id: payload.script_id,
          version: payload.version,
        },
      },
      data: {
        status: {
          set: 'TESTING',
        },
      },
    });
  }

  async saveScriptForProduction(payload: {
    script_id: string;
    version: number;
  }) {
    const prod_version = await this.prisma_client.scriptVersion.update({
      where: {
        script_id_version: {
          script_id: payload.script_id,
          version: payload.version,
        },
      },
      data: {
        status: {
          set: 'PROD',
        },
      },
    });

    return await this.prisma_client.productionScript.create({
      data: {
        script_version: {
          connect: {
            script_id_version: {
              script_id: prod_version.script_id,
              version: prod_version.version,
            },
          },
        },
        arguments_schema: prod_version.arguments_schema,
        prod_script: prod_version.script_schema,
        result_schema: prod_version.result_schema,
      },
    });
  }

  async checkScript(payload: { id: string; version: number }) {
    // Логика проверки скрипта
  }
}
