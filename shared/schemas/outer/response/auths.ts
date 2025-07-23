import { z } from "zod";

const baseSchema = {
  userId: z.string().nonempty({ message: "이메일을 입력해주세요." }),
  password: z.string().nonempty({ message: "비밀번호를 입력해주세요." }),
};

const baseSignUpSchema = {
  userId: baseSchema.userId.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "올바른 이메일 형식이어야 합니다.",
  }),
  password: baseSchema.password.regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|:;"'<>,.?/~`]).{10,25}$/,
    {
      message: "10~25자 영문, 숫자, 특수문자를 포함해야 합니다.",
    }
  ),
  name: z.string().nonempty({ message: "닉이름을 입력해주세요." }),
  birthDate: z
    .string()
    .nonempty({ message: "생년월일을 입력해주세요." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "올바른 날짜 형식이어야 합니다.(예: 2025-01-01)" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "성별을 선택해주세요." }),
  mbti: z.enum(
    [
      "ISTJ",
      "ISFJ",
      "INFJ",
      "INTJ",
      "ISTP",
      "ISFP",
      "INFP",
      "INTP",
      "ESTP",
      "ESFP",
      "ENFP",
      "ENTP",
      "ESTJ",
      "ESFJ",
      "ENFJ",
      "ENTJ",
    ],
    {
      message: "MBTI를 선택해주세요.",
    }
  ),
};

export const nativeSignInOuterRequestSchema = z.object(baseSchema);

export const nativeSignUpOuterRequestSchema = z.object(baseSignUpSchema);

export const userIdDuplicateCheckOuterRequestSchema = z.object({
  userId: baseSignUpSchema.userId,
});

export const changePasswordOuterRequestSchema = z.object({
  formalPassword: baseSchema.password,
  newPassword: baseSignUpSchema.password,
});

export type NativeSignInOuterRequestDto = z.infer<typeof nativeSignInOuterRequestSchema>;
export type UserIdDuplicateCheckOuterRequestDto = z.infer<typeof userIdDuplicateCheckOuterRequestSchema>;
export type NativeSignUpOuterRequestDto = z.infer<typeof nativeSignUpOuterRequestSchema>;
export type ChangePasswordOuterRequestDto = z.infer<typeof changePasswordOuterRequestSchema>;
