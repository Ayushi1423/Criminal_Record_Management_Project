"use client";

import React, { CSSProperties, useState, useRef, useEffect } from "react";
import Image from "next/image";

import { Flex, Skeleton } from ".";

export interface SmartImageProps extends React.ComponentProps<typeof Flex> {
  aspectRatio?: string;
  height?: number;
  alt?: string;
  isLoading?: boolean;
  objectFit?: CSSProperties["objectFit"];
  enlarge?: boolean;
  src: string;
  unoptimized?: boolean;
  sizes?: string;
  priority?: boolean;
}

const SmartImage: React.FC<SmartImageProps> = ({
  aspectRatio,
  height,
  alt = "",
  isLoading = false,
  objectFit = "cover",
  enlarge = false,
  src,
  unoptimized = false,
  priority,
  sizes = "100vw",
  ...rest
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Format src properly for Next.js Image
  const formatSrc = (imageSrc: string) => {
    // If it's already an absolute URL, return as is
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }
    
    // If it's a relative path without leading slash, add it
    if (!imageSrc.startsWith('/')) {
      return `/${imageSrc}`;
    }
    
    return imageSrc;
  };
  
  // Format the source properly
  const formattedSrc = formatSrc(src);

  const handleClick = () => {
    if (enlarge) {
      setIsEnlarged(!isEnlarged);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEnlarged) {
        setIsEnlarged(false);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (isEnlarged) {
        setIsEnlarged(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isEnlarged]);

  useEffect(() => {
    if (isEnlarged) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEnlarged]);

  const calculateTransform = () => {
    if (!imageRef.current) return {};

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = window.innerWidth / rect.width;
    const scaleY = window.innerHeight / rect.height;
    const scale = Math.min(scaleX, scaleY) * 0.9;

    const translateX = (window.innerWidth - rect.width) / 2 - rect.left;
    const translateY = (window.innerHeight - rect.height) / 2 - rect.top;

    return {
      transform: isEnlarged
        ? `translate(${translateX}px, ${translateY}px) scale(${scale})`
        : "translate(0, 0) scale(1)",
      transition: "all 0.3s ease-in-out",
      zIndex: isEnlarged ? 10 : undefined,
    };
  };

  const isYouTubeVideo = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match
      ? `https://www.youtube.com/embed/${match[1]}?controls=0&rel=0&modestbranding=1`
      : "";
  };

  const isVideo = formattedSrc?.endsWith(".mp4");
  const isYouTube = isYouTubeVideo(formattedSrc);

  return (
    <>
      <Flex
        ref={imageRef}
        fillWidth
        overflow="hidden"
        zIndex={0}
        cursor={enlarge ? "interactive" : ""}
        style={{
          outline: "none",
          isolation: "isolate",
          height: aspectRatio ? "" : height ? `${height}rem` : "100%",
          aspectRatio,
          borderRadius: isEnlarged ? "0" : undefined,
          ...calculateTransform(),
        }}
        onClick={handleClick}
        {...rest}
      >
        {isLoading && <Skeleton shape="block" />}
        {!isLoading && isVideo && (
          <video
            src={formattedSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: objectFit,
            }}
          />
        )}
        {!isLoading && isYouTube && (
          <iframe
            width="100%"
            height="100%"
            src={getYouTubeEmbedUrl(formattedSrc)}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              objectFit: objectFit,
            }}
          />
        )}
        {!isLoading && !isVideo && !isYouTube && (
          <Image
            src={formattedSrc}
            alt={alt}
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            fill
            style={{
              objectFit: objectFit,
            }}
          />
        )}
      </Flex>

      {isEnlarged && enlarge && (
        <Flex
          horizontal="center"
          vertical="center"
          position="fixed"
          background="overlay"
          pointerEvents="none"
          onClick={handleClick}
          top="0"
          left="0"
          zIndex={isEnlarged ? 9 : undefined}
          opacity={isEnlarged ? 100 : 0}
          cursor="interactive"
          transition="macro-medium"
          style={{
            backdropFilter: isEnlarged ? "var(--backdrop-filter)" : "0px",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Flex
            style={{
              height: "100vh",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            {isVideo ? (
              <video
                src={formattedSrc}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "90vw",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Image
                src={formattedSrc}
                alt={alt}
                fill
                sizes="90vw"
                unoptimized={unoptimized}
                style={{
                  objectFit: "contain",
                }}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};

SmartImage.displayName = "SmartImage";

export { SmartImage };
