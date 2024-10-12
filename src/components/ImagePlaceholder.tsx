const ImagePlaceholder = () => {
  const randomHeight = Math.floor(Math.random() * 400) + 200;
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-200`}
      style={{ paddingBottom: `${randomHeight}px` }}
    >
      <div className="absolute inset-0 animate-pulse">
        <div className="h-full w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
      </div>
    </div>
  );
};

export default ImagePlaceholder;
