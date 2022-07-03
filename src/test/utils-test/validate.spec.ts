import validate from "@/utils/validate";
import { expect, test,} from 'vitest'

test ("validate email", () => {
  const email = "foo@gmail.com";
  expect(validate.isValidEmail(email)).toBe(true);

  const emptyEmail = "";
  expect(validate.isValidEmail(emptyEmail)).toBe(false);

  const invalidEmail = "foo@gmail";
  expect(validate.isValidEmail(invalidEmail)).toBe(false);
})

