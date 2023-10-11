'use client'

// Chakra imports
import { Box, Flex, SimpleGrid, Button } from '@chakra-ui/react'
import Info from '@/components/settings/Info'
import Password from '@/components/settings/Password'
import Profile from '@/components/settings/Profile'
import { useEffect, useState } from 'react'
import { User } from '@/components/interfaces/User'
import { useQuery } from '@apollo/client'
import USER_BY_ID from '@/graphql/queries'

export default function Settings() {
  const [user, setUser] = useState<User | null>(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const { data, loading, error } = useQuery(USER_BY_ID, {
    variables: { id: user?.id },
    context: {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    },
  })

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null')
    console.log(userData)
    if (userData) {
      setUser(userData)
    }
  }, [])

  return (
    <Box mt={{ base: '70px', md: '0px', xl: '0px' }}>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing="50px" mb="20px">
        {/* Column Left */}
        <Flex direction="column">
          {user && (
            <Profile
              name={data?.userById.user_name}
              avatar={data ? data.userById.profile_image : user.profile_image}
              banner={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
            />
          )}
        </Flex>
        {/* Column Right */}
        <Flex direction="row" gap="150px" wrap={'wrap'} justifyContent="center">
          <Box width={{ base: '100%', lg: '48%' }}>
            <Info />
          </Box>
          <Box
            width="1px"
            height="100%"
            bgColor="gray.300"
            display={{ base: 'none', lg: 'block' }}
            my={{ base: '0', lg: '0' }}
          />
          <Box width={{ base: '100%', lg: '48%' }}>
            <Password />
          </Box>
        </Flex>
        {/* <Button
          mt={4}
          mx="auto" // Center the button horizontally
          borderColor="black"
          borderWidth="1px"
          borderRadius="5px" // Set border radius to 5px
          size="lg"
          px={12} // Further increase horizontal padding
          py={8} // Further increase vertical padding
          fontSize="xl" // Increase font size even more
          background="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
          _hover={{
            background: 'linear-gradient(17.46deg, #4A25E1 24.3%, #6B4AFF 78.4%)',
            color: 'white',
          }}
           onClick={()=>console.log(data.userById)}
        >
          Get User
        </Button> */}
      </SimpleGrid>
    </Box>
  )
}
