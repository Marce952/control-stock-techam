'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from '@heroui/react'
import { MdProductionQuantityLimits } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import ModalComponent from './ModalComponentAdd';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';

const Supplier = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({});
  const [edit, setEdit] = useState(null)

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get('/pages/api/suppliers');
      if (!response.data) return;
      setSuppliers(response.data);
    } catch (error) {
      console.log("🚀 ~ getsuppliers ~ error:", error);
    }
  };

  const onSave = async () => {
    try {
      if (edit) {
        await axios.put(`/pages/api/suppliers/${edit.id}`, newSupplier);
      } else {
        await axios.post('/pages/api/suppliers', newSupplier);
      }
      setNewSupplier({});
      setEdit(null);
      get();
      onOpenChange();
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    }
  }

  return (
    <div
      className='flex flex-col gap-4 p-4'
    >
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={() => {
          setEdit(null);
          setNewSupplier({})
          onOpenChange()
        }}
        title={edit ? "Editar un proveedor" : "Añadir un proveedor"}
        buttonTitle={edit ? "Editar" : "Añadir"}
        inputs={[
          { type: "text", placeholder: "Nombre del proveedor", name: "nombre" },
          { type: "text", placeholder: "Direccion", name: "direccion" },
          { type: "text", placeholder: "Telefono", name: "telefono" },
          { type: "text", placeholder: "Mail", name: "mail" },
          { type: "text", placeholder: "Sitio web", name: "sitio" },
        ]}
        newProduct={newSupplier}
        setNewProduct={setNewSupplier}
        onPress={onSave}
      />
      {/* Filtros */}
      <div className='flex justify-around items-center gap-2'>
        <Input
          placeholder='Buscar proveedor'
        />
        <Button
          startContent={<MdProductionQuantityLimits />}
          variant='solid'
          color='primary'
          className='text-white text-xl'
          onPress={onOpen}
        >
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
            <TableColumn>Sitio web</TableColumn>
            <TableColumn>Editar</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.isArray(suppliers) && suppliers.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.direccion}</TableCell>
                <TableCell>{p.telefono}</TableCell>
                <TableCell>{p.mail}</TableCell>
                <TableCell className='line-clamp-1'>{p.sitio}</TableCell>
                <TableCell>
                  <Button
                    color='primary'
                    className='text-2xl text-white'
                    onPress={() => {
                      setEdit(p)
                      setNewSupplier(p)
                      onOpen()
                    }}
                  >
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