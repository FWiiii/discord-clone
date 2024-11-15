import { ModeToggle } from '@/components/mode-toggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import NavigationAction from './navigation-action'
import NavigationItem from './navigation-item'

async function NavigationSidebar() {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: { profileId: profile.id },
      },
    },
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="w-10 h-[2px] bg-zinc-300 dark:bg-zinc-700 mx-auto rounded-md" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(server => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-col items-center gap-y-4 pb-3 mt-auto ">
        <ModeToggle />
        <UserButton
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            },
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar
