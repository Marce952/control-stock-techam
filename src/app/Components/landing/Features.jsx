import { Card, CardBody, Image } from "@heroui/react";

export function Features() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Manejo fácil de productos",
      description: "Interfaz intuitiva para agregar, editar y organizar todos tus productos de manera rápida y sencilla."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17H7C4.79086 17 3 15.2091 3 13V11C3 8.79086 4.79086 7 7 7H17C19.2091 7 21 8.79086 21 11V13C21 15.2091 19.2091 17 17 17H15M9 17V21M9 17H15M15 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Reportes automáticos",
      description: "Genera reportes detallados automáticamente con métricas clave para tomar decisiones informadas."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3V21H21M7 14L12 9L16 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Historial de ventas",
      description: "Accede al historial completo de ventas con filtros avanzados y análisis de tendencias."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.29 3.86L1.82 18A2 2 0 003.34 21H20.66A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 9V13M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Notificaciones de stock bajo",
      description: "Recibe alertas automáticas cuando tus productos estén por agotarse y evita quedarte sin stock."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl text-gray-900">
            Características que <span className="text-[#8906e6]">marcan la diferencia</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DevStock incluye todas las herramientas que necesitas para gestionar tu inventario de forma profesional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardBody className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8906e6] to-[#6b05b0] rounded-2xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Additional feature showcase */}
        <div className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl text-gray-900">
                Dashboard intuitivo y <span className="text-[#8906e6]">fácil de usar</span>
              </h3>
              <p className="text-lg text-gray-600">
                Diseñado para que cualquier persona pueda utilizarlo sin curva de aprendizaje. 
                Visualiza toda la información importante de un vistazo.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#8906e6] rounded-full"></div>
                  <span>Vista general del inventario en tiempo real</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#8906e6] rounded-full"></div>
                  <span>Gráficos y estadísticas claras</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#8906e6] rounded-full"></div>
                  <span>Acceso desde cualquier dispositivo</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGNoYXJ0cyUyMGdyYXBoc3xlbnwxfHx8fDE3NTY0NDkwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Analytics Dashboard"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}