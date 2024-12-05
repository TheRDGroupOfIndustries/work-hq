import React from 'react'
import { AddProjectFormData } from '../AddProject2'
import NeuroInputField from '@/components/ui/NeuroInputField'
import UploadImage from '@/components/ui/UploadImage'
import NeuroTextarea from '@/components/ui/NeuroTextarea'
import NeuroMultiSelect from '@/components/ui/NeuroMultiSelect'

function Milestone3({formData, handleChange, setFormData}: {formData: AddProjectFormData, handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void, setFormData: React.Dispatch<React.SetStateAction<AddProjectFormData>>}) {
   
  return (
    <div className='w-full grid grid-cols-2 gap-4'>
    <NeuroInputField 
        type = 'text'
        label='Project Name'
        name='projectDetails.projectName'
        value={formData.projectDetails.projectName}
        onChange={handleChange}
        placeholder='e.g. Project X'
        required
    />
    <UploadImage title='Upload Additional Files (Optional)' setFormData={setFormData} valueName={'projectDetails.additionalFiles'} />
    <UploadImage title='Upload the Assets & Scopes' setFormData={setFormData} valueName={'projectDetails.scope'} />
    <NeuroTextarea label='Tell Us About Your Company' name='companyDetails.about' value={formData.companyDetails.about} onChange={handleChange} placeholder='e.g. My company is a big company'/>
    <NeuroTextarea label='Company Address Detail' name='companyDetails.address' value={formData.companyDetails.address} onChange={handleChange} placeholder='e.g. Near Plot No. 2, Tokyo, Japan'/>
    <NeuroInputField 
        type = 'text'
        label='Your Company Link (if any)'
        name='companyDetails.companyLink'
        value={formData.companyDetails.companyLink || ''}
        onChange={handleChange}
        placeholder='www.company.com'
        required
    />
    <NeuroInputField 
        type = 'text'
        label='Company Contact No.'
        name='companyDetails.contactNo'
        value={formData.companyDetails.contactNo || ''}
        onChange={handleChange}
        placeholder='e.g. 1234567890, 0987654321'
        required
    />
    <NeuroInputField 
        type = 'text'
        label='Company Size'
        name='companyDetails.size'
        value={formData.companyDetails.size || ''}
        onChange={handleChange}
        placeholder='e.g. 100-200'
        required
    />
   <NeuroMultiSelect 
        name='companyDetails.workingLocations'
        options={['Tokyo', 'New York', 'London', 'Paris', 'Berlin']}
        selectedOptions={formData.companyDetails.workingLocations}
        onChange={(selected) => setFormData((prev) => ({...prev, companyDetails: {...prev.companyDetails, workingLocations: selected}}))}
        placeholder='Select Working Locations'
        label='Working Locations'
    />
</div>
  )
}

export default Milestone3
