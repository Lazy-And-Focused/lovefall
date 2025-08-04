import * as Database from "database/index";

import passport = require("passport");
import { Profile } from "passport";

import { AuthTypes, Auth as AuthType, User as UserType } from "@lovefall/types";
import { Strategy, VerifyCallback, VerifyFunction } from "passport-oauth2";

import { getPassportAuthEnv } from "api/passport";
import { Model } from "mongoose";

const { User, Auth } = Database;

const defaultPassports: Record<AuthTypes, { path: string; scopes?: string[] }> = {
  google: {
    path: "passport-google-oauth20",
    scopes: ["profile"]
  },

  github: {
    path: "passport-github",
    scopes: []
  },

  gitlab: {
    path: "passport-gitlab",
    scopes: ["profile"]
  },

  bitbucket: {
    path: "passport-bitbucket-oauth20",
    scopes: []
  },

  discord: {
    path: "passport-discord",
    scopes: ["identify"]
  }
};

const CreateOrUpdate = async <T>({
  model,
  findData,
  data
}: {
  model: Model<T>;
  findData: Partial<T>;
  data: Partial<T>;
}) => {
  const finded = await model.findOne(findData);

  if (!finded) {
    return model.create({ ...findData, ...data, id: Database.generateId(), created_at: new Date().toISOString() });
  }

  return model.findOneAndUpdate(findData, data, {
    returnDocument: "after"
  });
};

class Authenticator {
  private readonly _passport: passport.PassportStatic;

  public constructor(passport: passport.PassportStatic) {
    this._passport = passport;
  }

  public init = () => {
    for (const passport in defaultPassports) {
      const strategy = require(defaultPassports[passport].path).Strategy;
      
      this.strategy(strategy, {
        ...getPassportAuthEnv(passport.toUpperCase() as Uppercase<AuthTypes>),
        type: defaultPassports[passport].path,
        scopes: defaultPassports[passport]?.scopes || []
      });
    }
  };

  protected verify<Done extends (...data: unknown[]) => void = VerifyCallback>(type: AuthTypes) {
    return async (access_token: string, refresh_token: string, profile: Profile, done: Done) => {
      try {
        const { id } = profile;
        const now = new Date().toISOString();

        const user = await CreateOrUpdate<UserType>({
          findData: {
            username: profile.username || profile.displayName || profile.name.givenName
          },
          data: {
            created_at: now,
          },
          model: User
        });

        const authUser = await CreateOrUpdate<AuthType>({
          findData: {
            service_id: id
          },
          data: {
            profile_id: user.id,
            access_token,
            refresh_token,

            created_at: now,
            type: type
          },
          model: Auth
        });

        return done(null, {
          id: authUser.id,
          profile_id: authUser.profile_id,
          service_id: authUser.service_id,

          access_token: authUser.access_token,
          refresh_token: authUser.refresh_token,

          created_at: authUser.created_at,
          type: authUser.type
        } as AuthType);
      } catch (error) {
        console.log(error);

        return done(error, null);
      }
    };
  }

  protected strategy(
    strategy: new (
      options: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope?: string[];
      },
      verify: VerifyFunction
    ) => Strategy,
    api: {
      id: string;
      secret: string;
      callback: string;
      scopes?: string[];
      type: AuthTypes;
      authURL?: string;
      tokenURL?: string;
    }
  ) {
    this._passport.use(
      new strategy(
        {
          clientID: api.id,
          clientSecret: api.secret,
          callbackURL: api.callback,
          scope: api.scopes
        },
        this.verify(api.type)
      )
    );
  }
}

export default Authenticator;
