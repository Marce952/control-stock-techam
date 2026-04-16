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
      const response = await axios.get('/api/suppliers');
      if (!response.data) return;
      setSuppliers(response.data);
    } catch (error) {
      console.log("🚀 ~ getsuppliers ~ error:", error);
    }
  };

  const onSave = async () => {
    try {
      if (edit) {
        await axios.put(`/api/suppliers/${edit.id}`, newSupplier);
      } else {
        await axios.post('/api/suppliers', newSupplier);
      }
      setNewSupplier({});
      setEdit(null);
      get();
      onOpenChange();
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    }
  }

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
    let filteredSuppliers = [...suppliers];

    if (filterValue) {
      filteredSuppliers = filteredSuppliers.filter((supplier) =>
        supplier.nombre?.toLowerCase().includes(filterValue.toLowerCase()) || 
        supplier.mail?.toLowerCase().includes(filterValue.toLowerCase()) ||
        supplier.sitio?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredSuppliers;
  }, [suppliers, filterValue]);

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
          Total: {suppliers.length} proveedores
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
  }, [suppliers.length, page, pages]);

  return (
    <div className='flex flex-col gap-4 p-4 max-w-7xl mx-auto'>
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Proveedores</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona los distribuidores de tu catálogo</p>
        </div>
      </div>

      <ModalComponent
        isOpen={isOpen}
        onOpenChange={() => {
          setEdit(null);
          setNewSupplier({})
          onOpenChange()
        }}
        title={edit ? "Editar proveedor" : "Añadir un proveedor"}
        buttonTitle={edit ? "Guardar Cambios" : "Añadir Proveedor"}
        inputs={[
          { type: "text", placeholder: "Nombre del proveedor", name: "nombre", label: "Nombre" },
          { type: "text", placeholder: "Ej. Av. Siempre Viva 123", name: "direccion", label: "Dirección" },
          { type: "text", placeholder: "+54 9 11 1234 5678", name: "telefono", label: "Teléfono" },
          { type: "text", placeholder: "contacto@proveedor.com", name: "mail", label: "Correo Electrónico" },
          { type: "text", placeholder: "https://www.ejemplo.com", name: "sitio", label: "Sitio web" },
        ]}
        newProduct={newSupplier}
        setNewProduct={setNewSupplier}
        onPress={onSave}
      />
      
      {/* Filtros */}
      <div className='flex justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
        <div className="w-1/3 min-w-[300px]">
          <Input
            isClearable
            placeholder='Buscar por nombre, correo o sitio...'
            variant="faded"
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{ inputWrapper: 'bg-gray-50' }}
          />
        </div>
        <Button
          startContent={<MdProductionQuantityLimits size={20} />}
          variant='shadow'
          color='primary'
          className="font-medium px-6"
          onPress={onOpen}
        >
          Nuevo Proveedor
        </Button>
      </div>

      {/* Ver los productos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <Table 
          aria-label="Suppliers Table" 
          removeWrapper
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">NOMBRE</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">DIRECCIÓN</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">TELÉFONO</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">CORREO</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">SITIO WEB</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider text-right">ACCIONES</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No se encontraron proveedores."} items={items}>
            {(p) => (
              <TableRow key={p.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                <TableCell className="font-medium text-gray-900">{p.nombre}</TableCell>
                <TableCell className="text-gray-500 line-clamp-1 max-w-[200px]" title={p.direccion}>{p.direccion || <span className="text-gray-400 italic">No especificado</span>}</TableCell>
                <TableCell className="text-gray-500">{p.telefono || <span className="text-gray-400 italic">No especificado</span>}</TableCell>
                <TableCell className="text-gray-500">{p.mail || <span className="text-gray-400 italic">No especificado</span>}</TableCell>
                <TableCell>
                  {p.sitio ? (
                    <a href={p.sitio.startsWith('http') ? p.sitio : `https://${p.sitio}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline max-w-[150px] truncate block" title={p.sitio}>
                      {p.sitio.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <span className="text-gray-400 italic text-sm">No especificado</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color='primary'
                    onPress={() => {
                      setEdit(p)
                      setNewSupplier(p)
                      onOpen()
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

export default Supplier
