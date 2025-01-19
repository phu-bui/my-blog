import React from 'react'
import components from '../../components/dynamic'

interface ComponentMap {
  [key: string]: React.ElementType;
}

const componentMap: ComponentMap = {
  ...components,
  p: 'p' as React.ElementType,
  span: 'span' as React.ElementType,
  code: 'code' as React.ElementType,
  a: 'a' as React.ElementType,
  Equation: components.Equation,
  ol: 'ol' as React.ElementType,
  ul: 'ul' as React.ElementType,
  li: 'li' as React.ElementType,
  blockquote: 'blockquote' as React.ElementType,
};

function applyTags(tags: any[] = [], children: any, noPTag = false, key: number) {
  let child = children

  for (const tag of tags) {
    const props: { [key: string]: any } = { key }
    let tagName = tag[0]

    if (noPTag && tagName === 'p') tagName = React.Fragment
    if (tagName === 'c') tagName = 'code'
    if (tagName === '_') {
      tagName = 'span'
      props.className = 'underline'
    }
    if (tagName === 'a') {
      props.href = tag[1]
    }
    if (tagName === 'e') {
      tagName = 'Equation'
      props.displayMode = false
      child = tag[1]
    }

    child = React.createElement(componentMap[tagName] || tagName, props, child)
  }
  return child
}

export function textBlock(text: any[] = [], noPTag = false, mainKey: number) {
  const children: any[] = []
  let key = 0

  for (const textItem of text) {
    key++
    if (textItem.length === 1) {
      children.push(textItem)
      continue
    }
    children.push(applyTags(textItem[1], textItem[0], noPTag, key))
  }
  return React.createElement(
    noPTag ? React.Fragment : componentMap.p,
    { key: mainKey },
    ...children,
    noPTag
  )
}
