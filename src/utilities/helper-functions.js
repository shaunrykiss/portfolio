
export const setParallaxRight = (num) => num > 800
  ? "-30%"
  : num > 576
  ? "-75%"
  : "-220%"

export const slugify = (string) => string.toLowerCase().split('-').join('').split(' ').join('-');

export const listify = (arr) => {
  if (arr.length > 1) {
    const lastItem = arr[arr.length - 1]
    arr.pop()

    const joined = arr.join(', ')

    return `${joined} & ${lastItem}`
  } else {
    return arr[0];
  }
}