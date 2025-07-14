'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from '@heroui/react'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import React from 'react'
import ModalComponent from './ModalComponentAdd';
const Sale = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      className='flex flex-col gap-4 p-4'
    >
      <ModalComponent
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
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
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Sale