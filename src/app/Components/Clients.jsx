'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from '@heroui/react'
import { BsPersonBoundingBox } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import ModalComponent from './ModalComponentAdd';
import { CiEdit } from 'react-icons/ci';
import axios from 'axios';

const Clients = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({});
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    get()
  }, [])

  const get = async () => {
    try {
      const response = await axios.get('/pages/api/clients');
      if (!response.data) return;
      setClients(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error);
    }
  };

  const onSave = async () => {
    try {
      if (edit) {
        await axios.put(`/pages/api/clients/${edit.id}`, newClient);
      } else {
        await axios.post('/pages/api/clients', newClient);
      }
      setNewClient({});
      setEdit(null);
      get();
      onOpenChange();
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
        onOpenChange={() => {
          setEdit(null);
          setNewClient({});
          onOpenChange();
        }}
        title={edit ? "Editar cliente" : "Añadir un cliente"}
        buttonTitle={edit ? "Editar" : "Añadir"}
        inputs={[
          { type: "text", placeholder: "Nombre del cliente", name: "nombre" },
          { type: "text", placeholder: "Telefono del cliente", name: "telefono" },
          { type: "text", placeholder: "Mail del cliente", name: "mail" }
        ]}
        newProduct={newClient}
        setNewProduct={setNewClient}
        onPress={onSave}
      />
      {/* Filtros */}
      <div className='flex justify-around items-center gap-2'>
        <Input
          placeholder='Buscar cliente'
        />
        <Button
          startContent={<BsPersonBoundingBox fontSize={'200px'} />}
          variant='solid'
          color='primary'
          onPress={onOpen}
        >
          Crear cliente
        </Button>
      </div>

      {/* Ver los productos */}
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Telefono</TableColumn>
            <TableColumn>Mail</TableColumn>
            <TableColumn>Editar</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.isArray(clients) && clients.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.nombre}</TableCell>
                <TableCell>{c.telefono}</TableCell>
                <TableCell>{c.mail}</TableCell>
                <TableCell>
                  <Button
                    color='primary'
                    className='text-xl'
                    onPress={() => {
                      setEdit(c);
                      setNewClient(c);
                      onOpen();
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

export default Clients