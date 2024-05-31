import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../Redux/userSlice'

const Login = () => {
    const [userDetails, setUserDetails] = useState({})

    const DUMMY_USER = {
        "id": 9, 
        "customer": 11908,
        "customer_profile": { 
            "id": 11908,
            "name": "Ram",
            "color": [ 182,73,99 ],
            "email": "jesus_christ@church.com",
            "pincode": "Mumbai",
            "location_name": ["Mumbai", "Maharashtra" ,"India"],
            "type": "C",
            "profile_pic": null,
            "gst": "" 
        }
    }

    const dispatch = useDispatch()

    const handleChange = (e)=>{
        setUserDetails({...userDetails, [e.target.name]:e.target.value})
    }

    const onSubmit =()=>{
        if(userDetails?.email === "dummyuser@gmail.com" && userDetails?.password === "1234"){
            // alert("login successful") 
            dispatch(addUser(DUMMY_USER)) 
        }
        else{
            alert("Enter email and password")
        }
    }
  return (
    <>
    <Box className='user_login' display="flex" alignItems="center" justifyContent="center" onKeyPress={e => e.key === "Enter" ? onSubmit() : ""}>
        <Container p={8}>
            <Heading as='h2' size='xl' mb="2rem">
                Login
            </Heading>
            <Spacer />
            <FormControl mb={5}>
                <FormLabel>Email address</FormLabel>
                <Input type='email' name="email" value={userDetails?.email} onChange={(e)=>handleChange(e)} />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl mb={5}>
                <FormLabel>Password</FormLabel>
                <Input type='password' name="password" value={userDetails?.password} onChange={(e)=>handleChange(e)} />
            </FormControl>
            
            <Button bgColor='gray.300' width="100%" color="gray.700" mb={5} onClick={onSubmit}>Login</Button>
            
            <FormControl mb={5}>
            <p>Use This</p>
            <FormHelperText>Email: dummyuser@gmail.com</FormHelperText>
            <FormHelperText>Password: 1234</FormHelperText>
            </FormControl>
      
        </Container>
    </Box>
      
    </>
  )
}

export default Login
