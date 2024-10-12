import Image from "next/image";
import { UnsplashImage } from "@/app/page";
import { useEffect, useState } from "react";
import heartIcon from "@/assets/heart-icon.svg";
import downloadIcon from "@/assets/download.svg";

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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 md:p-8 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-h-[90vh] max-w-5xl overflow-hidden rounded-lg transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Image
            src={image.urls.regular}
            alt={image.alt_description}
            className="h-auto max-h-[90vh] w-full object-contain"
            width={image.width}
            height={image.height}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-6 text-gray-200 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={image.user.profile_image.small}
                  alt={image.user.name}
                  width={48}
                  height={48}
                  className="mr-3 rounded-full"
                />
                <div>
                  <span className="text-xl font-semibold">
                    {image.user.name}
                  </span>
                  <div className="mt-1 flex items-center">
                    <Image
                      src={heartIcon}
                      alt="Likes"
                      width={20}
                      height={20}
                      className="mr-1"
                    />
                    <span className="text-sm text-gray-300">
                      {image.likes} likes
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={image.links.download}
                target="_blank"
                className="rounded-full bg-white/40 p-3 text-white transition-colors duration-300 hover:bg-white/60"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={downloadIcon}
                  alt="Download"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <p className="leading-relaxed text-gray-300">
              {image.description || image.alt_description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
