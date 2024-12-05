import React, { useEffect } from 'react'
import Milestone from '../project/components/Milestone'
import { BsFillFlagFill } from 'react-icons/bs'
import NeuroInputField from './NeuroInputField'
import { AddProjectFormData } from '../project/AddProject2';
export interface budgetType {
  min: number;
  max: number;
}

function MilestoneBudget({value, setFormData}: {
  value: budgetType[];
  setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>;
}) {
    const [phases, setPhases] = React.useState<number>(0);

    useEffect(() => {
        if (phases > 0) {
            setFormData((prev) => ({
                ...prev,
                projectDetails: {
                    ...prev.projectDetails,
                    budget: Array.from({ length: phases }, () => ({ min: 0, max: 0 })),
                },
            }));
        }
    }, [phases, setFormData]);
  return (
    <div className='w-full col-span-2 rounded-md bg-transparent shadow-neuro-3 p-4 grid gap-4 grid-cols-2'>
      <div className='bg-slate-300'>
        <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-0'>
              Milestone Budget
        </label>
        <span className='text-sm text-gray-500'>Tell us in how many Phases would u like to break down the project</span>
        <div className='w-full flex flex-row bg-slate-400 mt-2 justify-between items-center'>
          <Milestone num={1} title="" description="" isActiveNo={3} containerStyle='w-fit flex flex-center scale-[0.8]' />
          <Milestone num={2} title="" description="" isActiveNo={3} containerStyle='w-fit flex flex-center scale-[0.8]' />
          <Milestone num={3} title="" description="" isActiveNo={3} containerStyle='w-fit flex flex-center scale-[0.8]' />
          <BsFillFlagFill size={35} color="#FF3B30" />
        </div>
        <NeuroInputField type='number' name='phases' value={value.length} onChange={(e)=> {
          
          if (isNaN(parseInt(e.target.value))) {
            return;
          } 
          setPhases(parseInt(e.target.value));
        }} label='No. Of Phases' placeholder='Enter Budget' />
      </div>
      <div>
        {value.map((phase, index) => (
          <div key={index} className='flex flex-row gap-4'>
            <NeuroInputField type='number' name={`projectDetails.budget[${index}].min`} value={phase.min} onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                projectDetails: {
                  ...prev.projectDetails,
                  budget: prev.projectDetails.budget.map((budget, i) => {
                    if (i === index) {
                      return {
                        ...budget,
                        min: parseInt(e.target.value),
                      };
                    }
                    return budget;
                  }),
                },
              }));
            }} label={`Phase ${index + 1} Min Budget`} placeholder='Enter Min Budget' />
            <NeuroInputField type='number' name={`projectDetails.budget[${index}].max`} value={phase.max} onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                projectDetails: {
                  ...prev.projectDetails,
                  budget: prev.projectDetails.budget.map((budget, i) => {
                    if (i === index) {
                      return {
                        ...budget,
                        max: parseInt(e.target.value),
                      };
                    }
                    return budget;
                  }),
                },
              }));
            }} label={`Phase ${index + 1} Max Budget`} placeholder='Enter Max Budget' />
          </div>
        ))}
          
      </div>
    </div>
  )
}

export default MilestoneBudget
