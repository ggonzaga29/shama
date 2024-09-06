'use server';

import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export async function getUserRequestMetadata() {
  const headersList = headers();
  const userAgentStructure = { headers: headersList };
  const { isBot, browser, device, engine, os, cpu } =
    userAgent(userAgentStructure);

  return {
    ipAddress:
      headersList.get('x-forwarded-for') || headersList.get('x-real-ip'),
    userAgent: headersList.get('user-agent'),
    isBot,
    browser,
    device,
    engine,
    os,
    cpu,
  };
}
