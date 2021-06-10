export function range(start: number, end?: number) {
  let length: number
  let offset: number
  let shouldReverse = false

  if (end === undefined) {
    length = start
    offset = 0
  } else if (start > end) {
    length = start - end
    if (end === 0) {
      offset = 1
    } else {
      offset = start - end
    }
    shouldReverse = true
  } else {
    length = end - start
    offset = start
  }

  const numbers = Array.from({ length }, (_v, i) => i + offset)
  return shouldReverse ? numbers.slice().reverse() : numbers
}
