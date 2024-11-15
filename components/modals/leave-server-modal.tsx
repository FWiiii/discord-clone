'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'

export function LeaveServerModal() {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const isModalOpen = type === 'leaveServer' && isOpen
  const { server } = data
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/servers/${server?.id}/leave`)
      onClose()
      router.refresh()
      router.push('/')
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
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave
            {' '}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-center w-full">
            <Button variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" disabled={isLoading} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
