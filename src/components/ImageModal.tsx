import Image from "next/image";
import React from "react";
import { UnsplashImage } from "@/app/page";

interface ImageModalProps {
  image: UnsplashImage;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <Image
        src={image.urls.regular}
        alt={image.alt_description}
        className="max-h-[80vh] max-w-4xl rounded-lg object-contain"
        width={image.width}
        height={image.height}
      />
    </div>
  );
}
