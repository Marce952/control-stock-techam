'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react'
import { TbDeviceAirpods } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import React, { useEffect, useState } from 'react'
import ModalComponentAdd from './ModalComponentAdd';
import axios from 'axios';
import { bulkUpdatePrices } from '@/actions/bulkUpdatePrices';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const { isOpen: isProductOpen, onOpen: onProductOpen, onOpenChange: onProductOpenChange } = useDisclosure();
  const { isOpen: isCategoryOpen, onOpen: onCategoryOpen, onOpenChange: onCategoryOpenChange } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});
  const [newProduct, setNewProduct] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Bulk update states
  const { isOpen: isBulkOpen, onOpen: onBulkOpen, onOpenChange: onBulkOpenChange } = useDisclosure();
  const [bulkType, setBulkType] = useState('%');
  const [bulkOperation, setBulkOperation] = useState('increase');
  const [bulkValue, setBulkValue] = useState('');
  const [bulkMessage, setBulkMessage] = useState({ type: '', text: '' });

  // Critical stock filter
  const [showCriticalStock, setShowCriticalStock] = useState(false);
  useEffect(() => {
    get();
    getCategories();
  }, []);

  useEffect(() => {
    getSuppliers();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get('/api/products');
      if (!response.data) return;
      setProducts(response.data);
    } catch (error) {
      console.log("🚀 ~ getProducts ~ error:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      if (!response.data) return;

      localStorage.setItem('category', JSON.stringify(response.data));
      setCategories(response.data);
    } catch (error) {

    }
  }

  const onSave = async () => {
    try {
      setLoading(true)
      if (editProduct) {
        await axios.put(`/api/products/${editProduct.id}`, newProduct)
      } else {
        await axios.post('/api/products', newProduct)
      }
      setNewProduct({});
      setEditProduct(null);
      get();
      onProductOpenChange();
    } catch (error) {
      console.log("🚀 ~ post ~ error:", error);
    } finally {
      setLoading(false)
    }
  };

  const getSuppliers = async () => {
    try {
      const response = await axios.get('/api/suppliers');
      if (!response.data) return;
      setSuppliers(response.data)
    } catch (error) {
      console.log("🚀 ~ getSuppliers ~ error:", error)
    }
  }

  const setCategory = async () => {
    try {
      await axios.post('/api/categories', newCategory);
      setNewCategory({});
      getCategories();
      onCategoryOpenChange();
    } catch (error) {
      console.log("🚀 ~ setCategory ~ error:", error)
    }
  }

  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 10;

  const [isLossOpen, setIsLossOpen] = useState(false);
  const [lossProduct, setLossProduct] = useState(null);
  const [lossAmount, setLossAmount] = useState("");

  const handleLoss = async () => {
    if (!lossProduct || !lossAmount || Number(lossAmount) <= 0) return;
    try {
      setLoading(true);
      await axios.post('/api/sale', {
        total_stock: Number(lossAmount),
        precio_total: 0,
        precio_costo_total: Number(lossProduct.precio_costo || 0) * Number(lossAmount),
        tipo_operacion: 'perdida',
        observacion: 'Baja de stock por pérdida/merma',
        idproducto: lossProduct.id
      });
      await axios.put(`/api/products/${lossProduct.id}`, {
        stock: Number(lossProduct.stock) - Number(lossAmount)
      });
      setIsLossOpen(false);
      setLossProduct(null);
      setLossAmount("");
      get();
    } catch (error) {
      console.log("Error registering loss:", error);
    } finally {
      setLoading(false);
    }
  };

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
    let filteredProducts = [...products];

    if (filterValue) {
      filteredProducts = filteredProducts.filter((product) =>
        product.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.codigo_barras?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    
    if (showCriticalStock) {
      filteredProducts = filteredProducts.filter((product) => product.stock <= 10);
    }
    
    return filteredProducts;
  }, [products, filterValue, showCriticalStock]);

  const handleBulkUpdate = async () => {
    const val = Number(bulkValue);
    if (!val || val <= 0) {
      setBulkMessage({ type: 'error', text: 'Ingresa un valor mayor a 0.' });
      return;
    }
    setLoading(true);
    setBulkMessage({ type: '', text: '' });
    
    const result = await bulkUpdatePrices(bulkType, bulkOperation, val);
    
    if (result.success) {
      setBulkMessage({ type: 'success', text: result.message });
      await get(); // Refrescar stock
      setTimeout(() => {
        onBulkOpenChange();
        setBulkMessage({ type: '', text: '' });
        setBulkValue('');
      }, 2000);
    } else {
      setBulkMessage({ type: 'error', text: result.message });
    }
    setLoading(false);
  };

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
          Total: {products.length} productos
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
  }, [products.length, page, pages]);

  return (
    <div className='flex flex-col gap-4 p-4 max-w-7xl mx-auto'>
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Inventario de Productos</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona tu catálogo, stock y categorías</p>
        </div>
      </div>

      <ModalComponentAdd
        isOpen={isProductOpen}
        onOpenChange={() => {
          setEditProduct(null);
          setNewProduct({});
          onProductOpenChange();
        }}
        title={editProduct ? "Editar producto" : "Añadir un producto"}
        buttonTitle={editProduct ? "Guardar Cambios" : "Añadir Producto"}
        inputs={[
          { type: "text", placeholder: "Ej. 7791234567890", name: "codigo_barras", label: "Código de Barras" },
          { type: "text", placeholder: "Ej. Alfajor Jorgito...", name: "nombre", label: "Nombre del Producto" },
          { type: "text", placeholder: "Breve descripción", name: "descripcion", label: "Descripción" },
          { type: "number", placeholder: "0.00", name: "precio_costo", label: "Precio de Costo" },
          { type: "number", placeholder: "0.00", name: "precio", label: "Precio de Venta" },
          { type: "number", placeholder: "0", name: "stock", label: "Stock Inicial/Actual" },
          { type: "number", placeholder: "5", name: "stock_minimo", label: "Stock Mínimo (Alerta)" },
        ]}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onPress={onSave}
        selects={[
          {
            label: "Proveedores",
            name: "idproveedor",
            value: editProduct ? editProduct.idproveedor : "",
            options: suppliers,
            getLabel: (s) => s.nombre,
            getValue: (s) => s.id,
          },
          {
            label: "Categoria",
            name: "idcategoria",
            options: localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : categories,
            getLabel: (c) => c.tipo,
            getValue: (c) => c.id,
          }
        ]}
        addCategories={
          <Button onPress={onCategoryOpen} size="sm" variant="flat" color="secondary" className="font-medium">
            + Añadir Categoría
          </Button>
        }
        loading={loading}
      />

      <Modal isOpen={isCategoryOpen} onOpenChange={onCategoryOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold text-gray-800 border-b border-gray-100">Añadir una categoría</ModalHeader>
              <ModalBody className="py-6">
                <Input
                  label="Nombre de la categoría"
                  labelPlacement="outside"
                  placeholder='Ej. Electrónica, Calzado...'
                  variant="faded"
                  value={newCategory.tipo || ""}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, tipo: e.target.value }))}
                />
              </ModalBody>
              <ModalFooter className="border-t border-gray-100">
                <Button variant="flat" color="danger" onPress={onClose}>Cancelar</Button>
                <Button onPress={setCategory} color='primary'>Añadir Categoria</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isLossOpen} onOpenChange={setIsLossOpen} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold text-gray-800 border-b border-gray-100">Registrar Pérdida o Merma</ModalHeader>
              <ModalBody className="py-6">
                <p className="text-sm text-gray-500 mb-2">
                  Producto: <span className="font-semibold text-gray-800">{lossProduct?.nombre}</span>
                  <br />Stock Actual: <span className="font-semibold text-gray-800">{lossProduct?.stock}</span>
                </p>
                <Input
                  autoFocus
                  label="Cantidad a dar de baja"
                  labelPlacement="outside"
                  type="number"
                  placeholder='Ej. 2'
                  variant="faded"
                  value={lossAmount}
                  max={lossProduct?.stock}
                  onChange={(e) => setLossAmount(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoss()}
                />
              </ModalBody>
              <ModalFooter className="border-t border-gray-100">
                <Button variant="flat" onPress={onClose}>Cancelar</Button>
                <Button onPress={handleLoss} color='danger' isLoading={loading}>Registrar Pérdida</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isBulkOpen} onOpenChange={onBulkOpenChange} backdrop="blur">
        <ModalContent className="bg-white/90 backdrop-blur-xl border border-white/20">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold text-gray-800 border-b border-gray-100">
                Actualización Masiva de Precios
              </ModalHeader>
              <ModalBody className="py-6 flex flex-col gap-4">
                <p className="text-sm text-gray-500 bg-purple-50 p-3 rounded-lg border border-purple-100">
                  Esta acción modificará el precio de <strong>TODOS</strong> los productos del catálogo. Selecciona la operación que deseas realizar.
                </p>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <label className="text-sm font-medium text-gray-700">Operación</label>
                    <select 
                      className="border-gray-200 bg-gray-50 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      value={bulkOperation} 
                      onChange={(e) => setBulkOperation(e.target.value)}
                    >
                      <option value="increase">Aumentar (+)</option>
                      <option value="decrease">Disminuir (-)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <label className="text-sm font-medium text-gray-700">Tipo de ajuste</label>
                    <select 
                      className="border-gray-200 bg-gray-50 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      value={bulkType} 
                      onChange={(e) => setBulkType(e.target.value)}
                    >
                      <option value="%">Porcentaje (%)</option>
                      <option value="$">Monto Fijo ($)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Input
                    label="Valor a aplicar"
                    labelPlacement="outside"
                    type="number"
                    placeholder="Ej. 15"
                    variant="faded"
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                  />
                </div>
                
                <AnimatePresence>
                  {bulkMessage.text && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-lg text-sm font-medium ${bulkMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {bulkMessage.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-xs text-red-500 italic mt-2 font-medium">
                  ⚠️ Advertencia: ¿Estás seguro que deseas continuar?
                </p>
              </ModalBody>
              <ModalFooter className="border-t border-gray-100">
                <Button variant="flat" onPress={onClose} isDisabled={loading}>Cancelar</Button>
                <Button 
                   onPress={handleBulkUpdate} 
                   className="bg-[#7C3AED] text-white" 
                   isLoading={loading}
                >
                  Confirmar Actualización
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Filtros */}
      <div className='flex justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
        <div className="w-1/3 min-w-[300px]">
          <Input 
            isClearable
            placeholder='Buscar por nombre de producto...' 
            variant="faded" 
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            classNames={{ inputWrapper: 'bg-gray-50' }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant={showCriticalStock ? 'solid' : 'bordered'}
            color={showCriticalStock ? 'danger' : 'default'}
            onPress={() => setShowCriticalStock(!showCriticalStock)}
            className="font-medium"
          >
            {showCriticalStock ? 'Viendo Stock Crítico' : 'Filtrar Stock Crítico'}
          </Button>
          
          <Button
            variant="flat"
            className="font-medium px-4 text-[#7C3AED] bg-purple-50"
            onPress={onBulkOpen}
          >
            Actualizar Precios
          </Button>

          <Button
            startContent={<TbDeviceAirpods size={20} />}
            variant='shadow'
            className="font-medium px-6 bg-[#7C3AED] text-white"
            onPress={() => {
              setEditProduct(null);
              setNewProduct({});
              onProductOpen();
            }}
          >
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Ver los productos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <Table 
          aria-label="Products Table" 
          removeWrapper 
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">CÓDIGO DE BARRAS</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">NOMBRE</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">DESCRIPCIÓN</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">STOCK</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">PRECIO</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">PROVEEDOR</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider">CATEGORÍA</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider text-right">ACCIONES</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No se encontraron productos."} items={items}>
            {(product) => (
              <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-none">
                <TableCell className="text-gray-500 font-mono text-xs">{product.codigo_barras || "-"}</TableCell>
                <TableCell className="font-medium text-gray-900">{product.nombre}</TableCell>
                <TableCell className="text-gray-500 max-w-[200px] truncate">{product.descripcion}</TableCell>
                <TableCell>
                   <span className={`px-2 py-1 rounded-md text-xs font-medium ${(product.stock_minimo && product.stock <= product.stock_minimo) ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                     {product.stock} {(product.stock_minimo && product.stock <= product.stock_minimo) && '⚠️'}
                   </span>
                </TableCell>
                <TableCell className="font-medium text-gray-700">${product.precio}</TableCell>
                <TableCell>
                   <span className={`text-sm ${product.proveedor === null ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                     {product?.proveedores?.nombre || "Sin Asignar"}
                   </span>
                </TableCell>
                <TableCell>
                   <span className={`text-sm ${product.categoria === null ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                     {product?.categoria?.tipo || "Sin Asignar"}
                   </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color='primary'
                    onPress={() => {
                      setEditProduct(product);
                      setNewProduct({
                        ...product,
                        idproveedor: product.idproveedor ?? product.proveedor?.id ?? product.proveedores?.id ?? "",
                        idcategoria: product.idcategoria ?? product.categoria?.id ?? "",
                      });
                      onProductOpen();
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
    </div >
  );
};

export default Products;
