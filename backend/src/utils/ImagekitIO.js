// ---- where user photos are stored ----
// Images are NOT kept in our database. We send them to
// ImageKit and save only the link they give back.
import ImageKit from "imagekit";
import dotenv from "dotenv";

// Load the keys from .env before an image upload is attempted.
dotenv.config({ path: ".env" });

const createImageKit = () => {
  const publicKey = process.env.IMAGEKIT_PUBLICKEY;
  const privateKey = process.env.IMAGEKIT_PRIVATEKEY;
  const urlEndpoint = process.env.IMAGEKIT_URLENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error(
      "ImageKit upload requires IMAGEKIT_PUBLICKEY, IMAGEKIT_PRIVATEKEY, and IMAGEKIT_URLENDPOINT."
    );
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });
};

const imagekit = {
  upload: (...args) => createImageKit().upload(...args),
};

// authController and propertyController use this as imagekit.upload(...)
export default imagekit;

