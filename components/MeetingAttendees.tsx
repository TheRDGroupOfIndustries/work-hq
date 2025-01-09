'use client'

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { X } from 'lucide-react'
import { CustomUser } from '@/lib/types'

interface MeetingAttendeesProps {
  meetingId: string
  attendees: string[]
  onUpdateAttendees: (newAttendees: string[]) => void
  currentUserId: string
  userRole: string
}

export function MeetingAttendees({
  meetingId,
  attendees,
  onUpdateAttendees,
  currentUserId,
  userRole
}: MeetingAttendeesProps) {
  const [users, setUsers] = useState<CustomUser[]>([])
  const [attendeeUsers, setAttendeeUsers] = useState<CustomUser[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const canModify = ['ceo', 'manager'].includes(userRole)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data)

        const currentAttendees = data.filter((user: CustomUser) =>
          attendees.includes(user._id)
        )
        setAttendeeUsers(currentAttendees)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [attendees])

  const handleAddAttendee = async (userId: string) => {
    if (!attendees.includes(userId)) {
      const newAttendees = [...attendees, userId]
      try {
        const response = await fetch(`/api/meeting/update/${meetingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ attendees: newAttendees }),
        })

        if (!response.ok) throw new Error('Failed to update attendees')
        onUpdateAttendees(newAttendees)
      } catch (error) {
        console.error('Error updating attendees:', error)
      }
    }
  }

  const handleRemoveAttendee = async (userId: string) => {
    const newAttendees = attendees.filter(id => id !== userId)
    try {
      const response = await fetch(`/api/meeting/update/${meetingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendees: newAttendees }),
      })

      if (!response.ok) throw new Error('Failed to update attendees')
      onUpdateAttendees(newAttendees)
    } catch (error) {
      console.error('Error updating attendees:', error)
    }
  }

  const availableUsers = users.filter(user =>
    !attendees.includes(user._id) && user._id !== currentUserId
  )

  const filteredUsers = availableUsers.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {attendeeUsers.map((attendee) => (
          <Badge
            key={attendee._id}
            variant="secondary"
            className="pl-2 pr-1 py-1 flex items-center gap-1 bg-blue-50"
          >
            {attendee.firstName} {attendee.lastName}
            {canModify && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-blue-100"
                onClick={() => handleRemoveAttendee(attendee._id)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </Badge>
        ))}
      </div>
      {canModify && availableUsers.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">Add Attendee</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="p-2">
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-2"
              />
            </div>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <DropdownMenuItem
                  key={user._id}
                  onClick={() => handleAddAttendee(user._id)}
                >
                  {user.firstName} {user.lastName}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No users found</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}