import Image from "next/image";
import { UnsplashImage } from "@/app/page";
import { useEffect, useState } from "react";

interface ImageModalProps {
  image: UnsplashImage;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 transition-opacity duration-300 md:p-8 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-h-full max-w-full overflow-hidden rounded-lg bg-white transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.urls.regular}
          alt={image.alt_description}
          className="max-h-[80vh] w-auto object-contain"
          width={image.width}
          height={image.height}
        />
      </div>
    </div>
  );
}
