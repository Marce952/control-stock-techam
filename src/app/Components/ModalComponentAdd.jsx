import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@heroui/react'

const ModalComponentAdd = ({
  isOpen,
  onOpenChange,
  title,
  inputs,
  newProduct,
  setNewProduct,
  onPress,
  productsSupplier,
  buttonTitle
}) => {

  const handleChange = (name, value) => {
    console.log("🚀 ~ handleChange ~ name, value:", name, value)
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={newProduct[input.name] || ""}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                  className="mb-4"
                />
              ))}
              {
                productsSupplier && productsSupplier.length > 0 &&
                <Select
                  label={"Proveedores"}
                  onChange={(e) => handleChange('idProveedor', e.target.value)}
                >
                  {
                    productsSupplier.map((supplier, index) => (
                      <SelectItem
                        key={supplier.id}
                        value={supplier.id}
                      >
                        {supplier.nombre}
                      </SelectItem>
                    ))
                  }
                </Select>
              }
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={onPress}>
                {buttonTitle}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponentAdd;