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
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({});
  const [edit, setEdit] = useState(null);

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
      }
      setNewSale({});
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
          setNewSale({});
          onOpenChange();
        }}
        title={edit ? "Editar una venta" : "Añadir una venta"}
        buttonTitle={edit ? "Editar" : "Añadir"}
        inputs={[
          { type: "number", placeholder: "Cantidad", name: "total_stock" },
          { type: "number", placeholder: "Precio", name: "precio_total" },
          { type: "text", placeholder: "Detalle", name: "observacion" },
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
            getValue: (p) => p.id
          }
        ]}
      />
      {/* Filtros */}
      <div className='flex justify-around items-center gap-2'>
        <Input
          placeholder='Buscar venta'
        />
        <Button
          startContent={<FaMoneyBillTransfer fontSize={'200px'} />}
          variant='solid'
          color='primary'
          onPress={onOpen}
        >
          Añadir venta
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
                    className='text-xl'
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