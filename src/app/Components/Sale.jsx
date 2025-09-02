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
  const [uniqueProduct, setUniqueProducts] = useState([]);
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
      const response = await axios.get('/pages/api/sale');
      if (!response.data) return;
      setSales(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error);
    }
  }

  const getClients = async () => {
    try {
      const response = await axios.get('/pages/api/clients');
      if (!response.data) return;

      setClients(response.data);
    } catch (error) {
      console.log("🚀 ~ getClients ~ error:", error)
    }
  }

  const getProducts = async () => {
    try {
      const response = await axios.get('/pages/api/products');
      if (!response.data) return;

      setProducts(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error)
    }
  }

  const onSave = async () => {
    try {
      if (edit) {
        await axios.put(`/pages/api/sale/${edit.id}`, newSale);
      } else {
        await axios.post('/pages/api/sale', newSale);
        await axios.put(`/pages/api/products/${uniqueProduct[0].id}`, { ...uniqueProduct[0], stock: uniqueProduct[0].stock - newSale.total_stock });
      }
      setNewSale({});
      setEdit(null);
      get();
      onOpenChange();
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    }
  };

  const handleProductChange = async (value) => {
    setProductSearch(value)
    console.log("🚀 ~ handleProductChange ~ value:", value)

    try {
      const response = await axios.get(`/pages/api/products/${value}`);
      if (!response.data) return;
      setUniqueProducts(response.data);
      console.log(response.data[0]);
    } catch (error) {
      console.log("🚀 ~ handleProductChange ~ error:", error)
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
          setNewSale({});
          onOpenChange();
          setProductSearch(null);
        }}
        title={edit ? "Editar una venta" : "Añadir una venta"}
        buttonTitle={edit ? "Editar" : "Añadir"}
        inputs={[
          { type: "number", placeholder: "Cantidad", name: "total_stock", isDisabled: !productSearch, max: uniqueProduct[0]?.stock || "", label: "Cantidad" },
          { type: "number", placeholder: "Stock", value: uniqueProduct[0]?.stock || "", isDisabled: true, label: "Stock" },
          { type: "number", placeholder: "Precio", name: "precio_total", isDisabled: !productSearch, label: "Precio" },
          { type: "text", placeholder: "Detalle", name: "observacion", isDisabled: !productSearch, label: "Detalle" },
        ]}
        newProduct={newSale}
        setNewProduct={setNewSale}
        onPress={onSave}
        selects={[
          {
            label: "Clientes",
            name: "idCliente",
            options: clients,
            getLabel: (c) => c.nombre,
            getValue: (c) => c.id
          },
          {
            label: "Productos",
            name: "idProducto",
            options: products,
            getLabel: (p) => p.nombre,
            getValue: (p) => p.id,
            onChange: handleProductChange
          }
        ]}
        uniqueProduct={uniqueProduct}
      />
      {/* Filtros */}
      <div className='flex justify-around items-center gap-2'>
        <Input
          placeholder='Buscar venta'
        />
        <Button
          startContent={<FaMoneyBillTransfer />}
          variant='solid'
          className='text-white text-xl'
          color='primary'
          onPress={onOpen}
        >
        </Button>
      </div>

      {/* Ver los productos */}
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Precio Total</TableColumn>
            <TableColumn>Detalle</TableColumn>
            <TableColumn>Editar</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.isArray(sales) && sales.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.total_stock}</TableCell>
                <TableCell>{p.precio_total}</TableCell>
                <TableCell>{p.observacion}</TableCell>
                <TableCell>
                  <Button
                    color='primary'
                    className='text-2xl text-white'
                    onPress={() => {
                      setEdit(p);
                      setNewSale(p);
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

export default Sale