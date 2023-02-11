"use client"

import {Stack, Link, Heading, Flex, Box, Image, Text} from "@chakra-ui/react";

import type {Store} from "../types";

type Props = {
  store: Store;
};

export default function StoreHeader({store}: Props) {
  return (
    <Stack spacing={4}>
      <Image borderRadius="lg" height="100%" maxHeight={64} objectFit="cover" src={store.banner} />
      <Stack alignItems="center" direction={{base: "column", sm: "row"}} spacing={{base: 3, sm: 6}}>
        <Box
          backgroundColor="white"
          borderRadius={9999}
          marginTop={{base: -12, sm: -16}}
          minWidth={{base: 24, sm: 32}}
          padding={1}
        >
          <Image
            borderRadius={9999}
            height={{base: 24, sm: 32}}
            src={store.logo}
            width={{base: 24, sm: 32}}
          />
        </Box>
        <Stack
          alignItems={{base: "center", sm: "flex-start"}}
          spacing={3}
          textAlign={{base: "center", sm: "left"}}
        >
          <Stack spacing={0}>
            <Heading>{store.title}</Heading>
            <Text color="gray.500" fontWeight="500">
              {store.subtitle}
            </Text>
          </Stack>
          <Stack direction="row">
            {store.instagram && (
              <Link isExternal href={store.instagram}>
                <Flex
                  alignItems="center"
                  backgroundColor="primary.500"
                  borderRadius={9999}
                  color="white"
                  height={10}
                  justifyContent="center"
                  width={10}
                >
                  <Image src={`https://icongr.am/fontawesome/instagram.svg?size=24&color=ffffff`} />
                </Flex>
              </Link>
            )}
            {store.whatsapp && (
              <Link isExternal href={store.whatsapp}>
                <Flex
                  alignItems="center"
                  backgroundColor="primary.500"
                  borderRadius={9999}
                  color="white"
                  height={10}
                  justifyContent="center"
                  width={10}
                >
                  <Image src={`https://icongr.am/fontawesome/instagram.svg?size=24&color=ffffff`} />
                </Flex>
              </Link>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
