export interface ImageSource {
  name: string;
  src: string | { src: string };
  img?: HTMLImageElement;
}

export interface LoadedImage {
  img: HTMLImageElement;
  src: ImageSource;
}

function loadImage(src: string | ImageSource, i: number, onLoad?: (img: HTMLImageElement, i: number) => void): Promise<ImageSource> {
  return new Promise((resolve, reject) => {
    let imageSource: ImageSource;
    if (typeof src === "string") {
      imageSource = {
        name: "image" + i,
        src: src,
      };
    } else {
      imageSource = src;
    }

    let img = new Image();
    imageSource.img = img;
    
    img.crossOrigin = "anonymous";

    img.addEventListener("load", () => {
      if (typeof onLoad === "function") {
        onLoad.call(null, img, i);
      }
      resolve(imageSource);
    });

    img.addEventListener("error", () => {
      console.error("Failed to load image:", imageSource.src);
      reject(new Error(`Failed to load image: ${imageSource.src}`));
    });
    
    const url = typeof imageSource.src === 'string' ? imageSource.src : imageSource.src.src;
    img.src = url;
  })
}

function loadImages(images: (string | ImageSource)[], onLoad?: (img: HTMLImageElement, i: number) => void): Promise<ImageSource[]> {
  return Promise.all(images.map((src, i) => {
    return loadImage(src, i, onLoad);
  }));
}

export default function ImageLoader(images: (string | ImageSource)[], onLoad?: (img: HTMLImageElement, i: number) => void): Promise<Record<string, LoadedImage>> {
  return new Promise((resolve) => {
    loadImages(images, onLoad).then((loadedImages) => {
      let r: Record<string, LoadedImage> = {};
      loadedImages.forEach((curImage) => {
        r[curImage.name] = {
          img: curImage.img!,
          src: curImage, 
        };
      });
      resolve(r);
    });
  })
}
