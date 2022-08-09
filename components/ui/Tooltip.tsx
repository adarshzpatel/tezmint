import Tippy from '@tippyjs/react'
import React, { FC, JSXElementConstructor, ReactElement, ReactNode } from 'react'
import 'tippy.js/dist/tippy.css'

interface Props {
  content: string
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}

const Tooltip: FC<Props> = ({ content,children }) => {
  if (!content) return null

  return (
    <Tippy
      placement="top"
      duration={0}
      className="p-2.5 tracking-wide !rounded-xl !leading-5 shadow-lg"
      content={content}
    >
      {children}
    </Tippy>
  )
}

export default Tooltip