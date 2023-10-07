'use client';

// Chakra imports
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Info from '@/components/settings/Info';

import Profile from '@/components/settings/Profile';

import avatar1 from '../../../public/assets/avatars/avatar1.png';

export default function Settings() {
  return (
    <Box mt={{ base: '70px', md: '0px', xl: '0px' }}>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing="20px" mb="20px">
        {/* Column Left */}
        <Flex direction="column">
          <Profile
            name="Adela Parkson"
            avatar={avatar1}
            banner={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
          />
          <Info />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
