import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SwitchInput, TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { useFetchAmenities, useUpdateAmenities } from "@realState/services/service-properties";
import Loader from "@realState/utils/Loader";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
    is_road_access: yup.boolean().required("Road Access is required"),
    floor: yup.string().required("Floor is required"),
    is_parking: yup.boolean().required("Parking is required"),
    is_furnished: yup.boolean().required("Furnished is required"),
    is_garden: yup.boolean().required("Garden is required"),
});

type AmenitiesValues = yup.InferType<typeof schema>;


interface AmenitiesProps {
    setTabValue: (value: string) => void;
}

const Amenities: FC<AmenitiesProps> = (
    { setTabValue },
) => {
    const {id} = useParams();
    const defaultValues = {
        is_road_access: false,
        floor: "" ,
        is_parking: false,
        is_furnished: false,
        is_garden: false,
    }



    const {control, handleSubmit, reset, formState} = useForm<AmenitiesValues>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const {data: amenities, isPending: isAmenitiesPending, isFetching: isAmenitiesFetching} = useFetchAmenities(id!);

    useEffect(() => {
        if(amenities?.data) {
            reset({
                is_road_access: amenities?.data?.is_road_access ? true: false,
                floor: amenities?.data.floor ?? "",
                is_parking: amenities?.data.is_parking ? true: false,
                is_furnished: amenities?.data.is_furnished ? true: false,
                is_garden: amenities?.data.is_garden ? true: false,
            })
        }
        }, [amenities])

        const {mutateAsync: createAmenities, isPending: isCreatingAmenities} = useUpdateAmenities();


    const onSubmit = async (data: AmenitiesValues) => {
       const response = await createAmenities({id: id!, data});
         if(response.data.status) {
              setTabValue("images");
         }
    }

  return (
   !!id && ( isAmenitiesPending || isAmenitiesFetching) ? <Loader /> :
    <Flex flexDir={'column'} gap={4}>
    <SimpleGrid columns={{base:2, sm:3}} gap={4}
    asChild
    >
        <form 
        id="amenities-form"
        onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextInput name="floor" control={control} label="Floor" />
            <SwitchInput name="is_road_access" control={control} label="Road Access" />
            <SwitchInput name="is_parking" control={control} label="Parking" />
            <SwitchInput name="is_furnished" control={control} label="Furnished" />
            <SwitchInput name="is_garden" control={control} label="Garden" />
            </form>
    </SimpleGrid>
    <HStack mt={4}>
        <Button onClick={() => setTabValue("general")} variant="outline">Back</Button>
    <Button form="amenities-form" type="submit" loading={isCreatingAmenities} loadingText="Saving" colorScheme="primary">Save & Next</Button>
    </HStack>
    </Flex>
  )
}

export default Amenities