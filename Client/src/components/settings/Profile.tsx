import {
  Flex, Text, useColorModeValue, Input
} from '@chakra-ui/react'
import Card from '@/components/card/Card'
import {NextAvatar} from '@/components/image/Avatar'
import * as React from 'react'
import {UPDATE_USER} from '@/graphql/mutations'
import {useMutation} from '@apollo/client'
import {User, UserModify} from '../interfaces/User'
import {useState} from 'react'

/**
 * A component that allows users to update their account settings.
 * @param props
 * @constructor
 * @returns {JSX.Element} The settings component.
 */

export default function Settings(props: { name: string; avatar: string; banner: string }) {
  const {name, avatar, banner} = props
  const textColorPrimary = useColorModeValue('navy.700', 'white')
  const [imageURL, setImageURL] = useState(avatar);
  const uploadServerURL = process.env.NEXT_PUBLIC_UPLOAD_SERVER_URL as string;
  const [updateUser] = useMutation(UPDATE_USER)

  // For handling the file input change and URL input change
  const handleFileChange = async (event: any) => {
    // Handle the uploaded file here
    console.log(event.target.files)
    const files = event.target.files;
    if (files && files.length === 1) {
      try {
        let formData = new FormData();
        formData.append("file", files[0]);
        const response = await fetch(uploadServerURL, {
          method: "POST", body: formData
        });
        response.json().then(async (data) => {
          console.log(data);
          setImageURL(data.file.id);
          const token = localStorage.getItem('token')
          const user: User = {profile_image: data.file.id}
          await updateUser({
              variables: { user: user },
              context: { headers: { Authorization: `Bearer ${token}` } },
          });
          localStorage.setItem('user', JSON.stringify(user));
        });
      } catch (err) {
        alert(err)
      }
    } else {
      alert("Please upload a file.")
    }
  };

  return (<>
    <Card mb="20px" alignItems="center">
      <Flex bg={banner} w="100%" h={`${129}px`}/>
      <NextAvatar mx="auto" src={imageURL} h="87px" w="87px" mt="-43px" mb="15px"/>
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
              borderColor="black"
              backgroundColor={useColorModeValue('white', 'gray.700')}
              borderRadius={'10px'}
              borderWidth="1px"
              type="file"
              mr="1rem"
              maxW="250px"
              onChange={handleFileChange}
          />
        </Flex>
      </Flex>
    </Card>
  </>)
}
