import { SocialIcon } from "react-social-icons";

export default function OriginTag({ origin }) {
  // const colors = {
  //   facebook: "bg-blue-600",
  //   instagram: "bg-pink-500",
  //   linkedIn: "bg-blue-700",
  //   email: "bg-green-600",
  //   website: "bg-gray-700",
  //   whatsapp: "bg-green-500",
  //   twitter: "bg-blue-400",
  // };

  const arr = {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedIn: "https://www.linkedin.com/",
    email: "https://www.gmail.com/",
    website: "https://www.google.com/",
    whatsapp: "https://www.whatsapp.com/",
    twitter: "https://twitter.com",
  };

  const getUrl = (origin) => {
    return arr[origin] || "https://www.google.com/";
  };

  return (
    <>
      <SocialIcon url={getUrl( origin?.toLowerCase() )} />
    </>
  );
}
