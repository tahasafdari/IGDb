'use client'
// Chakra imports
import { Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react'
import Card from '@/components/card/Card'
import InputField from '@/components/fields/InputField'

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.500'
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
            <InputField mb={25} id="old" label="Old Password" placeholder="Old Password" type='password' />
            <InputField mb={25} id="new" label="New Password" placeholder="New Password" type='password' />
          </Flex>
        </FormControl>
      </Card>
    </FormControl>
  )
}
