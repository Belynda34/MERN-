import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box ,Heading,HStack,IconButton,Image,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,Text,useColorModeValue,useToast, VStack,useDisclosure,Input, ModalFooter, Button} from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';
import { updateProduct } from '../../../backend/controllers/productController';

const ProductCard = ({product}) => {

    const toast = useToast();
   
    const {deleteProduct,updateProduct} = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (pid) =>{
        const {success,message} =await deleteProduct(pid);
        if(!success){
            toast({
                title : 'Error',
                description: message,
                status:'error',
                duration:3000,
                isClosable:true
            })
        }else{
            toast({
                title:'Sucess',
                description: message,
                status:'success',
                duration:3000,
                isClosable:true
            })
        }
    }


    const handleUpdateProduct  = async (pid,updatedProduct) =>{
      const{ success, message}=await updateProduct(pid,updatedProduct);
        onClose(); 
        if(!success){
            toast({
                title : 'Error',
                description: message,
                status:'error',
                duration:3000,
                isClosable:true
            });
        }else{
            toast({
                title:'Sucess',
                description: 'Product added successfully',
                status:'success',
                duration:3000,
                isClosable:true
            });
        }
      }
        
    


    console.log("Product card:",product);

    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800");


  return (
    <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{transform:"translateY(-5px)",shadow:"xl"}}
        bg={bg}
        w={"300px"}
    >
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>

        <Box p={4} >
            <Heading as={'h3'} size={'md'} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={"bold"} fontSize={'xl'} color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>}  onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)}  colorScheme='red'/>
            </HStack>
        </Box>
        <Modal  isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                           placeholder='Product name'
                           name='name'
                           value={updatedProduct.name}
                           onChange = {(e)=> setUpdatedProduct({ ...updatedProduct, name:e.target.value})}
                        />
                         <Input
                           placeholder='Price'
                           name='price'
                           type='number'
                           value={updatedProduct.price}
                           onChange = {(e)=> setUpdatedProduct({ ...updatedProduct, price:e.target.value})}
                        />
                         <Input
                           placeholder='IMAGE_URL'
                           name='image'
                           value={updatedProduct.image}
                           onChange = {(e)=> setUpdatedProduct({ ...updatedProduct, image:e.target.value})}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClose onClick={()=> handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
                    <Button variant={'ghost'} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}



export default ProductCard;