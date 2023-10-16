import React, { useEffect, useState } from "react";
import axios from "axiod";

const DEFAULT_IMAGE = "/images/avatar_icon_green.png";

function ImageWithFallback({ src, defaultSrc, alt, ...props }) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    if (!src) {
      setImageSrc(defaultSrc);
    } else {
      axios.get(src, { responseType: "arraybuffer" })
        .then((response) => {
          // If the image loads successfully, set the source to the response data
          const blob = new Blob([response.data], { type: "image/jpeg" });
          const objectURL = URL.createObjectURL(blob);
          setImageSrc(objectURL);
        })
        .catch(() => {
          // If there is an error, set the source to the default image
          setImageSrc(defaultSrc);
        });
    }
  }, [src, defaultSrc]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      {...props}
    />
  );
}

export default ImageWithFallback;
