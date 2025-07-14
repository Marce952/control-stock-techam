import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

const ModalComponentAdd = ({isOpen, onOpenChange}) => {
  const productsProps = [
    {type: "text", placeholder: "Nombre del producto"},
    {type: "number", placeholder: "Precio del producto"},
    {type: "number", placeholder: "Cantidad del producto"},
  ]

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Añadir un producto</ModalHeader>
            <ModalBody>
              {
                productsProps.map((input, index) => (
                  <Input
                    key={index}
                    type={input.type}
                    placeholder={input.placeholder}
                    className="mb-4"
                  />
                ))
              }
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={onClose}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalComponentAdd