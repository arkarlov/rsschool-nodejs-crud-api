export const pickObjectKeys = <T, K extends keyof T, R extends Pick<T, K> = Pick<T, K>>(
  obj: R,
  keys: K[]
): Pick<T, K> =>
  keys.reduce(
    (acc, key) => {
      const value = obj[key]
      if (typeof value !== 'undefined') {
        acc[key] = value as unknown as T[K]
      }
      return acc
    },
    {} as Pick<T, K>
  )
