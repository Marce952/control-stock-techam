'use client'
import { Button, Divider } from '@heroui/react';
import React, { useState, Suspense, lazy } from 'react';
import { CgLogOut } from "react-icons/cg";
import { GoHome } from "react-icons/go";

const Products = lazy(() => import('../../Components/Products'));
const Sale = lazy(() => import('../../Components/Sale'));
const Supplier = lazy(() => import('../../Components/Supplier'));
const Clients = lazy(() => import('../../Components/Clients'));

const DashboardComponent = () => (
  <div>
    <h1 className='text-3xl font-bold mb-4'>Panel de control</h1>
    <Divider />

    <div className='grid'>
      <div className='border-2 border-gray-300 w-1/4 h-20 rounded-md bg-white p-4'>
        <p>Cantidad de clientes</p>
      </div>
    </div>
  </div>
);

const SidebarButtons = [
  { label: 'Proveedores', key: 'supplier' },
  { label: 'Clientes', key: 'clients' },
  { label: 'Productos', key: 'products' },
  { label: 'Ventas', key: 'sale' },
];

const componentMap = {
  products: <Products />,
  sale: <Sale />,
  supplier: <Supplier />,
  clients: <Clients />,
  home: <DashboardComponent />
};



const DashboardPage = () => {
  const [selected, setSelected] = useState('home');

  return (
    <div className='container mx-auto h-screen'>
      <div className='flex h-full gap-2'>
        {/* Sidebar */}
        <div className='w-1/6 bg-white p-4 rounded-r-xl shadow-xl flex flex-col gap-2 justify-between'>
          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <Button
                variant='flat'
                className='text-xl text-white bg-primary'
                onPress={() => setSelected('home')}
              >
                <GoHome />
              </Button>
            </div>

            <Divider className='my-4' />

            <div className='flex flex-col gap-2'>
              {SidebarButtons.map(btn => (
                <Button
                  key={btn.key}
                  className={`py-2 px-4 rounded border ${selected === btn.key ? 'bg-primary text-white' : 'bg-white text-black'}`}
                  onPress={() => setSelected(btn.key)}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <Divider className='my-2' />

            <div className='flex justify-center'>
              <Button
                variant='flat'
                className='text-xl text-white bg-gray-400'
              >
                <CgLogOut />
              </Button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className='w-full p-4 bg-red-200'>
          <Suspense fallback={<div>Cargando...</div>}>
            {componentMap[selected]}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;