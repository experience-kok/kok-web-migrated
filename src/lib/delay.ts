/**
 * second초만큼 딜레이를 반환합니다.
 * @param second
 * @returns
 */
export function delay(second: number) {
  return new Promise(resolve => setTimeout(resolve, second * 1000));
}
