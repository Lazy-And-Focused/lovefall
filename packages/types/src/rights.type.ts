import { BitBuilder } from "fbit-field";

type IRights<T extends any[] | readonly any[]> = Record<T[number], bigint>;

export namespace Rights {
  export type Chat = IRights<typeof Chat.ALL>;
  export namespace Chat {
    export const EXCLUDE = [
      "CREATOR",
      "ADMINISTATOR",
      "BANNED",

      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "MUTE_MEMBERS",
      "VIEW_MEMBERS",

      "CREATE_INVITE_LINKS",
    ] as const;

    export const ALL = [...EXCLUDE, "VIEW"] as const;

    const builder = new BitBuilder(ALL);

    export const AVAILABLE: Chat = builder.execute(0n);
    export const DEFAULT: Chat = builder.execute(0n, Chat.EXCLUDE);
    export const RAW_AVAILABLE = builder.resolve(AVAILABLE);
    export const RAW_DEFAULT = builder.resolve(DEFAULT);
  }

  // ## { COMPILED__WRITE_COMPILED_HERE } ## \\

  /**
   * - this file was auto genereted by compiler
   * - if you see inconsistencies: https://github.com/FOCKUSTY/bit-field/issues
   */
  export const raw = {
    chat: {
      /** @value 1 */
      creator: 1n << 0n,

      /** @value 2 */
      administator: 1n << 1n,

      /** @value 4 */
      banned: 1n << 2n,

      /** @value 8 */
      kickMembers: 1n << 3n,

      /** @value 16 */
      banMembers: 1n << 4n,

      /** @value 32 */
      muteMembers: 1n << 5n,

      /** @value 64 */
      viewMembers: 1n << 6n,

      /** @value 128 */
      createInviteLinks: 1n << 7n,

      /** @value 256 */
      view: 1n << 8n,
    } as const,
  } as const;
  // ## { COMPILED__WRITE_COMPILED_HERE } ## \\

  export const CONSTANTS = {
    raw: {
      default: {
        chat: Chat.RAW_DEFAULT,
      },

      available: {
        chat: Chat.RAW_AVAILABLE,
      },
    },

    object: {
      default: {
        chat: Chat.DEFAULT,
      },

      available: {
        chat: Chat.AVAILABLE,
      },
    },
  };

  export namespace Raw {
    // ## { COMPILED__WRITE_EXPORT_HERE } ## \\

    export type Keys = keyof typeof raw;
    export type Raw<T extends Keys> = (typeof raw)[T];
    export type RawKeys<T extends Keys> = keyof Raw<T>;
    // ## { COMPILED__WRITE_EXPORT_HERE } ## \\
  }
}
