export const isElementVisible = (element: HTMLElement) => {
  const parent = element.parentElement
  if (!parent) return
  const parentScrollHeight = parent.scrollHeight
  const parentHeight = parent.getBoundingClientRect().height
  const parentMinPosition = parentScrollHeight - parentHeight
  const isVisible = element.offsetTop >= parentMinPosition && element.offsetTop <= parentScrollHeight +
    100
  console.log(isVisible)
  return isVisible
}
