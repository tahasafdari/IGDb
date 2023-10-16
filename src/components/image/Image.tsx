'use client'
import {Box, BoxProps} from '@chakra-ui/react';
import NextImage, {ImageProps} from 'next/legacy/image';
import {ComponentProps} from 'react';

type ChakraNextImageProps = Partial<ImageProps> &
    Partial<BoxProps> & {
        nextProps?: Partial<ComponentProps<typeof NextImage>>;
        isProfile?: boolean;
    };
const uploadServerURL = process.env.NEXT_PUBLIC_UPLOAD_SERVER_URL as string;
function parseAssetPrefix(image: string, isProfile?: boolean) {
    if (isProfile) {
        return uploadServerURL + image;
    }
    const alreadyHasHttp = image.match('http');
    if (alreadyHasHttp) return image;

    const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const alreadyHasPrefix = image.match(prefix);

    return alreadyHasPrefix ? image : `${prefix}${image}`;
}

export function Image(props: ChakraNextImageProps) {
    const { src, isProfile, alt, nextProps = {}, ...rest } = props;

    const imageUrl =
        typeof src === 'string' ? src : ((src as any)?.src as string);
    return (
        <Box overflow={'hidden'} position="relative" {...rest}>
            <NextImage
                layout="fill"
                objectFit="fill"
                src={parseAssetPrefix(imageUrl, isProfile)}
                alt={alt}
                {...nextProps}
            />
        </Box>
    );
}