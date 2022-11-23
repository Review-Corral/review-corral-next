import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { OrgMember } from "../../../github-api-types";
import { ApiResponse } from "../../api/utils/apiBaseTypes";

export const USE_GET_MEMBERS_KEY = "useGetOrganizationMembers";

export const useGetMembers = (
  orgId: string,
  { enabled = true }: { enabled?: boolean } = {},
) => {
  return useQuery<OrgMember[] | undefined, AxiosError>(
    [USE_GET_MEMBERS_KEY],
    async () => {
      return (
        await axios.get<ApiResponse<OrgMember[] | undefined>>(
          `/api/gh/${orgId}/members`,
        )
      ).data.data;
    },
    {
      enabled,
    },
  );
};
