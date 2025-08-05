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
  buttonTitle,
  selects = [],
  uniqueProduct = [],
}) => {

  const handleChange = (name, value) => {
    console.log("🚀 ~ handleChange ~ name, value:", name, value)
    if(name === "total_stock" && uniqueProduct[0]?.stock !== undefined){
      const maxStock = uniqueProduct[0].stock;
      value = Math.min(Number(value), maxStock);
    }

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
                  value={newProduct[input.name] || input.value || ""}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                  className="mb-4"
                  isDisabled={input.isDisabled || false}
                  max={input.max || ""}
                />
              ))}
              {
                selects.map((select, idx) => (
                  <Select
                    key={idx}
                    label={select.label}
                    value={newProduct[select.name] || ""}
                    onChange={(e) => {
                      handleChange(select.name, e.target.value)
                      if(select.onChange) {
                        select.onChange(e.target.value);
                      }
                    }}
                    className='mb-4'
                  >
                    {select.options.map((option, i) => (
                      <SelectItem
                        key={option.id}
                        value={select.getValue(option)}
                      >
                        {select.getLabel(option)}
                      </SelectItem>
                    ))}
                  </Select>
                ))
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