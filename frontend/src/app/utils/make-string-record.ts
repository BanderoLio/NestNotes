export function makeStringRecord(obj: Record<string, unknown>) {
  const stringRecord: Record<string, string> = {};
  for (const key in obj) {
    switch (typeof key) {
      case 'undefined':
        break;
      case 'function':
      case 'object':
        throw new TypeError(
          `makeStringRecord: Key ${String(key)} has unsupported type`,
        );
      default:
        stringRecord[key] = String(obj[key]);
    }
  }
  return stringRecord;
}
