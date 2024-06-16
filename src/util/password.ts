import { hash, compare } from "bcrypt";
import { PASSWORD_HASH_SALT_ROUNDS } from "~/config/constatnt";

async function hashPassord(password: string) {
  return hash(password, PASSWORD_HASH_SALT_ROUNDS);
}

async function comparePassword(
  plainPassword: string,
  encryptedPassord: string,
) {
  return compare(plainPassword, encryptedPassord);
}

export { hashPassord, comparePassword };
