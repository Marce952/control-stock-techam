# Guía de Diseño: Sistema Kiosco Pro

## 1. Identidad Visual
- **Paleta de Colores:** - Primario: Morado (#8906e6) para seriedad.
  - Acento: Verde Esmeralda (#10B981) para botones de venta y éxito.
  - Alerta: Rojo Coral (#F87171) para stock bajo y pérdidas.
- **Tipografía:** Sans-serif limpia (Inter o Roboto) para máxima legibilidad en pantallas pequeñas.

## 2. Componentes y UX
- **Dashboard:**
  - Cards superiores con KPIs rápidos (Ventas hoy, Ganancia neta hoy, Productos bajo stock).
  - Gráfico de barras simple para comparar ventas de la semana.
- **Tablas:**
  - Diseño "Zebra" (filas alternas) para no perder la vista.
  - Badge de color para el stock: Verde (OK), Amarillo (Bajo), Rojo (Crítico).
- **Modales:**
  - Estilo minimalista con "Glassmorphism" suave.
  - **Comportamiento:** El botón principal de acción debe activarse con la tecla `ENTER`. El foco inicial debe estar siempre en el primer campo de entrada de datos.
- **Punto de Venta (POS):**
  - Lista de productos en preventa con fuentes grandes.
  - El campo de escaneo de código de barras debe estar siempre activo o ser accesible con un atajo.

## 3. Comportamiento Responsive
- El sistema debe ser utilizable en tablets y laptops de 13 pulgadas.
- En móviles, las tablas deben convertirse en "Cards" apilables para facilitar la lectura de stock.