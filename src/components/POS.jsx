'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { MdOutlinePointOfSale, MdShoppingCart, MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    getProducts();
    // Maintain focus on the barcode input
    const focusInterval = setInterval(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
    return () => clearInterval(focusInterval);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'F1') {
        e.preventDefault();
        finalizeSale();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [cart]);

  const getProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      if (response.data) setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handleBarcodeSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!barcode.trim()) return;

      const product = products.find(p => p.codigo_barras === barcode.trim());
      if (product) {
        addToCart(product);
      } else {
        // Fallback: search by name if it's not a barcode
        const productByName = products.find(p => p.nombre.toLowerCase() === barcode.trim().toLowerCase());
        if (productByName) {
          addToCart(productByName);
        } else {
          alert("Producto no encontrado");
        }
      }
      setBarcode('');
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (Number(item.precio) * item.quantity), 0);

  const finalizeSale = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      // Create sales for each item in the cart
      for (const item of cart) {
        const saleData = {
          total_stock: item.quantity,
          precio_total: Number(item.precio) * item.quantity,
          precio_costo_total: Number(item.precio_costo) * item.quantity,
          tipo_operacion: 'venta',
          observacion: 'Venta rápida (POS)',
          idproducto: item.id
        };
        await axios.post('/api/sale', saleData);
        
        // Update product stock
        await axios.put(`/api/products/${item.id}`, {
          stock: item.stock - item.quantity
        });
      }
      setCart([]);
      getProducts(); // refresh stock
      alert("Venta finalizada exitosamente.");
    } catch (error) {
      console.error("Error finalizing sale:", error);
      alert("Hubo un error al finalizar la venta.");
    } finally {
      setLoading(false);
      if(inputRef.current) inputRef.current.focus();
    }
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto h-[calc(100vh-100px)]'>
      
      {/* SECCIÓN IZQUIERDA: Escáner y Lista */}
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#8906e6]">Caja Rápida</h2>
          <p className="text-sm text-gray-500 mt-1">Escanea el código de barras o busca por nombre</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Input
            ref={inputRef}
            size="lg"
            placeholder="Escanear código de barras y presionar ENTER..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={handleBarcodeSubmit}
            startContent={<MdOutlinePointOfSale className="text-gray-400" size={24} />}
            autoFocus
            classNames={{
              input: "text-xl font-mono",
            }}
          />
        </div>

        <div className="flex-1 overflow-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-2">
          <Table aria-label="Cart Table" removeWrapper>
            <TableHeader>
              <TableColumn className="bg-gray-50 uppercase text-xs">CANT</TableColumn>
              <TableColumn className="bg-gray-50 uppercase text-xs">PRODUCTO</TableColumn>
              <TableColumn className="bg-gray-50 uppercase text-xs">PRECIO UNI.</TableColumn>
              <TableColumn className="bg-gray-50 uppercase text-xs">SUBTOTAL</TableColumn>
              <TableColumn className="bg-gray-50 uppercase text-xs">ACCIONES</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Aún no hay productos en la venta actual." items={cart}>
              {(item) => (
                <TableRow key={item.id} className="border-b last:border-b-0">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" isIconOnly variant="flat" onPress={() => updateQuantity(item.id, -1)}>-</Button>
                      <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                      <Button size="sm" isIconOnly variant="flat" onPress={() => updateQuantity(item.id, 1)}>+</Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-lg">{item.nombre}</TableCell>
                  <TableCell className="text-gray-600">${Number(item.precio).toFixed(2)}</TableCell>
                  <TableCell className="font-bold text-gray-900">${(Number(item.precio) * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => removeFromCart(item.id)}
                    >
                      <MdDeleteOutline size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* SECCIÓN DERECHA: Resumen y Cobro */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-[#8906e6] to-[#6b05b0] rounded-xl shadow-lg p-6 text-white flex flex-col justify-between" style={{ minHeight: '300px' }}>
          <div>
            <h3 className="text-xl font-medium opacity-80 uppercase tracking-widest">Total a Cobrar</h3>
            <p className="text-5xl font-bold mt-4">${total.toFixed(2)}</p>
            <p className="opacity-70 mt-2">{cart.length} artículos en total</p>
          </div>
          
          <div className="mt-8 flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full bg-[#10B981] text-white font-bold text-lg shadow-md hover:bg-[#059669]"
              onPress={finalizeSale}
              isLoading={loading}
              isDisabled={cart.length === 0}
            >
              Completar Venta [F1]
            </Button>
            <Button
              size="lg"
              variant="flat"
              className="w-full bg-white/20 text-white font-medium hover:bg-white/30"
              onPress={() => setCart([])}
              isDisabled={cart.length === 0}
            >
              Cancelar / Vaciar [ESC]
            </Button>
          </div>
        </div>

        {/* Hints / Atajos de teclado */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-auto">
          <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase">Atajos Teclado</h4>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
               <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">ENTER</span>
               <span>Añadir Producto</span>
            </div>
            <div className="flex justify-between">
               <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">F1</span>
               <span>Finalizar Venta</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default POS;
