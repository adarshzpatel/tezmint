import clsx from 'clsx'
import React from 'react'

type Props = {
  className?:string
  children:React.ReactNode
}

const Card = (props: Props) => {
  return (
    <div className={clsx(
      'bg-white hover:bg-gray-100',
      props.className
    )
    }>{props.children}</div>
  )
}

export default Card