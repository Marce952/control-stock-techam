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
      const response = await axios.get('/api/clients');
      if (!response.data) return;
      setClients(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error);
    }
  };

  const onSave = async () => {
    try {
      if (Number(newClient.deuda) > 0 && !newClient.fecha_inicio_deuda) {
        alert("Por favor, ingrese la Fecha de Inicio de Deuda.");
        return;
      }
      
      const payload = {
        ...newClient,
        deuda: newClient.deuda ? Number(newClient.deuda) : 0,
        fecha_inicio_deuda: newClient.deuda ? (newClient.fecha_inicio_deuda ? new Date(newClient.fecha_inicio_deuda).toISOString() : new Date().toISOString()) : null,
        fecha_ultimo_movimiento: new Date().toISOString()
      };
      
      if (edit) {
        await axios.put(`/api/clients/${edit.id}`, payload);
      } else {
        await axios.post('/api/clients', payload);
      }
      setNewClient({});
      setEdit(null);
      get();
      onOpenChange();
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    }
  };


  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 10;

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredClients = [...clients];

    if (filterValue) {
      filteredClients = filteredClients.filter((client) =>
        client.nombre?.toLowerCase().includes(filterValue.toLowerCase()) || 
        client.mail?.toLowerCase().includes(filterValue.toLowerCase()) ||
        client.telefono?.includes(filterValue)
      );
    }
    return filteredClients;
  }, [clients, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center bg-gray-50/50 border-t border-gray-100">
        <span className="w-[30%] text-sm text-gray-500">
          Total: {clients.length} clientes
        </span>
        <div className="flex w-full justify-center">
        {pages > 0 && (
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
            <Button
              className="min-w-8 h-8 rounded-l-lg rounded-r-none border-r border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-medium"
              size="sm"
              variant="flat"
              onPress={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
              isDisabled={page === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center justify-center px-4 w-12 text-sm font-medium text-gray-700">
              {page}
            </div>
            <Button
              className="min-w-8 h-8 rounded-r-lg rounded-l-none border-l border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-medium"
              size="sm"
              variant="flat"
              onPress={() => setPage((prev) => (prev < pages ? prev + 1 : prev))}
              isDisabled={page >= pages}
            >
              Siguiente
            </Button>
          </div>
        )}
        </div>
      </div>
    );
  }, [clients.length, page, pages]);

  return (
    <div className='flex flex-col gap-4 p-4 max-w-7xl mx-auto'>
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cartera de Clientes</h2>
          <p className="text-sm text-gray-500 mt-1">Administra la base de datos de tus clientes</p>
        </div>
      </div>

      <ModalComponent
        isOpen={isOpen}
        onOpenChange={() => {
          setEdit(null);
          setNewClient({});
          onOpenChange();
        }}
        title={edit ? "Editar cliente" : "Añadir un cliente"}
        buttonTitle={edit ? "Guardar Cambios" : "Añadir Cliente"}
        inputs={[
          { type: "text", placeholder: "Ej. Juan Pérez", name: "nombre", label: "Nombre Completo" },
          { type: "text", placeholder: "+54 9 11 1234 5678", name: "telefono", label: "Teléfono" },
          { type: "text", placeholder: "juan@ejemplo.com", name: "mail", label: "Correo Electrónico" },
          { type: "number", placeholder: "Ej. 5000", name: "deuda", label: "Deuda / Fiado ($)" },
          Number(newClient.deuda) > 0 ? { type: "date", name: "fecha_inicio_deuda", label: "Fecha de Inicio de Deuda", isRequired: true } : null
        ].filter(Boolean)}
        newProduct={newClient}
        setNewProduct={setNewClient}
        onPress={onSave}
      />
      
      {/* Filtros */}
      <div className='flex justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
        <div className="w-1/3 min-w-[300px]">
          <Input
            isClearable
            placeholder='Buscar por nombre, mail o teléfono...'
            variant="faded"
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{ inputWrapper: 'bg-gray-50' }}
          />
        </div>
        <Button
          startContent={<BsPersonBoundingBox size={20} />}
          variant='shadow'
          color='primary'
          className="font-medium px-6"
          onPress={onOpen}
        >
          Nuevo Cliente
        </Button>
      </div>

      {/* Ver los clientes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <Table 
          aria-label="Clients Table" 
          removeWrapper
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">NOMBRE</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">TELÉFONO</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">CORREO ELECTRÓNICO</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">DEUDA ($)</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider text-right">ACCIONES</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No se encontraron clientes."} items={items}>
            {(c) => (
              <TableRow key={c.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                <TableCell className="font-medium text-gray-900">{c.nombre}</TableCell>
                <TableCell className="text-gray-500">{c.telefono || <span className="text-gray-400 italic">No especificado</span>}</TableCell>
                <TableCell className="text-gray-500">{c.mail || <span className="text-gray-400 italic">No especificado</span>}</TableCell>
                <TableCell>
                  <div className={`font-semibold ${Number(c.deuda) > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    ${Number(c.deuda || 0).toFixed(2)}
                  </div>
                  {Number(c.deuda) > 0 && c.fecha_ultimo_movimiento && (
                    <div className="text-xs text-gray-400 mt-1">
                      Últ. mov: {new Date(c.fecha_ultimo_movimiento).toLocaleDateString()}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color='primary'
                    onPress={() => {
                      setEdit(c);
                      setNewClient(c);
                      onOpen();
                    }}
                  >
                    <CiEdit size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Clients
