"use client"

import React from 'react'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    // Add null checks for 'call' and 'call.state'
    const isMeetingOwner =
      localParticipant &&
      call && // Check if 'call' is defined
      call.state && // Check if 'call.state' is defined
      call.state.createdBy &&
      localParticipant.userId === call.state.createdBy.id;

    // Return null if not the meeting owner or if 'call' is undefined
    if (!isMeetingOwner) return null;

    return (
        <Button
            onClick={async () => {
                // Ensure 'call' exists before attempting to end it
                if (call) {
                    await call.endCall();
                    router.push('/');
                }
            }}
            className="bg-red-500"
        >
            End call for everyone
        </Button>
    )
}

export default EndCallButton;
