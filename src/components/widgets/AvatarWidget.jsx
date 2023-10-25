import React from "react";
import { useGetUsersQuery } from "../../features/users/userApiSlice";
import { Avatar, AvatarGroup, Tooltip, Box } from "@mui/material";

const AvatarWidget = () => {
  const { data: profiles, isLoading, isSuccess } = useGetUsersQuery();

  let content;

  const avatarUrl = (profile) => {
    return `https://back.iqbot.live/media/image/avatar/${profile.user}.png?${Date.now()}`
  } 

  if (isLoading) {
    content = <Box>"Loading Data"</Box>;
  } else if (isSuccess) {
    content = (
      <AvatarGroup max={10} sx={{ mt: 2, mr: 1}}>
        {profiles.map((profile) => {
          return (
            <Tooltip title={profile.first_name} arrow>
              <Avatar alt="Remy Sharp" src={() => avatarUrl(profile)} />
              {/*<Avatar alt="Remy Sharp" src={`http://localhost:8000/media/avatars/${profile.user}.png?${Date.now()}`} />*/}
            </Tooltip>
          );
        })}
      </AvatarGroup>
    );
  }

  return content;
};

export default AvatarWidget;
