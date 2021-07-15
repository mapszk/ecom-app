import { Button, Flex, Heading, Link, Spacer, Text } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"

const DashCard = ({title, desc, link}) => {
    const router = useRouter()
    return(
        <Flex 
            justifyContent="start"
            direction="column"
            minHeight="280px"
            bgColor="white"
            boxShadow="base"
            rounded="md"
            p={5}
            _hover={{border: "1px", borderColor: "primary.500"}}
        >
            <Heading size="lg" mb={2}>{title}</Heading>
            <Text pr={3} mb={4}>{desc}</Text>
            <Spacer/>
            <Button
                variant="solid"
                onClick={()=>router.push(link)}
                alignSelf="flex-start" 
                justifySelf="end"
                colorScheme="primary"
            >
                Ir a {title.toLowerCase()}
            </Button>
        </Flex>
    )
}

export default DashCard 
