'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from '@heroui/react'
import { MdProductionQuantityLimits } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import ModalComponent from './ModalComponentAdd';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';

const Supplier = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get('/pages/api/suppliers');
      if (!response.data) return;
      setProducts(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error);
    }
  };

  const post = async () => {
    try {
      const response = await axios.post('/pages/api/suppliers', newProduct);
      if (!response.data) return;
      setNewProduct({});
      get();
      onOpenChange(); // Cierra el modal después de guardar
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    }
  };

  return (
    <div
      className='flex flex-col gap-4 p-4'
    >
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Añadir un proveedor"
        inputs={[
          { type: "text", placeholder: "Nombre del proveedor", name: "nombre" },
          { type: "text", placeholder: "Direccion", name: "direccion" },
          { type: "text", placeholder: "Telefono", name: "telefono" },
          { type: "text", placeholder: "Mail", name: "mail" }
        ]}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onPress={post}
      />
      {/* Filtros */}
      <div className='flex justify-around items-center gap-2'>
        <Input
          placeholder='Buscar proveedor'
        />
        <Button
          startContent={<MdProductionQuantityLimits fontSize={'200px'} />}
          variant='solid'
          color='primary'
          onPress={onOpen}
        >
          Añadir proveedor
        </Button>
      </div>

      {/* Ver los productos */}
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Direccion</TableColumn>
            <TableColumn>Telefono</TableColumn>
            <TableColumn>Mail</TableColumn>
            <TableColumn>Editar</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.isArray(products) && products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.direccion}</TableCell>
                <TableCell>{p.telefono}</TableCell>
                <TableCell>{p.mail}</TableCell>
                <TableCell>
                  <Button color='primary' className='text-xl'>
                    <CiEdit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Supplier