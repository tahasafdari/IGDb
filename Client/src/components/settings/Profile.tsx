import { Flex, Select, Text, useColorModeValue, Input, InputGroup, Button, InputRightElement } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import { NextAvatar } from '@/components/image/Avatar';
import { StaticImageData } from 'next/image';

export default function Settings(props: { name: string; avatar: StaticImageData; banner: string }) {
  const { name, avatar, banner } = props;
  const textColorPrimary = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.500';

  // For handling the file input change and URL input change
  const handleFileChange = (event) => {
    // Handle the uploaded file here
    console.log(event.target.files);
  }

  const handleURLChange = (url) => {
    // Handle the URL input here
    console.log(url);
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

        <Text fontSize="2xl" textColor={textColorPrimary} fontWeight="700" mb="4px" textAlign="center">
          {name}
        </Text>

        <Flex direction="column" align="center" justify="center" w="100%" px="14px" mb="20px">
          <Text color={textColorSecondary} fontSize="sm" fontWeight="500" lineHeight="100%" textAlign="center">
            Account type:
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="500" lineHeight="100%" textAlign="center">
            User
          </Text>
           <InputGroup mb="10px" >
          <Input placeholder="Paste the URL of the avatar"  />
          {/* <InputRightElement>
            <Button onClick={() => handleURLChange(document.querySelector('input').value)}>Update from URL</Button>
          </InputRightElement> */}
        </InputGroup> 

        </Flex>
      </Card>
    </>
  )
}
