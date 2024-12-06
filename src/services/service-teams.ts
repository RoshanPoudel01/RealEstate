export interface TeamResponse {
  id: number;
  display_order: number;
  is_active: number;
  name_en: string;
  name_np: string;
  position_en: string;
  position_np: string;
  description_np: string;
  description_en: string;
  image: string;
}

import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

const useFetchTeams = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<TeamResponse>>({
    url: api.teams.fetch({ page, perPage, keyword }),
    queryKey: [`teams`],
  });
};

const useFetchTeamById = (id: string) => {
  return useFetch<SingleResponse<TeamResponse>>({
    url: api.teams.fetchById.replace(":id", id),
    queryKey: [`team`],
    enabled: !!id,
  });
};

const useCreateTeam = () => {
  return useMutate({
    url: api.teams.create,
    queryKey: [`create-team`],
    invalidates: [`teams`],
    message: "Team created successfully",
  });
};

const useUpdateTeam = () => {
  return useMutate({
    url: api.teams.update,
    queryKey: [`update-team`],
    invalidates: [`teams`, `team`],
    method: `POST`,
    message: `Team updated successfully`,
  });
};

const useDeleteTeam = () => {
  return useMutate({
    url: api.teams.delete,
    queryKey: [`delete-team`],
    invalidates: [`teams`],
    method: `DELETE`,
    message: `Team deleted successfully`,
  });
};

export {
  useCreateTeam,
  useDeleteTeam,
  useFetchTeamById,
  useFetchTeams,
  useUpdateTeam,
};
