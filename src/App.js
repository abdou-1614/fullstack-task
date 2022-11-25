import { Box, Button, Container, Drawer, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DrawerExample from "./componenets/Drawer";
import Row from "./componenets/row";
import { GlobalContext } from "./context/contextWraper";

function App() {

  const { fetcher, users, isOpen, onOpen, onClose } = useContext(GlobalContext)
  useEffect(() => {
    fetcher()
  }, [])
  return (
    <div>
      <Container minW={'full'} p={'8'} fontSize={"18px"} >
          <Box mt={'9'} rounded={'lg'} boxShadow={'base'}>
              <Box p={'4'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mx={"10"} >
                  <Text fontSize={'xl'} fontWeight={'bold'} >
                    List Todos
                  </Text>
                  <Button 
                  colorScheme={'linkedin'} 
                  maxW={'300px'} minW={'150px'} 
                  variant={'solid'} 
                  leftIcon={<AiOutlinePlus fontSize={'20px'} 
                  />} 
                  onClick={onOpen}
                  >
                    Add Todos
                  </Button>
              </Box>
              <TableContainer>
                  <Table variant='simple'>
                    <Thead>
                      <Tr fontWeight={'bold'}>
                        <Th>AVATAR</Th>
                        <Th>FullName</Th>
                        <Th>EMAIL</Th>
                        <Th>DESCRIPTION</Th>
                        <Th>ACTIONS</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        users?.map(({ id, fullName, email, description }) => (
                          <Row
                          id={id}
                          fullName={fullName}
                          email={email}
                          description={description}
                          />
                        ))
                      }
                    </Tbody>
                  </Table>
            </TableContainer>
          </Box>
          <DrawerExample/>
      </Container>
    </div>
  );
}

export default App;
