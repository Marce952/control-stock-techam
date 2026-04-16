'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from '@heroui/react'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import ModalComponent from './ModalComponentAdd';
import { CiEdit } from 'react-icons/ci';
import axios from 'axios';
const Sale = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [uniqueProduct, setUniqueProducts] = useState(null);
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({});
  const [edit, setEdit] = useState(null);
  const [productSearch, setProductSearch] = useState(null);

  useEffect(() => {
    get();
    getProducts();
    getClients();
  }, [])

  const get = async () => {
    try {
      const response = await axios.get('/api/sale');
      if (!response.data) return;
      setSales(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error);
    }
  }

  const getClients = async () => {
    try {
      const response = await axios.get('/api/clients');
      if (!response.data) return;

      setClients(response.data);
    } catch (error) {
      console.log("🚀 ~ getClients ~ error:", error)
    }
  }

  const getProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      if (!response.data) return;

      setProducts(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error)
    }
  }

  const onSave = async () => {
    try {
      if (edit) {
        await axios.put(`/api/sale/${edit.id}`, newSale);
      } else {
        if (!uniqueProduct?.id) return;
        await axios.post('/api/sale', newSale);
        await axios.put(`/api/products/${uniqueProduct.id}`, {
          ...uniqueProduct,
          stock: Number(uniqueProduct.stock || 0) - Number(newSale.total_stock || 0)
        });
      }
      setNewSale({});
      setEdit(null);
      setUniqueProducts(null);
      setProductSearch(null);
      get();
      onOpenChange();
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    }
  };

  const handleProductChange = async (value) => {
    setProductSearch(value)

    try {
      const response = await axios.get(`/api/products/${value}`);
      if (!response.data) return;
      setUniqueProducts(response.data);
      setNewSale((prev) => ({
        ...prev,
        idproducto: Number(value),
      }));
    } catch (error) {
      console.log("🚀 ~ handleProductChange ~ error:", error)
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
    let filteredSales = [...sales];

    if (filterValue) {
      filteredSales = filteredSales.filter((sale) =>
        sale.observacion?.toLowerCase().includes(filterValue.toLowerCase()) || 
        String(sale.precio_total).includes(filterValue) ||
        String(sale.total_stock).includes(filterValue)
      );
    }
    return filteredSales;
  }, [sales, filterValue]);

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
          Total: {sales.length} ventas
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
  }, [sales.length, page, pages]);

  return (
    <div className='flex flex-col gap-4 p-4 max-w-7xl mx-auto'>
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Historial de Ventas</h2>
          <p className="text-sm text-gray-500 mt-1">Registra y administra las ventas de tu negocio</p>
        </div>
      </div>

      <ModalComponent
        isOpen={isOpen}
        onOpenChange={() => {
          setEdit(null);
          setNewSale({});
          onOpenChange();
          setProductSearch(null);
          setUniqueProducts(null);
        }}
        title={edit ? "Editar venta" : "Registrar nueva venta"}
        buttonTitle={edit ? "Guardar Cambios" : "Completar Venta"}
        inputs={[
          { type: "number", placeholder: "Ej. 2", name: "total_stock", isDisabled: !productSearch, max: uniqueProduct?.stock || "", label: "Cantidad a Vender" },
          { type: "number", placeholder: "Stock actual", value: uniqueProduct?.stock || "", isDisabled: true, label: "Stock Disponible" },
          { type: "number", placeholder: "0.00", name: "precio_total", isDisabled: !productSearch, label: "Precio Total ($)" },
          { type: "text", placeholder: "Ej. Cliente pagó en efectivo", name: "observacion", isDisabled: !productSearch, label: "Detalles adicionales" },
        ]}
        newProduct={newSale}
        setNewProduct={setNewSale}
        onPress={onSave}
        selects={[
          {
            label: "Cliente",
            name: "idcliente",
            options: clients,
            getLabel: (c) => c.nombre,
            getValue: (c) => c.id
          },
          {
            label: "Producto",
            name: "idproducto",
            options: products,
            getLabel: (p) => p.nombre,
            getValue: (p) => p.id,
            onChange: handleProductChange
          }
        ]}
        uniqueProduct={uniqueProduct}
      />
      
      {/* Filtros */}
      <div className='flex justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
        <div className="w-1/3 min-w-[300px]">
          <Input
            isClearable
            placeholder='Buscar por detalle, precio o cantidad...'
            variant="faded"
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{ inputWrapper: 'bg-gray-50' }}
          />
        </div>
        <Button
          startContent={<FaMoneyBillTransfer size={20} />}
          variant='shadow'
          color='primary'
          className="font-medium px-6"
          onPress={onOpen}
        >
          Nueva Venta
        </Button>
      </div>

      {/* Ver los productos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <Table 
          aria-label="Sales Table" 
          removeWrapper
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">CANTIDAD VENDIDA</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">PRECIO TOTAL</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">DETALLE / OBSERVACIÓN</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider text-right">ACCIONES</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No se encontraron ventas."} items={items}>
            {(p) => (
              <TableRow key={p.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                <TableCell>
                  <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-md text-sm">
                    {p.total_stock} uds.
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-green-700">${p.precio_total}</TableCell>
                <TableCell className="text-gray-500 max-w-[250px] truncate">{p.observacion || <span className="italic text-gray-400">Sin observaciones</span>}</TableCell>
                <TableCell className="text-right">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color='primary'
                    onPress={() => {
                      setEdit(p);
                      setNewSale(p);
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

export default Sale
