"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";
import { ImageModal } from "@/components/ImageModal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import heartIcon from "@/assets/heart-icon.svg";
import downloadIcon from "@/assets/download.svg";

export interface UnsplashImage {
  id: string;
  slug: string;
  urls: {
    regular: string;
  };
  links: {
    download: string;
  };
  description: string;
  alt_description: string;
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
  width: number;
  height: number;
  likes: number;
}

const ImageGallery = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );
  const loader = useRef(null);

  const perPage = 25;

  const fetchImages = useCallback(async () => {
    setLoading(true);
    // dummy loading
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch images");
      const data: UnsplashImage[] = await response.json();
      setImages((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchImages();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [fetchImages, loading]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Image Gallery
      </h1>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="16px">
          {images?.map((image) => (
            <div
              key={image.id}
              className="group relative cursor-zoom-in overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.urls.regular}
                alt={image.alt_description}
                className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                width={image.width}
                height={image.height}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={image.user.profile_image.small}
                      alt={image.user.name}
                      width={32}
                      height={32}
                      className="mr-2 rounded-full"
                    />
                    <span className="text-sm text-gray-300 transition-colors duration-300 hover:text-white">
                      {image.user.name}
                    </span>
                  </div>
                  <a
                    href={image.links.download}
                    className="rounded-full bg-white p-2 text-gray-300 opacity-75 transition-opacity duration-300 hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={downloadIcon}
                      alt="Download"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              </div>
              <div className="absolute right-0 top-0 m-2 flex items-center rounded-full bg-white bg-opacity-75 px-2 py-1 text-sm text-gray-800 opacity-0 transition-opacity duration-300 hover:bg-opacity-100 group-hover:opacity-100">
                <Image
                  src={heartIcon}
                  alt="Likes"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <span>{image.likes}</span>
              </div>
            </div>
          ))}
          {loading &&
            Array.from({ length: perPage }).map((_, index) => (
              <ImagePlaceholder key={index} />
            ))}
        </Masonry>
      </ResponsiveMasonry>
      <div ref={loader} className="mt-4 h-10" />
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ImageGallery;
