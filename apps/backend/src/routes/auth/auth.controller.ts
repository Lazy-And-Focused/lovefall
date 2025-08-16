import type { Request, Response } from "express";
import type { Cache } from "cache-manager";

import { Controller, Get, Inject, Injectable, Next, Req, Res } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { ROUTE, ROUTES } from "./auth.routes";

import env from "services/env.service";
import Hash from "services/hash.service";
import AuthApi from "services/auth.service";

@Injectable()
@Controller(ROUTE)
export class AuthController {
  public constructor(
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  @Get()
  public printMethods() {
    const { abbreviations, methods } = AuthApi.methods;
    const toStr = (str: unknown) => JSON.stringify(str, undefined, 4);

    return {
      message: `Sorry, but you can't auth without method, try next methods:\n${toStr(methods)}\nAnd this abbreviations:\n${toStr(abbreviations)}`,
      abbreviations,
      methods
    };
  }

  @Get(ROUTES.GET)
  public async auth(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const { method } = req.params;
    
    if (method === "@me") {
      if (!req.query.code) return;

      try {
        const data = await (await fetch(env.AUTH_URL + "/api/auth/" + method + "?code=" + req.query.code)).json();
        
        return res.send(data);
      } catch (error) {
        console.log(error);

        return res.sendStatus(500);
      }
    };

    const redirect = (req.query.callback?.toString() || req.hostname);
    
    res.cookie("redirect", redirect);

    res.redirect(env.AUTH_URL + "/api/auth/" + method + "?callback=" + env.THIS_URL + "/api/auth/" + method + "/callback");
  }

  @Get(ROUTES.GET_CALLBACK)
  public callback(@Req() req: Request, @Res() res: Response) {
    const redirect = (req.cookies["redirect"] || req.hostname);
    const code = req.query.code;

    console.log(redirect, code);

    if (!code) {
      return res.sendStatus(400);
    }

    return res.redirect(redirect + "?code=" + code);
  }
}
