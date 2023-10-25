// Not in Use
import { useEffect } from "react";
import { useGetEndpointsQuery } from "../features/asterisk/asteriskApiSlice";
import { useGetUsersQuery } from "../features/users/userApiSlice";

export const MergeAsteriskObjects = () => {
  const { data: endpoints, refetch: endpointRefetch } = useGetEndpointsQuery();
  const { data: users, refetch: userRefetch } = useGetUsersQuery();

  useEffect(() => {
    endpointRefetch();
    userRefetch();
  }, [endpointRefetch, userRefetch]);

  let end = [];

  if (users) {
    endpoints &&
      endpoints.map((endpoint, index) => {
        end.push({ ...endpoint, ...users[index] });
      });
  }

  return end;
};
