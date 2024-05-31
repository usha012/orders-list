import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Container, Flex, Spacer , Button, useDisclosure, FormControl, Input, FormLabel, Accordion, AccordionItem, AccordionButton, Box, AccordionPanel, AccordionIcon, Card, CardHeader, CardBody, Heading, Text, Badge, Checkbox } from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, editSaleOrder } from '../Redux/orderSlice';
import { removeUser } from '../Redux/userSlice';

const Orders = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)
    const productData = useSelector(state=>state.products)
    const customerData = useSelector(state=>state.customer)

    const { isOpen, onOpen, onClose, initialRef} = useDisclosure()

    const [selectedOrder, setSelectedOrder] = useState({})
    const [error, setError] = useState({})
    const [orderStatus, setOrderStatus] = useState("active")
    const [filteredOrders, setFilteredOrder] = useState([])


    
    

    const options = productData?.map((product, i)=>( {...product, value:product?.name, label: product?.name}))

    const custormerList = customerData?.map((customer, i)=>( {...customer, value:customer?.customer_profile?.name, label: customer?.customer_profile?.name}))

    const handleSkuChange = (productIndex, skuIndex, value) => {
        const updatedItems = JSON.parse(JSON.stringify(selectedOrder?.items))
        updatedItems[productIndex].sku[skuIndex]["totalItems"] = +value
        setSelectedOrder({...selectedOrder, items: updatedItems})
    }

    const calculateTotal = (type)=>{
        let totalAmount = 0
        let totalQty = 0
        selectedOrder?.items?.map((product, i)=>{
            product.sku?.map((sk, iSk) => {
                if(sk?.totalItems){
                    totalAmount += sk?.selling_price*sk?.totalItems
                    totalQty += sk?.totalItems 
                }
            })
        })
        if(type === "price"){
            return totalAmount
        } 
        if(type === "quantity"){
            return totalQty
        }
        return null
    }

    const createOrder = ()=>{
        const updatedOrders = {
            ...selectedOrder,
            _id: Number(new Date()),
            isPaid: selectedOrder?.isPaid ? true : false,
            totalPrice: calculateTotal("price"),
            totalquantity: calculateTotal("quantity"),
            createdAt: (new Date()).toLocaleDateString(),
            updatedAt: (new Date()).toLocaleDateString()
        }

        //validation
        const error = {}
        if(!selectedOrder?.invoice_date){
            error.invoice_date = "Required"
        }
        if(!selectedOrder?.invoice_no){
            error.invoice_no = "Required"
        }
        if(!selectedOrder?.customer){
            error.customer = "Required"
        }
        if(!selectedOrder?.items?.length > 0){
            error.items = "Required"
        }

        let isErrorInSKU = false
        let updatedSKUCheckOrdersItems = selectedOrder?.items?.map((product)=> ({
            ...product,
            sku: product?.sku?.map(el => {
                if(el?.totalItems){
                    return {...el, error: false}
                } else {
                    isErrorInSKU = true
                    return {...el, error: true}
                }
            })
        }))

        if(isErrorInSKU){
            setSelectedOrder({...selectedOrder, items: updatedSKUCheckOrdersItems})
        }

        if(Object.keys(error)?.length){
            setError(error)
        } else if(isErrorInSKU){
            return
        } else{
            dispatch(addOrder(updatedOrders))
            setSelectedOrder({})
            onClose()

        }


    }

    const editOrder = ()=>{
        const updatedOrders = {
            ...selectedOrder,
            isPaid: selectedOrder?.isPaid ? true : false,
            totalPrice: calculateTotal("price"),
            totalquantity: calculateTotal("quantity"),
            updatedAt: (new Date()).toLocaleDateString()
        }

        //validation
        const error = {}
        if(!selectedOrder?.invoice_date){
            error.invoice_date = "Required"
        }
        if(!selectedOrder?.invoice_no){
            error.invoice_no = "Required"
        }
        if(!selectedOrder?.customer){
            error.customer = "Required"
        }
        if(!selectedOrder?.items?.length > 0){
            error.items = "Required"
        }

        let isErrorInSKU = false
        let updatedSKUCheckOrdersItems = selectedOrder?.items?.map((product)=> ({
            ...product,
            sku: product?.sku?.map(el => {
                if(el?.totalItems){
                    return {...el, error: false}
                } else {
                    isErrorInSKU = true
                    return {...el, error: true}
                }
            })
        }))

        if(isErrorInSKU){
            setSelectedOrder({...selectedOrder, items: updatedSKUCheckOrdersItems})
        }

        if(Object.keys(error)?.length){
            setError(error)
        } else if(isErrorInSKU){
            return
        } else{
            dispatch(editSaleOrder(updatedOrders))
            setSelectedOrder({})
            onClose()

        }


    }

    const handleEdit = order =>{
        setSelectedOrder(order)
        onOpen()
    }

    useEffect(() => {
        if(orderStatus === "active"){
            const filteredOrders = orders?.filter(el => el?.isPaid === false )
            setFilteredOrder(filteredOrders)
        } else {
            const filteredOrders = orders?.filter(el => el?.isPaid === true )
            setFilteredOrder(filteredOrders)
        }
    }, [orderStatus, orders])

    const logout = () => {
        dispatch(removeUser())
        window.location.reload()
    }



    return (  
    <>
    <Container maxW='7xl' height={"100vh"}>
        <Flex py={8}>
            <Button bgColor='gray.300' color="gray.700" onClick={()=>setOrderStatus("active")}>Active Sale Order</Button>
            <Button bgColor='gray.300' color="gray.700" ml={4} onClick={()=>setOrderStatus("completed")}>Complete Sale Order</Button>
            <Spacer />
            <Button bgColor='gray.300' color="gray.700" onClick={onOpen}><AddIcon mr={2}/>Sale Order</Button>
        </Flex>
        <TableContainer backgroundColor='gray.100'>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Customer Name</Th>
                    <Th>Price</Th>
                    <Th>Last Modified</Th>
                    <Th>{`${orderStatus === "active"? "Edit" : "View"}`}</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        filteredOrders?.map((order, index)=>(
                            <Tr>
                                <Td>{index + 1}</Td>
                                <Td>{order?.customer?.customer_profile?.name}</Td>
                                <Td >{order?.totalPrice}</Td>
                                <Td>{order?.updatedAt}</Td>
                                   <Td>
                                    <span onClick={()=>handleEdit(order)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                        </svg>
                                    </span>
                                   
                                
                                    
                                    </Td>
                            </Tr>
                        
                        ))
                    }
                    
              
                </Tbody>
            </Table>
        </TableContainer>

        <Modal initialFocusRef={initialRef} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="2xl" >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}> 

                     <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                     <FormLabel>Invoice Number</FormLabel>
                     <Input type='number' readOnly={orderStatus === "completed"} borderColor={orderStatus === "completed"? "transparent" : "gray.200"} min={0} h="30px" isInvalid={error?.invoice_no} errorBorderColor='red.300' fontSize='sm' placeholder='Enter Invoice Number' name="invoice number" value={selectedOrder?.invoice_no || ""} onChange={(e)=>setSelectedOrder({...selectedOrder, invoice_no: e.target.value})}  />
                     </Box>

                   <Box>
                     <FormLabel>Invoice Date</FormLabel>
                     <Input type='date' h="30px" readOnly={orderStatus === "completed"} borderColor={orderStatus === "completed"? "transparent" : "gray.200"} isInvalid={error?.invoice_date} errorBorderColor='red.300' value={selectedOrder?.invoice_date || ""} onChange={(e)=>setSelectedOrder({...selectedOrder, invoice_date: e.target.value})} fontSize='sm' placeholder='Select a Date'/>
              
                     </Box>


                     </Box>
                    <FormControl mb={5}>
                    <FormLabel>Customer</FormLabel>
                    <Select value={selectedOrder?.customer || ""} isDisabled={orderStatus === "completed"} onChange={customer => setSelectedOrder({...selectedOrder, customer})} options={custormerList} className={`basic-multi-select ${error?.customer ? "error":""}`} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>All Products</FormLabel>
                        <Select value={selectedOrder?.items || ""} isDisabled={orderStatus === "completed"} pb={8} isMulti onChange={products => setSelectedOrder({...selectedOrder, items: products})} options={options} className={`basic-multi-select ${error?.items ? "error":""}`} />
                        
                        {
                            selectedOrder?.items?.map((el, iProduct)=>(
                            
                                <Accordion allowToggle mt={3}>
                                    <AccordionItem>
                                        <h2> <AccordionButton> <Box as='span' flex='1' textAlign='left'>{el?.name}</Box> <AccordionIcon /> </AccordionButton></h2>
                                        {
                                        el?.sku.map((item,iSKU)=> (
                                            <AccordionPanel pb={4}>
                                                <Card>
                                                    <CardHeader borderBottom='1px' p={0} pb={4} borderColor='gray.200' display="flex" alignItems="center" justifyContent="space-between">
                                                        <Heading as='h5' size='xs' fontWeight={500} textTransform='capitalize'>Sku {item?.unit}</Heading>
                                                        <Heading as='h5' size='xs' fontWeight={500} textTransform='capitalize'>Rate: {item?.amount}</Heading>
                                                    </CardHeader>

                                                    <CardBody>
                                                        <Box mb={6} display="flex" alignItems="center" justifyContent="space-between">
                                                            <Box>
                                                                <Heading size='xs' mb="2" fontWeight={500} textTransform='capitalize'>
                                                                    Selling Rate
                                                                </Heading>
                                                                <Text pt='2' fontSize='sm' >
                                                                    {item?.selling_price}
                                                                </Text>
                                                            </Box>

                                                            <Box>
                                                                <Heading size='xs' mb="2" fontWeight={500} textTransform='capitalize'>
                                                                    Total Items
                                                                </Heading>
                                                                <Input type='number' h="30px" readOnly={orderStatus === "completed"} borderColor={orderStatus === "completed"? "transparent" : "gray.200"} isInvalid={item?.error} errorBorderColor='red.300' fontSize='sm' name="totalItems" min="0" value={item?.totalItems} onChange={(e)=> handleSkuChange(iProduct, iSKU, e.target.value)} />
                                                            </Box>
                                                        </Box>
                                                                
                                                        <p>
                                                            <Badge py="1" px="2" borderRadius="md" textTransform="capitalize"  fontWeight={500}>Net Sku Price: {(item?.selling_price * item?.totalItems) || 0}</Badge>
                                                        </p>
                                                        
                                                    </CardBody>
                                                </Card>
                                            </AccordionPanel>
                                        ))
                                        }  
                                    </AccordionItem>
                                </Accordion>
                            ))
                        }
                    </FormControl>
                    
                </ModalBody>

                <ModalFooter  borderTop="1px" borderColor='gray.200' px="0" mx="24px" display="block">
                    <Box display="flex" justifyContent="space-between" mb="5" alignItems="center">
                    <Checkbox _checked={{ "& .chakra-checkbox__control": { background: "green.200", border:"unset"}}} readOnly={selectedOrder?.isPaid} isChecked={selectedOrder?.isPaid} onChange={(e)=>setSelectedOrder({...selectedOrder, isPaid: e.target.checked})} >Is Paid</Checkbox>
                    <p>
                        <Badge py="1" px="2" borderRadius="md" textTransform="capitalize" bg="green.200" color="green.800" fontWeight={500}>total price:{calculateTotal("price")}</Badge>
                        <Badge py="1" px="2" borderRadius="md" textTransform="capitalize" bg="green.200" color="green.800" ms="10px"  fontWeight={500}>Total Items:{calculateTotal("quantity")}</Badge>
                    </p>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb="3" alignItems="center">
                        <Button onClick={onClose} w="50%">Discard</Button>

                        <Button colorScheme='blue' w="50%" mr={3} onClick={()=> selectedOrder?._id ? editOrder() : createOrder()}>
                        {selectedOrder?._id ? "Save Order" : "Create Sale Order"}
                        </Button>
                    </Box>
                </ModalFooter>

            </ModalContent>
        </Modal>

        <Box pos="absolute" bottom="10%" right="20px">
            <Button bgColor='gray.200' mr={3} onClick={logout}> Logout</Button>
        </Box>
    </Container>    
    </>
  )
}

export default Orders
