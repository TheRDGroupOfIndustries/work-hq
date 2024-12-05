import React from 'react'
import { AddProjectFormData } from '../AddProject2'
import NeuroInputField from '@/components/ui/NeuroInputField'
import NeuroTextarea from '@/components/ui/NeuroTextarea'
// import NeuroMultiSelect from '@/components/ui/NeuroMultiSelect'
import UploadFile from '@/components/ui/UploadFile'
import UploadMultipleFiles from '@/components/ui/UploadMultipleFiles'
import NeuroSelect from '@/components/ui/NeuroSelect'
import NeuroCalendar from '@/components/ui/NeuroCalendar'

function Milestone2({formData, handleChange, setFormData}: {formData: AddProjectFormData, handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void, setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>}) {
    
   
  return (
    <div className='w-full grid grid-cols-2 gap-4 gap-y-6'>
    <NeuroInputField 
        type = 'text'
        label='Project Name'
        name='projectDetails.projectName'
        value={formData.projectDetails.projectName}
        onChange={handleChange}
        placeholder='e.g. Project X'
        required
    /> 
    <NeuroCalendar label={'Expected Project Deadline'} name='projectDetails.deadline' date={formData.projectDetails.deadline} setDate={
        (date) => setFormData((prev) => ({...prev, projectDetails: {...prev.projectDetails, deadline: date}})
    )} 
    />
    <NeuroSelect name = 'projectDetails.category' label='Project Type' value={formData.projectDetails.category} onChange={(selected)=>
    setFormData((prev) => ({...prev, projectDetails: {...prev.projectDetails, category: selected}}))
    } options={['Web Development', 'Mobile Development', 'UI/UX Design', 'Digital Marketing', 'Content Writing', 'Others']} placeholder='Select Project Type'/>

    <UploadFile value={formData.projectDetails.scope} title='Upload the Assets & Scope' setFormData={setFormData} valueName='scope'  />
    
    <UploadMultipleFiles values={formData.projectDetails.additionalFiles} title='Upload the Additional Files (optional)' setFormData={setFormData} valueName='additionalFiles' />

   


    <NeuroTextarea label='What kind of project is this?' name='projectDetails.description' value={formData.projectDetails.description} onChange={handleChange} placeholder='e.g. This Project is an ecommerce project.'/>
    <NeuroSelect name = 'projectDetails.maintenanceNeeded' label='Maintenance Needed' value={formData.projectDetails.maintenanceNeeded ? 'Yes':'No'} onChange={(selected)=>
    setFormData((prev) => ({...prev, projectDetails: {...prev.projectDetails, maintenanceNeeded: selected==='Yes'? true: false}}))
    } options={['Yes', 'No']} placeholder='Yes/No'/>


    
</div>
  )
}

export default Milestone2
