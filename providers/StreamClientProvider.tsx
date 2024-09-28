'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import Loader from '@/components/Loader';
import { tokenProvider } from '@/actions/stream.actions';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;




// "use client";

// import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
// import { ReactNode, UseState } from "react";
// import { tokenProvider } from "@/actions/stream.actions";

// const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
//   const [videoClient, setVideoClient] = useState<StreamVideoClient>();
//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     if (!isLoaded || !user) return;
//     if (!apiKey) throw new Error("Stream API key missing");

//     const client = new StremVideoClient({
//       apiKey,
//       user: {
//         id: user?.id,
//         name: user?.username || user?.id,
//         image: user?.imageUrl,
//       },
//       tokenProvider,
//     });

//     setVideoClient(client);
//   }, [user, isLoaded]);

//   if (!videoClient) return <Loader />;

//   return <StreamVideo client={videoClient}>{children}</StreamVideo>;
// };

// export default StreamVideoProvider;
