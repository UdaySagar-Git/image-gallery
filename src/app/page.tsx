"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";
import { ImageModal } from "@/components/ImageModal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

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
              className="cursor-pointer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 transition-transform hover:scale-105"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.urls.regular}
                alt={image.alt_description}
                className="rounded-lg shadow-md"
                width={image.width}
                height={image.height}
              />
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
