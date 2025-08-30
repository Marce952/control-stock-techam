import { Button, Image } from '@heroui/react'
import React from 'react'

const HeroHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-20 lg:p-32">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8906e6]/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8906e6] to-[#6b05b0] rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="text-3xl lg:text-4xl text-gray-900">DevStock</h1>
            </div>

            {/* Main title */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl text-gray-900 leading-tight">
                Control de Stock{" "}
                <span className="text-[#8906e6]">Moderno</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-lg">
                Gestiona tu stock de forma simple y eficiente. Todo lo que necesitas para el control perfecto de tu inventario.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-[#8906e6] hover:bg-[#6b05b0] text-white px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Adquirir ahora
              </Button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8">
              <div>
                <div className="text-2xl text-[#8906e6]">500+</div>
                <div className="text-sm text-gray-600">Empresas confían</div>
              </div>
              <div>
                <div className="text-2xl text-[#8906e6]">99.9%</div>
                <div className="text-sm text-gray-600">Tiempo activo</div>
              </div>
              <div>
                <div className="text-2xl text-[#8906e6]">24/7</div>
                <div className="text-sm text-gray-600">Soporte</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8906e6]/20 to-transparent rounded-3xl transform rotate-3"></div>
            <Image
              src="https://images.unsplash.com/photo-1735529576077-d3792e43bab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwZGFzaGJvYXJkJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzU2NTE3NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="DevStock Dashboard"
              className="relative rounded-3xl shadow-2xl w-9/12 h-auto transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeroHeader