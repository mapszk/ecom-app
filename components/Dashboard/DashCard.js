import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"

const DashCard = ({title, desc, link}) => {
    const router = useRouter()
    return(
        <Flex 
            justifyContent="space-between"
            direction="column"
            minHeight="200px"
            bgColor="white"
            boxShadow="base"
            rounded="md"
            p={5}
            _hover={{border: "1px", borderColor: "teal.500"}}
        >
            <Heading size="lg" mb={2}>{title}</Heading>
            <Text pr={3} mb={4}>{desc}</Text>
            <Button
                variant="solid"
                onClick={()=>router.push(link)}
                alignSelf="flex-start" 
                colorScheme="teal"
            >
                Ir a {title.toLowerCase()}
            </Button>
        </Flex>
    )
}

export default DashCard 
