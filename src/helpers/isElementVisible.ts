export const isElementVisible = (element: HTMLElement | null | undefined) => {
  const parent = element?.parentElement
  if (!element || !parent) return
  const parentScrollHeight = parent.scrollHeight
  const parentHeight = parent.getBoundingClientRect().height
  const parentMinPosition = parentScrollHeight - parentHeight

  const isVisible = element.offsetTop >= parentMinPosition && element.offsetTop <= parentScrollHeight +
    100
  return isVisible
}
