'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'
import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import axios from 'axios'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

export function InviteModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const origin = useOrigin()

  const isModalOpen = type === 'invite' && isOpen
  const { server } = data
  const inviteLink = `${origin}/invite/${server?.inviteCode}`

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      )
      onOpen('invite', { server: response.data })
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center gap-x-2 mt-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteLink}
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copied
                ? <Check className="w-4 h-4" />
                : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            onClick={onNew}
            disabled={isLoading}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
