"use client";
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useRouter } from "next/navigation";
import HeroHeader from "./Components/landing/HeroHeader";
import { Features } from "./Components/landing/Features";
import { Pricing } from "./Components/landing/Pricing";
import { Footer } from "./Components/landing/Footer";
// import { useSession } from "next-auth/react";
// import { toast } from "react-toastify";
// import { useState } from "react";

export default function LandingPage() {
  // const { data: session } = useSession();
  // const router = useRouter();
  // const [downloadLinkHidden, setDownloadLinkHidden] = useState(false);

  // const handleGoToDashboard = () => {
  //   if (session?.user) {
  //     // Redirigir según el rol
  //     router.push("/dashboard");
  //   }
  //   else {
  //     router.push("/login");
  //   }
  // };


  const plans = [
    {
      name: "Starter",
      price: "Gratis",
      period: "por siempre",
      features: [
        "Hasta 10 clientes",
        "Gestión básica de rutinas",
        "Acceso web",
        "Acceso a la aplicación móvil"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$45.000",
      period: "por mes",
      features: [
        "Hasta 200 clientes",
        "Analytics avanzados",
        "Gestión de clientes",
        "Gestión avanzada de rutinas",
        "Soporte prioritario",
        "Acceso a la aplicación móvil",
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$65.000",
      period: "por mes",
      features: [
        "Clientes ilimitados",
        "Analytics personalizados",
        "Soporte 24/7",
        "API personalizada",
        "Integraciones avanzadas",
        "Capacitación incluida"
      ],
      popular: false,
      comingSoon: true
    }
  ];

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      role: "Dueño - Gimnasio Avellaneda",
      content: "Esta plataforma revolucionó la gestión de mi gimnasio. Los clientes están más comprometidos y el seguimiento es mucho más eficiente.",
      rating: 5
    },
    {
      name: "María González",
      role: "Entrenadora - Crossfit",
      content: "La facilidad para crear rutinas personalizadas y el seguimiento del progreso de mis clientes es increíble. ¡Altamente recomendado!",
      rating: 5
    },
    {
      name: "Luis Martínez",
      role: "Administrador - StrongGym",
      content: "La plataforma es muy fácil de usar y tiene muchas características que nos ayudan a gestionar nuestro gimnasio.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroHeader />

      {/* Features */}
      <Features />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gimnasios que ya confían en nuestra plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardBody>
                  <div className="flex mb-4">
                    {/* {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tu gimnasio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a cientos de gimnasios que ya confían en nuestra plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* {session?.user ? (
              <Button
                size="lg"
                color="secondary"
                onPress={handleGoToDashboard}
                className="text-lg px-8 py-6 text-white"
              >
                Ir al Panel de Control
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  color="secondary"
                  onPress={() => router.push("/register")}
                  className="text-lg px-8 py-6 text-white"
                >
                  Comenzar Gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  color="secondary"
                  onPress={() => router.push("/register")}
                  className="text-lg px-8 py-6 text-white"
                >
                  Solicitar Demo
                </Button>
              </>
            )} */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
