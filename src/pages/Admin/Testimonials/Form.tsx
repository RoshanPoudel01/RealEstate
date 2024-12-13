import { Stack } from '@chakra-ui/react'
import { ReactDropzone, TextInput } from '@realState/components/Form'
import { ModalForm } from '@realState/components/Form/Modal'
import StatusRadio from '@realState/components/Form/StatusRadio'
import useGetErrors from '@realState/hooks/useGetErrors'
import { toFormData } from '@realState/services/service-axios'
import { useCreateTestimonial, useFetchTestimonialById, useUpdateTestimonial } from '@realState/services/service-testimonial'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface TestimonialFormProps {
    id?: number;
    
}

const TestimonialForm: FC<TestimonialFormProps> = (
    {id  }
) => {
    const defaultValues = {
        name: '',
        message: '',
        image: '',
        is_active: "1" 
    }

    const {control, handleSubmit, reset} = useForm({
        defaultValues
    })

    const [open, setOpen] = useState(false)

   

    const {mutateAsync: createTestimonial, isPending: isAdding, isError: isAddError, error: addError} = useCreateTestimonial()
    const {mutateAsync: updateTestimonial, isPending: isUpdating, isError: isUpdateError, error: updateError} = useUpdateTestimonial()

    const [backendError, setBackendError] = useState<Record<string, string[]>>({})

    const {data: testimonial, isPending, isFetching} = useFetchTestimonialById({id:id!, enabled: open})

    console.log({testimonial})

    useEffect(() => {
        if(testimonial?.data) {
            reset({
                name: testimonial.data.name ?? "",
                message: testimonial.data.message ?? "",
                image: testimonial.data.image ?? "",
                is_active: testimonial.data.is_active.toString()
            })
        }
    }, [testimonial, id])

    useEffect(() => {
        if(isAddError) {
            setBackendError(useGetErrors(addError))
        }
        if(isUpdateError) {
            setBackendError(useGetErrors(updateError))
        }
    }, [isAddError, isUpdateError])

    const onSubmit = async(data: any) => {
        const formData = toFormData(data)
        if(id) {
          const response =  await updateTestimonial({id, data: formData})
          if(response.data?.status) {
            reset(defaultValues)
                setOpen(false)
          }
        } else {
            const response = await createTestimonial({data: formData})
            if(response.data?.status) {
                reset(defaultValues)
                    setOpen(false)

              }
        }
    }


  return (
    <ModalForm
    onOpenChange={setOpen}
    open={open}
    formId='testimonial-form'
    heading={!!id ? 'Edit Testimonial' : 'Add Testimonial'}
    isSubmitting={isAdding || isUpdating}
    isFetching={isPending || isFetching}
    onSubmit={handleSubmit(onSubmit)}
    id={id ? id + "" : undefined}
    >
        <Stack>
            <TextInput name="name" label="Name" control={control} 
            required
            backendError={backendError?.name}
            />
            <TextInput name="message" label="Message" control={control} 
            required
            backendError={backendError?.message}
            />
            <ReactDropzone name="image" label="Image" control={control} 
            options={{
                accept: {'image/*' : []},
            }}
            />
            <StatusRadio name="is_active" label="Status" control={control} 
          
            />
        </Stack>
    </ModalForm>
  )
}

export default TestimonialForm