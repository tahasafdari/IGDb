// Chakra imports
/**
 * @file Info.tsx is the settings page for the user to change their username and email
 */
import * as React from 'react'
import { Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import Card from '@/components/card/Card'
import InputField from '@/components/fields/InputField'
import TextField from '@/components/fields/TextField'
import { useState } from 'react'
import { UPDATE_USER } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { Button } from '@mui/material'
import { UserModify } from '../interfaces/User'
/**
 * A component that allows users to update their account settings.
 * 
 * This component provides input fields for users to modify their username and email.
 * It fetches the current user data from the local storage, and upon submission, it sends
 * the modified data to be updated through a GraphQL mutation.
 * 
 * @returns {JSX.Element} The settings component.
 * 
 * @example
 * // Usage:
 * <Settings />
 */
export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.500'

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [updateUser] = useMutation(UPDATE_USER)
  const handleUpdate = async () => {
    try {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || 'null')
      const oldEmail = userFromLocalStorage?.email
      const token = localStorage.getItem('token')
      const user: UserModify = { user_name: username, email : email ? email : oldEmail  }
      const { data } = await updateUser({
        variables: {
          user: user,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
    } catch (err) {
      alert(err)
    }
  }

  return (
    <FormControl>
      <Card>
        <Flex direction="column" mt="20px" mb={'15px'}>
          <Text fontSize="xl" color={textColorPrimary} mb="6px" fontWeight="bold">
            Account Settings
          </Text>
          <Text fontSize="md" fontWeight="500" color={textColorSecondary}>
            Here you can change user account information
          </Text>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
          <InputField
            mb="10px"
            me="30px"
            id="username"
            label="Username"
            placeholder="@parkson.adela"
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <InputField
            mb="10px"
            me="30px"
            id="email"
            label="Email Address"
            placeholder="hello@example.com"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </SimpleGrid>
        <Button onClick={handleUpdate}>Update</Button>
      </Card>
    </FormControl>
  )
}
