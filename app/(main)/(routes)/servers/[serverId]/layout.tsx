import ServerSidebar from '@/components/server/server-sidebar'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) {
  const profile = await currentProfile()
  const { redirectToSignIn } = await auth()

  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: { profileId: profile.id },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full fixed w-60 z-20 flex-col inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="md:pl-60 h-full">{children}</main>
    </div>
  )
}

export default ServerIdLayout
