import {
  Flex,
  Select,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from '@chakra-ui/react'
import Card from '@/components/card/Card'
import { NextAvatar } from '@/components/image/Avatar'
import { StaticImageData } from 'next/image'
import * as React from 'react'
import { UPDATE_USER } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { User, UserModify } from '../interfaces/User'
import { useState } from 'react'
/**
 * A component that allows users to update their profile settings.
 *
 * This component provides functionalities for users to modify their avatar and banner images.
 * It supports changing avatar via a direct URL. The updated avatar data is then sent through a
 * GraphQL mutation to update the user's profile.
 *
 * @param name - The name of the user.
 * @param avatar - The current avatar image URL of the user.
 * @param banner - The current banner image URL of the user.
 *
 * @returns {JSX.Element} The settings component for updating profile images.
 *
 * @example
 * // Usage:
 * <Settings name="John Doe" avatar="/path/to/avatar.jpg" banner="/path/to/banner.jpg" />
 */
export default function Settings(props: { name: string; avatar: string; banner: string }) {
  const { name, avatar, banner } = props
  const textColorPrimary = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.500'
  const [imageURL, setImageURL] = useState('')

  const [updateUser] = useMutation(UPDATE_USER)

  // For handling the file input change and URL input change
  const handleFileChange = (event: any) => {
    // Handle the uploaded file here
    console.log(event.target.files)
  }

  const handleURLChange = async () => {
    try {
      const token = localStorage.getItem('token')
      const user: User = { profile_image: imageURL }
      const { data } = await updateUser({
        variables: { user: user },
        context: { headers: { Authorization: `Bearer ${token}` } },
      })
    } catch (err) {
      alert(err)
    }
  }
  return (
    <>
      <Card mb="20px" alignItems="center">
        <Flex bg={banner} w="100%" h={`${129}px`} />
        <NextAvatar mx="auto" src={avatar} h="87px" w="87px" mt="-43px" mb="15px" />
        {/* Input for uploading a new avatar */}
        {/* <Input type="file" onChange={handleFileChange} mb="10px" /> */}
        {/* Input for pasting the URL of the desired avatar */}
        {/* <InputGroup size="md" mb="10px">
          <Input placeholder="Paste the URL of the avatar" />
          <InputRightElement>
            <Button onClick={() => handleURLChange(document.querySelector('input').value)}>Update from URL</Button>
          </InputRightElement>
        </InputGroup> */}
        <Text
          fontSize="2xl"
          textColor={textColorPrimary}
          fontWeight="700"
          mb="4px"
          textAlign="center"
        >
          {name}
        </Text>
        <Flex direction="column" align="center" justify="center" w="100%" px="14px" mb="20px">
          <Flex justifyContent="center" mb="10px" align="center" mt={'15px'}>
            <Input
              placeholder="Paste the URL of avatar"
              borderColor="black"
              borderWidth="1px"
              mr="1rem" // A bit of margin for spacing between input and button
              maxW="250px" // Limit width to prevent it from taking the whole space
              onChange={(e: any) => setImageURL(e.target.value)}
            />
            <Button
              onClick={handleURLChange}
              borderColor="black"
              borderWidth="1px"
              borderRadius="5px"
            >
              Update from URL
            </Button>
          </Flex>
        </Flex>
      </Card>
    </>
  )
}
