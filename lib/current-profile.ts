import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs/server'

export async function currentProfile() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
