'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from '@heroui/react'
import { TbDeviceAirpods } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import React, { useEffect, useState } from 'react'
import ModalComponentAdd from './ModalComponentAdd';
import axios from 'axios';

const Products = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    get();
    getCategories();
  }, []);

  useEffect(() => {
    getSuppliers();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get('/pages/api/products');
      if (!response.data) return;
      setProducts(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('/pages/api/categories');
      if (!response.data) return;

      setCategories(response.data);
    } catch (error) {

    }
  }

  const onSave = async () => {
    try {
      if (editProduct) {
        await axios.put(`/pages/api/products/${editProduct.id}`, newProduct);
      } else {
        await axios.post('/pages/api/products', newProduct);
      }
      setNewProduct({});
      setEditProduct(null);
      get();
      onOpenChange();
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    }
  };

  const getSuppliers = async () => {
    try {
      const response = await axios.get('/pages/api/suppliers');
      if (!response.data) return;
      setSuppliers(response.data)
    } catch (error) {
      console.log("🚀 ~ getSuppliers ~ error:", error)
    }
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      <ModalComponentAdd
        isOpen={isOpen}
        onOpenChange={() => {
          setEditProduct(null);
          setNewProduct({});
          onOpenChange();
        }}
        title={editProduct ? "Editar producto" : "Añadir un producto"}
        buttonTitle={editProduct ? "Editar" : "Añadir"}
        inputs={[
          { type: "text", placeholder: "Nombre del producto", name: "nombre", label: "Nombre" },
          { type: "text", placeholder: "Descripcion producto", name: "descripcion", label: "Descripcion" },
          { type: "number", placeholder: "Precio del producto", name: "precio", label: "Precio" },
          { type: "number", placeholder: "Cantidad del producto", name: "stock", label: "Stock" },
        ]}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onPress={onSave}
        selects={[
          {
            label: "Proveedores",
            name: "idproveedor",
            options: suppliers,
            getLabel: (s) => s.nombre,
            getValue: (s) => s.id,
          },
          {
            label: "Categoria",
            name: "idcategoria",
            options: categories,
            getLabel: (c) => c.tipo,
            getValue: (c) => c.id,
          }
        ]}
      />
      {/* Filtros */}
      <div className='flex justify-around items-center gap-2'>
        <Input placeholder='Buscar producto' />
        <Button
          startContent={<TbDeviceAirpods />}
          variant='solid'
          className='text-white text-xl'
          color='primary'
          onPress={() => {
            setEditProduct(null);
            setNewProduct({});
            onOpen();
          }}
        >
        </Button>
      </div>
      {/* Ver los productos */}
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Descripcion</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Precio</TableColumn>
            <TableColumn>Proveedor</TableColumn>
            <TableColumn>Categoria</TableColumn>
            <TableColumn>Editar</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.isArray(products) && products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.descripcion}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.precio}</TableCell>
                <TableCell className={product.proveedor === null && 'text-red-500'}>{product?.proveedor?.nombre || "No hay proveedor asignado"}</TableCell>
                <TableCell className={product.categoria === null && 'text-red-500'}>{product?.categoria?.tipo || "No hay categoria asignada"}</TableCell>
                <TableCell>
                  <Button
                    color='primary'
                    className='text-2xl text-white'
                    onPress={() => {
                      setEditProduct(product);
                      setNewProduct({
                        ...product,
                        idproveedor: product.idProveedor ?? product.proveedor?.id ?? "",
                        idcategoria: product.idCategoria ?? product.categoria?.id ?? "",
                      });
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
    </div >
  );
};

export default Products;