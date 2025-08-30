import { Button, Card, CardBody, CardHeader } from "@heroui/react";

export function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl text-gray-900">
            Precios <span className="text-[#8906e6]">simples y transparentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un solo pago, acceso de por vida. Sin mensualidades ni sorpresas.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="border-2 border-[#8906e6] shadow-2xl relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-0 right-0 bg-[#8906e6] text-white px-6 py-2 rounded-bl-2xl">
              <span className="text-sm">Más Popular</span>
            </div>

            <CardHeader className="text-center space-y-4 pb-8 pt-12">
              <h3 className="text-2xl text-gray-900">DevStock Pro</h3>
              <div className="space-y-2">
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl text-[#8906e6]">$299</span>
                  <span className="text-gray-600">USD</span>
                </div>
                <p className="text-gray-600">Pago único • Sin mensualidades</p>
              </div>
            </CardHeader>

            <CardBody className="space-y-8 pb-12">
              <div className="space-y-4">
                <h4 className="text-lg text-gray-900 text-center">Todo incluido:</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-[#8906e6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Gestión ilimitada de productos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-[#8906e6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Reportes automáticos completos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-[#8906e6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Notificaciones inteligentes</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-[#8906e6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Soporte técnico 24/7</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-[#8906e6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Actualizaciones gratuitas de por vida</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-[#8906e6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Acceso desde cualquier dispositivo</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-[#8906e6] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Importación de datos existentes</span>
                  </li>
                </ul>
              </div>

              <Button
                size="lg"
                className="w-full bg-[#8906e6] hover:bg-[#6b05b0] text-white py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Comprar DevStock Pro
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Garantía de devolución de 30 días
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1L7.5 4L11 4.5L8.5 7L9 11L6 9.5L3 11L3.5 7L1 4.5L4.5 4L6 1Z" fill="currentColor" />
                    </svg>
                    <span>Pago seguro</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1C8.5 1 11 3.5 11 6C11 8.5 8.5 11 6 11C3.5 11 1 8.5 1 6C1 3.5 3.5 1 6 1Z" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M4 6L5.5 7.5L8 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>SSL Protegido</span>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Value proposition */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="text-2xl text-gray-900">
            ¿Por qué un <span className="text-[#8906e6]">pago único</span>?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-[#8906e6] rounded-xl flex items-center justify-center text-white mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-lg text-gray-900">Sin costos ocultos</h4>
              <p className="text-gray-600">Lo que pagas es lo que obtienes. Sin sorpresas ni cargos adicionales.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-[#8906e6] rounded-xl flex items-center justify-center text-white mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-lg text-gray-900">Acceso de por vida</h4>
              <p className="text-gray-600">Una vez que compras, el sistema es tuyo para siempre.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-[#8906e6] rounded-xl flex items-center justify-center text-white mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10M5 10H19C20.1046 10 21 10.8954 21 12V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V12C3 10.8954 3.89543 10 5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-lg text-gray-900">Máxima seguridad</h4>
              <p className="text-gray-600">Tus datos están seguros con encriptación de nivel empresarial.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}