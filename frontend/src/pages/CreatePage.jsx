import { Container, VStack,Heading, Box, useColorModeValue, Input,Button,useToast} from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  
  const [newProduct,setNewProduct] = useState({
    name:"",
    price:"",
    image:"",
  });


   const toast = useToast();
  const {createProduct} = useProductStore();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const {success,message} = await createProduct(newProduct);
    console.log("Success",success);
    console.log("Message:",message);

    if(!success){
        toast({
          title :"Error",
          description:message,
          status:"error",
        })
    }else{
      toast({
        title:"Success",
        description:message,
        duration:2000,
        status:"success"
      })
    }
    setNewProduct({name:"",price:"",image:""})
    

      navigate('/');  // Redirect to homepage after 2 seconds
   

  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
        <Box
          w={"full"} bg={useColorModeValue("white","gray.800")} p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
             placeholder='Product Name'
             name='name'
             value={newProduct.name}
             onChange={(e)=> setNewProduct({...newProduct,name:e.target.value})}
             />
              <Input
             placeholder='Price'
             name='price'
             type='number'
             value={newProduct.price}
             onChange={(e)=> setNewProduct({...newProduct,price:e.target.value})}
             />
              <Input
             placeholder='IMAGE URL'
             name='image'
             value={newProduct.image}
             onChange={(e)=> setNewProduct({...newProduct,image:e.target.value})}
             />
             <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Add Product 
             </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage;
