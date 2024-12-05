import React, { useEffect } from 'react'
import Milestone from '../project/components/Milestone'
import { BsFillFlagFill } from 'react-icons/bs'
import NeuroInputField from './NeuroInputField'
import { AddProjectFormData } from '../project/AddProject2';
import { Button } from './button';
export interface budgetType {
  min: number;
  max: number;
}

function MilestoneBudget({value, setFormData, disabled}: {
  value: budgetType[];
  setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>;
  disabled?: boolean;
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
      <div className=''>
        <label htmlFor='name' className='block text-sm font-medium mb-0'>
              Milestone Budget
        </label>
        <span className='text-sm text-gray-500'>Tell us in how many Phases would u like to break down the project</span>
        <div className='w-full flex flex-row  mt-2 justify-between items-center px-10'>
          {
           value.map((_, index) => (
            <Milestone key={index} num={index + 1} title="" description="" isActiveNo={index+1} containerStyle='w-fit flex flex-center scale-[0.8]' />
           ))
          }
          <BsFillFlagFill size={35} color="#FF3B30" />
        </div>
        <div className='flex flex-row gap-4 items-end '>
        <NeuroInputField disabled type='number' name='phases' containerStyle='w-full' value={value.length} onChange={(e)=> {
          
          if (isNaN(parseInt(e.target.value))) {
            return;
          } 
          setPhases(parseInt(e.target.value));
        }} label='No. Of Phases' placeholder='Enter Budget' />
        {!disabled && <Button size={'lg'} type='button' className='py-4' onClick={() => {
          //add new phase
          setFormData((prev) => ({
            ...prev,
            projectDetails: {
              ...prev.projectDetails,
              budget: [...prev.projectDetails.budget, { min: 0, max: 0 }],
            },
          }));
        } 
        } >Add Phase</Button>
      }
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {value.map((phase, index) => (
          <div key={index}>
            <div className='flex flex-row items-center justify-between'>
            <label htmlFor='name' className='block text-sm font-medium mb-0'>
                Phase {index + 1} Budget Range
            </label>
           {!disabled && <Button type='button' size='sm' className='text-red-500 bg-white border border-red-500' onClick={() => {
              setFormData((prev) => ({
                ...prev,
                projectDetails: {
                  ...prev.projectDetails,
                  budget: prev.projectDetails.budget.filter((_, i) => i !== index),
                },
              }));
            }} >Remove</Button>
          }
            </div>
            <div className='flex flex-row flex-center gap-3 w-full'>
              <NeuroInputField disabled ={disabled} type='number' name={`projectDetails.budget[${index}].min`} containerStyle={'w-full'} value={phase.min} onChange={(e) => {
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
              }} placeholder='Enter Min Budget' /> -
              <NeuroInputField disabled = {disabled} type='number' name={`projectDetails.budget[${index}].max`} containerStyle='w-full' value={phase.max} onChange={(e) => {
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
              }} placeholder='Enter Max Budget' />
            </div>
          </div>
        ))}
          
      </div>
    </div>
  )
}

export default MilestoneBudget
