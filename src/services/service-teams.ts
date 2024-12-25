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
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface TeamFrontResponse {
  id: number;
  display_order: number;
  is_active: number;
  name: string;
  position: string;
  description: string;
  image?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
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
    url: api.teams.byId.replace(":id", id),
    queryKey: [`team`],
    enabled: !!id,
  });
};

const useCreateTeam = () => {
  return useMutate({
    url: api.teams.index,
    queryKey: [`create-team`],
    invalidates: [`teams`],
    message: "Team created successfully",
  });
};

const useUpdateTeam = () => {
  return useMutate({
    url: api.teams.byId,
    queryKey: [`update-team`],
    invalidates: [`teams`, `team`],
    method: `POST`,
    message: `Team updated successfully`,
  });
};

const useDeleteTeam = () => {
  return useMutate({
    url: api.teams.byId,
    queryKey: [`delete-team`],
    invalidates: [`teams`],
    method: `DELETE`,
    message: `Team deleted successfully`,
  });
};

const useFetchFrontTeams = ({ language = "en" }) => {
  return useFetch<RootResponse<TeamFrontResponse>>({
    url: api.teams.front({ language }),
    queryKey: [`front-teams`],
  });
};

export {
  useCreateTeam,
  useDeleteTeam,
  useFetchFrontTeams,
  useFetchTeamById,
  useFetchTeams,
  useUpdateTeam,
};
