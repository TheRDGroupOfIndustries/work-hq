

import Container from '@/components/reusables/wrapper/Container'
import React from 'react'

export default function StatusCardsHeadline() {
    // Maybe you want to render this component as server side component
    const data = {
        todayStatus: {
          workingEmployees: 0,
          workingHours: 0,
        },
        allProjectStatus: {
          currentFigmaLinks: 0,
          liveDeploymentLinks: 0,
        },
        todayMeetings: {
          meetingsToAttend: 0,
          meetingsCompleted: 0,
        },
      }

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <Container>
        <div className="h-full w-full flex flex-col gap-2">
          <h1 className="text-base font-semibold">Today&apos;s Status</h1>
          <div className="flex flex-col  font-normal">
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Working Employees</span>
              <span className="text-light-gray">{data.todayStatus.workingEmployees}</span>
            </div>
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Working Hours</span>
              <span className="text-light-gray">{data.todayStatus.workingHours} hours</span>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="h-full w-full flex flex-col gap-2">
          <h1 className="text-base font-semibold">All Project Status</h1>
          <div className="flex flex-col  font-normal">
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Current Figma Links</span>
              <span className="text-light-gray">{data.allProjectStatus.currentFigmaLinks}</span>
            </div>
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Live Deployment Links</span>
              <span className="text-light-gray">{data.allProjectStatus.liveDeploymentLinks}</span>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="h-full w-full flex flex-col gap-2">
          <h1 className="text-base font-semibold">Today Meetings</h1>
          <div className="flex flex-col  font-normal">
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Meetings to attend</span>
              <span className="text-light-gray">{data.todayMeetings.meetingsToAttend}</span>
            </div>
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Meetings completed</span>
              <span className="text-light-gray">{data.todayMeetings.meetingsCompleted}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

