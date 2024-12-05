import React from 'react'
import { AddProjectFormData } from '../AddProject2'
import NeuroInputField from '@/components/ui/NeuroInputField'
import UploadImage from '@/components/ui/UploadImage'
import NeuroTextarea from '@/components/ui/NeuroTextarea'
import NeuroMultiSelect from '@/components/ui/NeuroMultiSelect'
import UploadFile from '@/components/ui/UploadFile'
import NeuroSelect from '@/components/ui/NeuroSelect'
import UploadMultipleFiles from '@/components/ui/UploadMultipleFiles'
import NeuroCalendar from '@/components/ui/NeuroCalendar'
import MilestoneBudget from '@/components/ui/MilestoneBudget'

function Milestone3({formData, handleChange, setFormData}: {formData: AddProjectFormData, handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void, setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>}) {
   
  return (
    <div className='w-full grid grid-cols-2 gap-4'>
        <label className='text-lg font-semibold col-span-2'>Company Details</label>
        
        <NeuroInputField 
        disabled
        type = 'text'
        label='Your Company Name'
        name='companyDetails.officialName'
        value={formData.companyDetails.officialName}
        onChange={handleChange}
        placeholder='e.g. Google, Microsoft'
        required
    />
        <NeuroInputField 
        disabled
        type = 'text'
        label='Your Company Link (if any)'
        name='companyDetails.companyLink'
        value={formData.companyDetails.companyLink || ''}
        onChange={handleChange}
        placeholder='www.company.com'
        required
    />
        <UploadImage value={
            formData.companyDetails.logo ? formData.companyDetails.logo : ''
        } disabled title='Upload Your Company Logo' setFormData={setFormData}
        valueName='logo'
        />
        <NeuroTextarea disabled label='Tell Us About Your Company' name='companyDetails.about' value={formData.companyDetails.about} onChange={handleChange} placeholder='e.g. My company is a big company'/>
        <NeuroMultiSelect
        disabled
        name='companyDetails.workingLocations'
        options={['Tokyo', 'New York', 'London', 'Paris', 'Berlin']}
        selectedOptions={formData.companyDetails.workingLocations}
        onChange={(selected) => setFormData((prev) => ({...prev, companyDetails: {...prev.companyDetails, workingLocations: selected}}))}
        placeholder='Select Working Locations'
        label='Working Locations'
    />
        <NeuroInputField 
        disabled
        type = 'text'
        label='Company Contact No.'
        name='companyDetails.contactNo'
        value={formData.companyDetails.contactNo || ''}
        onChange={handleChange}
        placeholder='e.g. 1234567890, 0987654321'
        required
    />
     <NeuroTextarea disabled label='Company Address Detail' name='companyDetails.address' value={formData.companyDetails.address} onChange={handleChange} placeholder='e.g. Near Plot No. 2, Tokyo, Japan'/> 
      <NeuroInputField 
        disabled
        type = 'text'
        label='Company Size'
        name='companyDetails.size'
        value={formData.companyDetails.size || ''}
        onChange={handleChange}
        placeholder='e.g. 100-200'
        required
    />

    <label className='text-lg font-semibold col-span-2'>Project Details</label>
    <NeuroInputField 
    disabled
        type = 'text'
        label='Project Name'
        name='projectDetails.projectName'
        value={formData.projectDetails.projectName}
        onChange={handleChange}
        placeholder='e.g. Project X'
        required
    /> 
    <NeuroSelect disabled name = 'projectDetails.category' label='Project Type' value={formData.projectDetails.category} onChange={(selected)=>
    setFormData((prev) => ({...prev, projectDetails: {...prev.projectDetails, category: selected}}))
    } options={['Web Development', 'Mobile Development', 'UI/UX Design', 'Digital Marketing', 'Content Writing', 'Others']} placeholder='Select Project Type'/>

    <NeuroCalendar disabledCalendar label={'Expected Project Deadline'} name='projectDetails.deadline' date={formData.projectDetails.deadline} setDate={
        (date) => setFormData((prev) => ({...prev, projectDetails: {...prev.projectDetails, deadline: date}})
    )} 
    />
        

    {/* <div className='flex flex-col gap-6'> */}
      <NeuroSelect disabled name = 'projectDetails.maintenanceNeeded' label='Maintenance Needed' value={formData.projectDetails.maintenanceNeeded ? 'Yes':'No'} onChange={(selected)=>
      setFormData((prev) => ({...prev, projectDetails: {...prev.projectDetails, maintenanceNeeded: selected==='Yes'? true: false}}))
      } options={['Yes', 'No']} placeholder='Yes/No'/>
      
      <UploadMultipleFiles disabled values={formData.projectDetails.additionalFiles} title='Upload the Additional Files (optional)' setFormData={setFormData} valueName='additionalFiles' />
    {/* </div> */}

    <NeuroTextarea disabled label='What kind of project is this?' name='projectDetails.description' value={formData.projectDetails.description} onChange={handleChange} placeholder='e.g. This Project is an ecommerce project.'/>
    <UploadFile value={formData.projectDetails.scope} title='Upload the Assets & Scope' setFormData={setFormData} valueName='scope' disabled  />
    <MilestoneBudget disabled value={formData.projectDetails.budget} setFormData={setFormData} />
</div>
  )
}

export default Milestone3
