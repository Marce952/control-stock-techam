'use client'
import { Button, Divider, Card, CardBody } from '@heroui/react';
import React, { useState, Suspense, lazy } from 'react';
import { CgLogOut } from "react-icons/cg";
import { FaArrowTrendUp } from 'react-icons/fa6';
import { FaHandsHelping, FaHeadphonesAlt } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { MdOutlinePointOfSale, MdInventory, MdPeople, MdShoppingCart } from 'react-icons/md';

const Products = lazy(() => import('@/components/Products'));
const Sale = lazy(() => import('@/components/Sale'));
const POS = lazy(() => import('@/components/POS'));
const Supplier = lazy(() => import('@/components/Supplier'));
const Clients = lazy(() => import('@/components/Clients'));

const DashboardComponent = lazy(() => import('@/components/DashboardMetrics'));

const SidebarButtons = [
  { label: 'Dashboard', key: 'home', icon: <GoHome size={20} /> },
  { label: 'Punto de Venta / Caja', key: 'pos', icon: <MdOutlinePointOfSale size={20} /> },
  { label: 'Productos', key: 'products', icon: <MdInventory size={20} /> },
  { label: 'Ventas (Historial)', key: 'sale', icon: <MdShoppingCart size={20} /> },
  { label: 'Proveedores', key: 'supplier', icon: <FaHandsHelping size={20} /> },
  { label: 'Clientes', key: 'clients', icon: <MdPeople size={20} /> },
];

const componentMap = {
  products: <Products />,
  pos: <POS />,
  sale: <Sale />,
  supplier: <Supplier />,
  clients: <Clients />,
  home: <DashboardComponent />
};

const DashboardPage = () => {
  const [selected, setSelected] = useState('home');

  return (
    <div className='flex h-screen bg-gray-50/50 overflow-hidden font-sans'>
      {/* Sidebar */}
      <aside className='w-64 bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0'>
        <div className='flex flex-col'>
          <div className='flex items-center justify-center h-20 border-b border-gray-100'>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-br from-[#8906e6] to-[#6b05b0] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
               </div>
               <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">DevStock</span>
             </div>
          </div>

          <nav className='flex flex-col gap-2 p-4 mt-4'>
            {SidebarButtons.map(btn => {
              const isActive = selected === btn.key;
              return (
                <button
                  key={btn.key}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 group'
                  }`}
                  onClick={() => setSelected(btn.key)}
                >
                  <span className={`${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {btn.icon}
                  </span>
                  {btn.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className='p-4 border-t border-gray-100'>
          <button
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all duration-200 group"
          >
            <CgLogOut size={20} className="text-gray-400 group-hover:text-red-500" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className='flex-1 overflow-auto bg-gray-50/50 flex flex-col relative'>
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="p-8 pb-12 w-full max-w-7xl mx-auto z-10 min-h-full">
          <Suspense fallback={
            <div className="flex items-center justify-center w-full h-full min-h-[400px]">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            {componentMap[selected]}
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage;