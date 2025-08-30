export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">

          {/* Logo and company info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8906e6] to-[#6b05b0] rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl">DevStock</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              El sistema de control de inventario más simple y eficiente para tu negocio.
              Gestiona tu stock de forma profesional.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>© 2024 DevStock. Todos los derechos reservados.</p>
              <p>Hecho con ❤️ para empresas que crecen</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <h4 className="text-lg text-white">Enlaces rápidos</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#inicio" className="hover:text-[#8906e6] transition-colors duration-200">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="hover:text-[#8906e6] transition-colors duration-200">
                  Características
                </a>
              </li>
              <li>
                <a href="#precios" className="hover:text-[#8906e6] transition-colors duration-200">
                  Precios
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#8906e6] transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-[#8906e6] transition-colors duration-200">
                  Testimonios
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg text-white">Soporte</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="mailto:soporte@devstock.com" className="hover:text-[#8906e6] transition-colors duration-200">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                  Tutoriales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                  Estado del sistema
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and social */}
          <div className="space-y-6">
            <h4 className="text-lg text-white">Conecta con nosotros</h4>
            <div className="space-y-4">
              <div className="space-y-3 text-gray-400">
                <a
                  href="mailto:soporte@devstock.com"
                  className="flex items-center space-x-3 hover:text-[#8906e6] transition-colors duration-200"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33333 3.33334H16.6667C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6667 16.6667H3.33333C2.41666 16.6667 1.66666 15.9167 1.66666 15V5.00001C1.66666 4.08334 2.41666 3.33334 3.33333 3.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.3333 5L10 10.8333L1.66666 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>soporte@devstock.com</span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-3 hover:text-[#8906e6] transition-colors duration-200"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2744C18.1008 17.487 17.9644 17.6779 17.7934 17.8349C17.6224 17.9919 17.4206 18.1116 17.2005 18.1877C16.9804 18.2638 16.7467 18.2947 16.5167 18.2783C13.9523 17.9912 11.4891 17.1269 9.32499 15.7583C7.31151 14.5086 5.60443 12.8015 4.35499 10.7883C2.98333 8.61431 2.11905 6.1389 1.83833 3.56165C1.82195 3.33281 1.85271 3.10026 1.92792 2.88111C2.00312 2.66195 2.1216 2.46094 2.27684 2.29047C2.43208 2.12001 2.62135 1.98395 2.83246 1.89079C3.04358 1.79763 3.27215 1.74929 3.50333 1.74998H6.00333C6.39767 1.74592 6.78132 1.8773 7.09191 2.11894C7.40251 2.36058 7.62161 2.70128 7.71666 3.08332C7.89587 3.84581 8.16879 4.58642 8.53333 5.29165C8.64371 5.52093 8.68923 5.78034 8.66493 6.03806C8.64063 6.29578 8.54738 6.54215 8.39166 6.74998L7.28833 7.85332C8.40833 9.9432 10.0568 11.5916 12.1467 12.7117L13.25 11.6083C13.4578 11.4526 13.7042 11.3594 13.9619 11.3351C14.2196 11.3108 14.479 11.3563 14.7083 11.4667C15.4136 11.8312 16.1542 12.1041 16.9167 12.2833C17.3022 12.3791 17.6456 12.6009 17.8875 12.9151C18.1294 13.2294 18.2581 13.6168 18.25 14.0117L18.3333 14.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </a>
              </div>

              {/* Social media */}
              <div className="pt-4">
                <h5 className="text-sm text-gray-400 mb-3">Síguenos en:</h5>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#8906e6] hover:text-white transition-all duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#8906e6] hover:text-white transition-all duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#8906e6] hover:text-white transition-all duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#8906e6] hover:text-white transition-all duration-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.001 12.017z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                Términos de servicio
              </a>
              <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                Política de privacidad
              </a>
              <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                Política de cookies
              </a>
              <a href="#" className="hover:text-[#8906e6] transition-colors duration-200">
                Política de reembolso
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Desarrollado en México 🇲🇽</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}