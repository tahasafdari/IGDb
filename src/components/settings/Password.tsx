'use client'
// Chakra imports
import { Button, Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react'
import Card from '@/components/card/Card'
import InputField from '@/components/fields/InputField'
import { SetStateAction, useState} from 'react'
import {useMutation} from '@apollo/client'
import {UserModify} from '../interfaces/User'
import {UPDATE_USER} from '@/graphql/mutations'

/**
 * A component that allows users to change their account password.
 *
 * This component provides input fields for users to enter their old password
 * and set a new password. Upon submission, it sends the modified data through a
 * GraphQL mutation to update the user's password.
 *
 * @returns {JSX.Element} The settings component for changing the password.
 *
 * @example
 * // Usage:
 * <Settings />
 */
export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.500'

  const [password, setPassword] = useState('')
  const [updateUser] = useMutation(UPDATE_USER)
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token')
      const user: UserModify = {password: password}
      const {data} = await updateUser({
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
          <Flex direction="column" mb="40px">
            <Text fontSize="xl" color={textColorPrimary} mb="6px" fontWeight="bold">
              Change password
            </Text>
            <Text fontSize="md" fontWeight="500" color={textColorSecondary}>
              Here you can set your new password
            </Text>
          </Flex>
          <FormControl>
            <Flex flexDirection="column">
              <InputField
                  mb={25}
                  id="old"
                  label="Old Password"
                  placeholder="Old Password"
                  type="password"
              />
              <InputField
                  mb={25}
                  id="new"
                  label="New Password"
                  placeholder="New Password"
                  type="password"
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value)}
            />
          </Flex>
        </FormControl>
        <Button onClick={handleUpdate}>Change the password</Button>
      </Card>
    </FormControl>
  )
}
