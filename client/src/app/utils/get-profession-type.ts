import { ProfessionType } from '../interfaces';

export default function getProfessionType(
  input: string | null,
): ProfessionType | null {
  if (input) {
    for (const profession of Object.values(ProfessionType)) {
      if (input === profession) {
        return profession;
      }
    }
    return null;
  }
  return null;
}
