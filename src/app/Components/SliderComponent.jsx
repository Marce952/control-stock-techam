'use client'
import { Button } from '@heroui/react'
import Link from 'next/link'
import React, { useState } from 'react'

const SliderComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [content] = useState([
    'Proveedores', 'Clientes', 'Productos', 'Ventas',
  ])

  return (
    <div className='flex items-center justify-around w-full border-r-2 border-b-2 border-[#8906e6]'>
      {content.map((item, index) => (
        <Link
          href={`/pages/${item}`.toLowerCase()}
          key={index}
          className='w-full'
        >
          <Button
            className={`text-black bg-transparent rounded-none w-full border-r-2 border-[#8906e6] 
              ${selectedIndex == index ? 'bg-[#8906e6] text-white' : ''} hover:bg-[#8906e6] hover:text-white`}
            size="md"
            variant='flat'
            onPress={() => setSelectedIndex(index)}
          >
            {item}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default SliderComponent