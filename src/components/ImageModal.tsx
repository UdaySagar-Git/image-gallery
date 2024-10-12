import Image from "next/image";
import { UnsplashImage } from "@/app/page";

interface ImageModalProps {
  image: UnsplashImage;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-h-full max-w-full overflow-hidden rounded-lg bg-white"
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
