import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @MessagePattern('script-storage.get-script-by-id')
  getScriptById(@Payload('script_id') id: string) {
    return this.appService.getScriptById(id);
  }

  @MessagePattern('script-storage.get-script-by-id-and-version')
  getScriptByIdAndVersion(payload: { id: string; version: number }) {
    return this.appService.getScriptByIdAndVersion(payload);
  }

  @MessagePattern('script-storage.get-scripts-by-account-id')
  getScriptsByAccountId(@Payload('account_id') account_id: string) {
    return this.appService.getScriptsByAccountId(account_id);
  }

  @MessagePattern('script-storage.get-script-versions-by-id')
  getScriptVersionsById(@Payload('script_id') script_id: string) {
    return this.appService.getScriptVersionsById(script_id);
  }

  @MessagePattern('script-storage.get-script-arguments-schema')
  getScriptArgumentsSchema(payload: { id: string; version: number }) {
    return this.appService.getScriptArgumentsSchema(payload);
  }

  @MessagePattern('script-storage.get-script-return-value-schema')
  getScriptReturnValueSchema(payload: { id: string; version: number }) {
    return this.appService.getScriptReturnValueSchema(payload);
  }

  @MessagePattern('script-storage.save-script-as-draft')
  saveScriptAsDraft(payload: {
    account_id: string;
    script: any;
    name: string;
    description: string;
    creator_id: string;
  }) {
    return this.appService.saveScriptAsDraft(payload);
  }

  @MessagePattern('script-storage.update-script-draft')
  updateScriptDraft(payload: {
    script_id: string;
    version: number;
    script: any;
  }) {
    return this.appService.updateScriptDraft(payload);
  }

  @MessagePattern('script-storage.save-script-for-testing')
  saveScriptForTesting(payload: { script_id: string; version: number }) {
    return this.appService.saveScriptForTesting(payload);
  }

  @MessagePattern('script-storage.save-script-for-production')
  saveScriptForProduction(payload: { script_id: string; version: number }) {
    return this.appService.saveScriptForProduction(payload);
  }

  @MessagePattern('script-storage.check_script')
  checkScript(payload: { id: string; version: number }) {
    return this.appService.checkScript(payload);
  }

  // @MessagePattern('script-storage.get-script-by-id')
  // checkScript(payload: { id: string }) {
  //   console.log('payload', payload);
  //   return { a: 1, b: 2, payload };
  // }
}
