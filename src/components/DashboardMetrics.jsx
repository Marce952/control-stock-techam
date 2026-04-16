'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Autocomplete, AutocompleteItem, Button } from '@heroui/react';
import { MdOutlinePointOfSale, MdInventory, MdPeople, MdShoppingCart, MdFileDownload } from 'react-icons/md';
import { FaMoneyBillWave, FaArrowTrendUp } from 'react-icons/fa6';
import { FaHandsHelping } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import axios from 'axios';

const DashboardMetrics = () => {
  const [data, setData] = useState({
    clients: [],
    suppliers: [],
    products: [],
    sales: []
  });
  const [filter, setFilter] = useState('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resClients, resSuppliers, resProducts, resSales] = await Promise.all([
        axios.get('/api/clients'),
        axios.get('/api/suppliers'),
        axios.get('/api/products'),
        axios.get('/api/sale')
      ]);

      setData({
        clients: resClients.data || [],
        suppliers: resSuppliers.data || [],
        products: resProducts.data || [],
        sales: resSales.data || []
      });
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const wsProducts = XLSX.utils.json_to_sheet(data.products.map(p => ({
      ID: p.id,
      'Código Barras': p.codigo_barras || '-',
      Nombre: p.nombre,
      Stock: p.stock,
      'Stock Mínimo': p.stock_minimo,
      'Precio Costo': p.precio_costo,
      'Precio Venta': p.precio
    })));
    XLSX.utils.book_append_sheet(wb, wsProducts, "Productos");

    const wsSales = XLSX.utils.json_to_sheet(data.sales.map(s => ({
      ID: s.id,
      Fecha: new Date(s.created_at).toLocaleString(),
      Cantidad: s.total_stock,
      'Total Venta': parseFloat(s.precio_total),
      'Costo Total': parseFloat(s.precio_costo_total || 0),
      Ganancia: parseFloat(s.precio_total) - parseFloat(s.precio_costo_total || 0),
      Tipo: s.tipo_operacion || 'venta',
      Observacion: s.observacion || ''
    })));
    XLSX.utils.book_append_sheet(wb, wsSales, "Ventas");

    XLSX.writeFile(wb, `Backup_Kiosco_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`);
  };

  // Metrics logic
  const now = new Date();
  const filteredSales = data.sales.filter(sale => {
    if (sale.tipo_operacion && sale.tipo_operacion !== 'venta') return false; // Excluye perdidas de rentabilidad
    
    const d = new Date(sale.created_at);
    if (filter === 'daily') {
      return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    if (filter === 'weekly') {
      const pastWeek = new Date(now);
      pastWeek.setDate(now.getDate() - 7);
      return d >= pastWeek;
    }
    if (filter === 'monthly') {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    if (filter === 'yearly') {
      return d.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const totalVentas = filteredSales.reduce((acc, s) => acc + parseFloat(s.precio_total || 0), 0);
  const costoTotal = filteredSales.reduce((acc, s) => acc + parseFloat(s.precio_costo_total || 0), 0);
  const gananciaNeta = totalVentas - costoTotal;

  const lowStockProducts = data.products.filter(p => p.stock <= (p.stock_minimo || 0)).length;

  if (loading) return <div className="text-gray-500">Cargando métricas...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className='text-3xl font-bold text-[#8906e6] tracking-tight'>Panel de control</h1>
          <p className="text-sm text-gray-500 mt-1">Resumen de la actividad y rentabilidad</p>
        </div>
        <div className="flex items-center gap-3">
          <Autocomplete
            size="sm"
            className="w-48"
            selectedKey={filter}
            defaultSelectedKey="daily"
            onSelectionChange={(key) => {
              if (key) setFilter(String(key));
            }}
            placeholder="Filtrar período..."
            aria-label="Filtrar métricas por período"
          >
            <AutocompleteItem key="daily">Hoy</AutocompleteItem>
            <AutocompleteItem key="weekly">Últimos 7 días</AutocompleteItem>
            <AutocompleteItem key="monthly">Este Mes</AutocompleteItem>
            <AutocompleteItem key="yearly">Este Año</AutocompleteItem>
          </Autocomplete>
          <Button 
            color="success" 
            variant="flat" 
            startContent={<MdFileDownload size={20} />}
            onPress={exportToExcel}
          >
            Exportar Backup
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <Card shadow="sm" className="border-none bg-gradient-to-br from-white to-gray-50 border border-gray-100">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500 font-medium">Ventas ({filter})</p>
              <h2 className="text-3xl font-bold text-gray-800">${totalVentas.toFixed(2)}</h2>
            </div>
            <div className="p-3 bg-blue-100/50 rounded-2xl text-blue-600">
              <MdShoppingCart size={28} />
            </div>
          </CardBody>
        </Card>

        {/* KPI 2 */}
        <Card shadow="sm" className="border-none bg-gradient-to-br from-white to-gray-50 border border-gray-100">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500 font-medium">Ganancia Neta ({filter})</p>
              <h2 className="text-3xl font-bold text-[#10B981]">${gananciaNeta.toFixed(2)}</h2>
            </div>
            <div className="p-3 bg-green-100/50 rounded-2xl text-green-600">
              <FaMoneyBillWave size={28} />
            </div>
          </CardBody>
        </Card>

        {/* KPI 3 */}
        <Card shadow="sm" className="border-none bg-gradient-to-br from-white to-gray-50 border border-red-50">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[#F87171] font-medium">Stock Crítico</p>
              <h2 className="text-3xl font-bold text-red-600">{lowStockProducts}</h2>
              <p className="text-xs text-gray-400">Productos por reponer</p>
            </div>
            <div className="p-3 bg-red-100/50 rounded-2xl text-red-600">
              <MdInventory size={28} />
            </div>
          </CardBody>
        </Card>

        {/* KPI 4 */}
        <Card shadow="sm" className="border-none bg-gradient-to-br from-white to-gray-50 border border-gray-100">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500 font-medium">Clientes Totales</p>
              <h2 className="text-3xl font-bold text-gray-800">{data.clients.length}</h2>
            </div>
            <div className="p-3 bg-purple-100/50 rounded-2xl text-[#8906e6]">
              <MdPeople size={28} />
            </div>
          </CardBody>
        </Card>

      </div>

    </div>
  );
};

export default DashboardMetrics;
