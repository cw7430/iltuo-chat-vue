import { z } from "zod";

export const nativeSignInInnerResponseSchema = z.object({
  password: z.string(),
  authority: z.enum(["ADMIN", "USER"]),
});

export type NativeSignInInnerResponseDto = z.infer<typeof nativeSignInInnerResponseSchema>;
