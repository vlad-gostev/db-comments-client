export type DeepItem<T> = {
  _id?: string
  children?: T[]
} & Record<string, any>

export function deepUpdateItem <T extends DeepItem<T>>(list: T[], updateItem:T): T[] {
  return list.map((item) => {
    if (item._id === updateItem._id) {
      return updateItem
    }

    if (item.children?.length) {
      return {
        ...item,
        children: deepUpdateItem(item.children, updateItem),
      }
    }
    return item
  })
}

export function deepDeleteItem <T extends DeepItem<T>>(list: T[], deletedId: string): T[] {
  const test = list.map((item) => {
    if (item._id === deletedId) {
      return null as unknown as T
    }

    if (item.children?.length) {
      return {
        ...item,
        children: deepDeleteItem(item.children, deletedId),
      }
    }

    return item
  })

  return test.filter(Boolean)
}
