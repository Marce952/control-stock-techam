'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from '@heroui/react'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import ModalComponent from './ModalComponentAdd';
import { CiEdit } from 'react-icons/ci';
const Sale = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({});

  useEffect(() => {
    get();
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

  const post = async () => {
    try {
      const response = await axios.post('/pages/api/sale', newSale);
      if (!response.data) return;
      setNewSale({});
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
        title="Añadir una venta"
        inputs={[
          { type: "number", placeholder: "Cantidad", name: "total_stock" },
          { type: "number", placeholder: "Precio", name: "precio_total" },
          { type: "text", placeholder: "Detalle", name: "observacion" },
        ]}
        newProduct={newSale}
        setNewProduct={setNewSale}
        onPress={post}
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
          </TableHeader>
          <TableBody>
            {Array.isArray(sales) && sales.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.total_stock}</TableCell>
                <TableCell>{p.precio_total}</TableCell>
                <TableCell>{p.observacion}</TableCell>
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

export default Sale