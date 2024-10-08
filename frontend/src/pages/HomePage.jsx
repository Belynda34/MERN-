import React, { useEffect } from "react";
import { Container, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
    console.log("Fetching products...");
  }, [fetchProducts]);

  console.log("Products from store:", products); // Check this log

  console.log("Products:", products);

  return (
    <Container>
      <VStack>
        <Text 
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,cyan.400,blue.500 )"}
          bgClip={"clip"}
          textAlign={"center"}
        >
          Create Product 🚀
        </Text>
        {products.length > 0 ? (
          <SimpleGrid columns={[1, 2]} spacingX={60} spacingY={10}>
            {products.map((product) => {
              console.log("Rendering product:", product); // Add this for debugging
              return <ProductCard key={product.id} product={product} />;
            })}
          </SimpleGrid>
        ) : (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found 😥{""}
            <Link to="/create">
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
