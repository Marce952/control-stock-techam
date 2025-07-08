'use client'
import { Button } from '@heroui/react'
import Link from 'next/link'
import React, { useState } from 'react'

const SliderComponent = () => {
  const [content, setContent] = useState([
    'Productos', 'Clientes', 'Proveedores', 'Ventas', 'Compras',
  ])


  return (
      <div
        className='flex flex-col items-center justify-around w-1/5 border-r-2'
      >
        {content.map((item, index) => (
          <Link
            href={`/pages/${item}`.toLowerCase()}
            key={index}
            className='w-full'
          >
            <Button
              className='text-white bg-[#8906e6] hover:bg-[#a00ae6] border-0 w-full'
              variant="bordered"
              size="lg"
              color="primary"
            >
              {item}
            </Button>
          </Link>
        ))}
      </div>
  )
}

export default SliderComponent