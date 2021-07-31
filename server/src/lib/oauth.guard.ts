import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGuard {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const { input } = ctx.getArgs();

    req.body = {
      ...req.body,
      access_token: input.accessToken
    };
    return req;
  }
}
