import React from 'react'
import Card from '../../design/Card'
import {FiExternalLink} from "react-icons/fi" 
import { Fa2NftMetadata } from '../types'

type Props = { 
  thumbnail:string 
} & Fa2NftMetadata

const NftPreview = ({description,externalLink,name,thumbnail}: Props) => {
  return (
    <div className='p-4 w-[336px]  overflow-auto bg-gradient-to-tr backdrop-brightness-110 shadow-xl border border-gray-300  rounded-xl'>
      <img className='rounded-lg w-full  aspect-square' src={thumbnail} alt='preview'/>
      <p className='font-medium text-lg mt-4'>{name}</p>
      <p className='text-gray-400 mt-1 whitespace-pre-wrap'>{description}</p>
     {externalLink && <a href={externalLink} target="_blank" rel="noreferrer" className='text-blue-500 flex items-center gap-2 mt-1'>{externalLink}<FiExternalLink className='h-4 w-4'/></a>}
    </div>
  )
}

export default NftPreview