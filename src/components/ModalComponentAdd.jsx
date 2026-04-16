import React, { useEffect } from 'react';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, Input, Autocomplete, AutocompleteItem 
} from '@heroui/react';

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
  uniqueProduct = null,
  loading,
  addCategories
}) => {

  const handleChange = (name, value) => {
    if (name === "total_stock" && uniqueProduct?.stock !== undefined) {
      const maxStock = uniqueProduct.stock;
      value = Math.min(Number(value), maxStock);
    }

    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onPress) onPress();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      backdrop="blur" 
      placement="top-center"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-100/50",
        footer: "border-t border-gray-100/50",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-semibold text-gray-800">
              {title}
            </ModalHeader>
            <ModalBody
              className="py-6 max-h-[80vh] overflow-y-auto sm:max-h-none sm:overflow-y-visible"
              onKeyDown={handleKeyDown}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputs.map((input, index) => (
                  <Input
                    key={index}
                    label={input.label || ""}
                    labelPlacement="outside"
                    type={input.type}
                    placeholder={input.placeholder}
                    value={newProduct[input.name] || input.value || ""}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                    isDisabled={input.isDisabled || false}
                    max={input.max || ""}
                    autoFocus={index === 0}
                    variant="faded"
                    classNames={{
                      inputWrapper: "bg-gray-50/50 hover:bg-gray-50",
                      label: "text-gray-700 font-medium",
                    }}
                  />
                ))}
                
                {selects.map((select, idx) => (
                  <div key={idx} className="sm:col-span-2">
                    <Autocomplete
                      label={select.label}
                      labelPlacement="outside"
                      placeholder={`Buscar ${select.label.toLowerCase()}...`}
                      selectedKey={
                        newProduct[select.name] !== undefined && newProduct[select.name] !== ""
                          ? String(newProduct[select.name])
                          : select.value
                            ? String(select.value)
                            : null
                      }
                      onSelectionChange={(key) => {
                        if (key) {
                          handleChange(select.name, key);
                          if (select.onChange) {
                            select.onChange(key);
                          }
                        }
                      }}
                      variant="faded"
                      classNames={{
                        base: "w-full",
                        listboxWrapper: "max-h-[320px]",
                        selectorButton: "text-default-500"
                      }}
                      inputProps={{
                        classNames: {
                          inputWrapper: "bg-gray-50/50 hover:bg-gray-50",
                          label: "text-gray-700 font-medium",
                        },
                      }}
                    >
                      {(Array.isArray(select.options) ? select.options : []).map((option) => (
                        <AutocompleteItem
                          key={String(select.getValue(option))}
                          value={String(select.getValue(option))}
                          textValue={String(select.getLabel(option))}
                        >
                          {select.getLabel(option)}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>
                ))}
                
                {addCategories && (
                   <div className="mt-2 text-right sm:col-span-2">
                     {addCategories}
                   </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                className='font-medium'
                onPress={onPress}
                isLoading={loading}
              >
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
