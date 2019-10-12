let scrollBarWidth;

export default function () {
  if (!_.isUndefined(scrollBarWidth)) return scrollBarWidth

  const outer = document.createElement('div')
  outer.className = 'c-scrollbar__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.append(inner)

  const widthWidthScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWidthScroll

  return scrollBarWidth
}