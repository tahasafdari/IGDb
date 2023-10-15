'use client'

// Chakra imports
import { Box, Flex, SimpleGrid, Button } from '@chakra-ui/react'
import Info from '@/components/settings/Info'
import Password from '@/components/settings/Password'
import Profile from '@/components/settings/Profile'
import { useEffect, useState } from 'react'
import { User } from '@/components/interfaces/User'
import { useQuery } from '@apollo/client'
import {USER_BY_ID} from '@/graphql/queries'
import styles from '../../styles/profile.module.css'
/**
 * `Settings` React component.
 * 
 * Represents a user's profile page. This page displays the user's profile information 
 * including the profile picture, and provides areas to update user information and 
 * change the user's password.
 * 
 * @returns {JSX.Element} A visual representation of the user's profile/settings page.
 */
export default function Settings() {
  // State to hold the user's data.
  const [user, setUser] = useState<User | null>(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  

  // Apollo Client query to fetch user data by their ID.
  const { data, loading, error } = useQuery(USER_BY_ID, {
    variables: { id: user?.id },
    context: {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    },
  })
  // useEffect hook to fetch the user data from local storage when the component mounts.  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null')
    if (userData) {
      setUser(userData)
    }
  }, [])

  return (
      <div className='h-screen bg-cover'
               style={{backgroundImage: 'url(https://media.discordapp.net/attachments/1142756461026476043/1161689305215946804/image.png?ex=65393679&is=6526c179&hm=9c994f15138392fbb82ce67260aa008c4b729dcaa620d4576a17b7c7de1e4cfd&)'}}
  >
        <div className={styles.topCenter}>
          <div className={styles.profileImageContainer}>
            {user && (
                <Profile
                    name={data?.userById.user_name}
                    avatar={data ? data.userById.profile_image : user.profile_image}
                    banner={''}
                />
            )}
          </div>
        </div>
        <Box mt={{ base: '70px', md: '0px', xl: '0px' }}>
          <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing="60px" mb="20px">
            {/* Column Left */}
            <Flex direction="column">
              {/* Placeholder for other content in the left column */}
            </Flex>
            {/* Column Right */}
            <Flex direction="row" gap="150px" wrap={'wrap'} justifyContent="center">
              <Box width={{ base: '100%', lg: '48%' }} className={styles.infoBox}>
                <Info />
              </Box>
              <Box
                  width="1px"
                  height="100%"
                  bgColor="gray.300"
                  display={{ base: 'none', lg: 'block' }}
                  my={{ base: '0', lg: '0' }}
              />
              <Box width={{ base: '100%', lg: '48%' }} className={styles.passwordBox}>
                <Password />
              </Box>
            </Flex>
          </SimpleGrid>
        </Box>
      </div>
  );
}
