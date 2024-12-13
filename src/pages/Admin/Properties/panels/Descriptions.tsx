import { HStack, Stack } from '@chakra-ui/react';
import CkEditor from '@realState/components/Form/CkEditor';
import { Button } from '@realState/components/ui/button';
import { useFetchPropertyById, useUpdateProperty } from '@realState/services/service-properties';
import Loader from '@realState/utils/Loader';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface DescriptionsProps {
        setTabValue: (value: string) => void;   
    }

const Descriptions: FC<DescriptionsProps> = ({setTabValue}) => {

    const {id} = useParams();

    const defaultValues = {
        description_en: '',
        description_np: '',
    }

    const {
        data: property,
        isPending: isPropertyPending,
        isFetching: isPropertyFetching,
      } = useFetchPropertyById(id!);
    
    const {control, reset, handleSubmit} = useForm({
        defaultValues,
    })


    const {mutateAsync: updateDescription, isPending} = useUpdateProperty();


    useEffect(() => {
        if (property?.data) {
          reset({
            description_en: property?.data.description_en ?? "",
            description_np: property?.data.description_np ?? "",
          });
        } else {
          reset(defaultValues);
        }
      }, [property]);

    const onSubmit = async(data: typeof defaultValues) => {
       const response = await updateDescription({
              id: id!,
              data,
         });
            if(response.data.status){
                setTabValue('amenities');
            }
    }
  return (
    !!id && (isPropertyFetching || isPropertyPending) ? (
        <Loader />
        ) : (<Stack gap={6} asChild>
            <form onSubmit={handleSubmit(onSubmit)}>
            <CkEditor 
                control={control}
                name="description_en"
                label="Description (English)"
            />
            <CkEditor 
                control={control}
                name="description_np"
                label="Description (Nepali)"
            />
            <HStack>
            <Button variant={'outline'} onClick={() => 
                setTabValue('general')
            }>Back</Button>
            <Button 
                type="submit"
                loading={isPending}
            >
                Save & Next
            </Button>
            </HStack>
            </form>
</Stack>
        )
  )
}

export default Descriptions