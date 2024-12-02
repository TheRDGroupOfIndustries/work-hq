"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const CLIENT_ID = 'Rtq2awbhLAs6cYVUZmOPgF1L'; // Replace with your WakaTime client ID
const REDIRECT_URI = 'http://localhost:3000/api/auth/wakatime/callback'; // Replace with your redirect URI

const connectToWakaTime = () => {
  const url = `https://wakatime.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  console.log('Redirecting to:', url);
  window.location.href = url;
};

function WakaTimeAuthPage() {
  const {data: session} = useSession();
  useEffect (() => {
    if (session) {
      console.log('User:', session.user);
    }
  }, [session]);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Connect to WakaTime</h1>
      <p>You will now be redirected to WakaTime to connect your account.</p>
      <Button type="button" onClick={connectToWakaTime}>Connect to WakaTime</Button>
    </div>
  );
}

export default WakaTimeAuthPage;