import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ReactDropzone, TextInput } from "@realState/components/Form";
import { Button } from "@realState/components/ui/button";
import { EmptyState } from "@realState/components/ui/empty-state";
import useGetErrors from "@realState/hooks/useGetErrors";
import { toFormData } from "@realState/services/service-axios";
import {
  useFetchStatisticsById,
  useUpdateStatistics,
} from "@realState/services/service-statistics";
import Loader from "@realState/utils/Loader";
import PageHeader from "@realState/utils/PageHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const StatisticsForm = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <EmptyState
        title="No Statistics Found"
        description="Please enter the valid statistics id"
      />
    );
  }

  const defaultValues = {
    title_en: "",
    title_np: "",
    value: "",
    image: "",
  };
  const navigate = useNavigate();

  const {
    mutateAsync: updateStat,
    isPending,
    isError,
    error,
  } = useUpdateStatistics();

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  useEffect(() => {
    if (isError) {
      setBackendError(useGetErrors(error));
    } else {
      setBackendError({});
    }
  }, [isError, error]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const {
    data: stats,
    refetch,
    isPending: isLoading,
    isFetching,
  } = useFetchStatisticsById(id);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    fetchData();
  }, [id]);

  const [removeImage, setRemoveImage] = useState(false);
  useEffect(() => {
    if (stats) {
      reset({
        title_en: stats.data.title_en,
        title_np: stats.data.title_np,
        value: stats.data.value,
        image: stats.data.image,
      });
    }
  }, [stats]);

  const onSubmit = async (data: typeof defaultValues) => {
    const formData = toFormData(data);
    if (removeImage) {
      formData.append("remove_image", "true");
    }
    const response = await updateStat({ id, data: formData });

    if (response.data.status) {
      setBackendError({});
      reset(defaultValues);
      navigate("/admin/statistics");
    }
  };

  return isLoading || isFetching ? (
    <Loader />
  ) : (
    <Flex flexDir={"column"} gap={4}>
      <PageHeader
        heading="Edit Statistics"
        description="Edit your statistics here"
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} asChild>
        <form id="statistics-form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="title_en"
            label="Title (English)"
            control={control}
            required
            backendError={backendError.title_en}
          />
          <TextInput
            name="title_np"
            label="Title (Nepali)"
            control={control}
            required
            backendError={backendError.title_np}
          />
          <TextInput
            name="value"
            label="Value"
            control={control}
            required
            backendError={backendError.value}
          />
          <ReactDropzone
            name="image"
            control={control}
            options={{ accept: { "image/*": [] } }}
            file={stats?.data.image ?? ""}
            backendError={backendError.image}
            setRemoveImage={setRemoveImage}
          />
        </form>
      </SimpleGrid>
      <Button type="submit" form="statistics-form" loading={isPending}>
        Submit
      </Button>
    </Flex>
  );
};

export default StatisticsForm;
