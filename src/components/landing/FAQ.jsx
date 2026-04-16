import { Accordion, AccordionItem } from "@heroui/react";


export function FAQ() {
  const faqs = [
    {
      question: "¿Es un pago único o mensual?",
      answer: "DevStock funciona con un pago único de $299 USD. No hay mensualidades ni costos recurrentes. Una vez que compras, tienes acceso de por vida al sistema y a todas las actualizaciones futuras."
    },
    {
      question: "¿Puedo usarlo desde cualquier dispositivo?",
      answer: "Sí, DevStock es una aplicación web que funciona perfectamente en computadoras, tablets y smartphones. Solo necesitas una conexión a internet y un navegador web moderno. Tus datos se sincronizan automáticamente en todos tus dispositivos."
    },
    {
      question: "¿Tendré soporte si lo necesito?",
      answer: "Absolutamente. Incluimos soporte técnico 24/7 sin costo adicional. Nuestro equipo de expertos te ayudará con cualquier duda, configuración inicial o problema técnico que puedas tener. También ofrecemos tutoriales y documentación completa."
    },
    {
      question: "¿Es fácil cargar mis productos actuales?",
      answer: "Sí, DevStock incluye herramientas de importación que te permiten cargar tu inventario actual de forma rápida y sencilla. Puedes importar desde archivos Excel, CSV o migrar desde otros sistemas de inventario. También ofrecemos asistencia personalizada para la migración inicial."
    },
    {
      question: "¿Hay límite en la cantidad de productos?",
      answer: "No, con DevStock Pro puedes gestionar una cantidad ilimitada de productos. No hay restricciones en el número de artículos, categorías o transacciones que puedes manejar."
    },
    {
      question: "¿Qué pasa si no estoy satisfecho?",
      answer: "Ofrecemos una garantía de devolución completa de 30 días. Si por cualquier razón no estás satisfecho con DevStock, te devolvemos el 100% de tu dinero, sin preguntas."
    },
    {
      question: "¿Se actualiza automáticamente?",
      answer: "Sí, DevStock se actualiza automáticamente con nuevas características y mejoras. Todas las actualizaciones están incluidas sin costo adicional y se aplican sin interrumpir tu trabajo."
    },
    {
      question: "¿Mis datos están seguros?",
      answer: "Completamente. Utilizamos encriptación de nivel empresarial (SSL 256-bit) y respaldos automáticos diarios. Tus datos están protegidos en servidores seguros con certificaciones de seguridad internacionales."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl text-gray-900">
            Preguntas <span className="text-[#8906e6]">frecuentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre DevStock
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.question} value={`item-${index}`} className="border border-gray-200 rounded-xl px-6">
                  {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#8906e6]/10 to-[#6b05b0]/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl text-gray-900 mb-4">
              ¿Tienes otra pregunta?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier duda específica que tengas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:soporte@devstock.com"
                className="flex items-center space-x-2 text-[#8906e6] hover:text-[#6b05b0] transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33333 3.33334H16.6667C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6667 16.6667H3.33333C2.41666 16.6667 1.66666 15.9167 1.66666 15V5.00001C1.66666 4.08334 2.41666 3.33334 3.33333 3.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.3333 5L10 10.8333L1.66666 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>soporte@devstock.com</span>
              </a>
              <span className="text-gray-400 hidden sm:block">•</span>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-[#8906e6] hover:text-[#6b05b0] transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2744C18.1008 17.487 17.9644 17.6779 17.7934 17.8349C17.6224 17.9919 17.4206 18.1116 17.2005 18.1877C16.9804 18.2638 16.7467 18.2947 16.5167 18.2783C13.9523 17.9912 11.4891 17.1269 9.32499 15.7583C7.31151 14.5086 5.60443 12.8015 4.35499 10.7883C2.98333 8.61431 2.11905 6.1389 1.83833 3.56165C1.82195 3.33281 1.85271 3.10026 1.92792 2.88111C2.00312 2.66195 2.1216 2.46094 2.27684 2.29047C2.43208 2.12001 2.62135 1.98395 2.83246 1.89079C3.04358 1.79763 3.27215 1.74929 3.50333 1.74998H6.00333C6.39767 1.74592 6.78132 1.8773 7.09191 2.11894C7.40251 2.36058 7.62161 2.70128 7.71666 3.08332C7.89587 3.84581 8.16879 4.58642 8.53333 5.29165C8.64371 5.52093 8.68923 5.78034 8.66493 6.03806C8.64063 6.29578 8.54738 6.54215 8.39166 6.74998L7.28833 7.85332C8.40833 9.9432 10.0568 11.5916 12.1467 12.7117L13.25 11.6083C13.4578 11.4526 13.7042 11.3594 13.9619 11.3351C14.2196 11.3108 14.479 11.3563 14.7083 11.4667C15.4136 11.8312 16.1542 12.1041 16.9167 12.2833C17.3022 12.3791 17.6456 12.6009 17.8875 12.9151C18.1294 13.2294 18.2581 13.6168 18.25 14.0117L18.3333 14.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
