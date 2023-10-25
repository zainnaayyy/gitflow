import React, { useEffect } from "react";
import { useGetChannelsActivityQuery } from "../features/stasis/StasisActivity";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentId } from "../features/auth/authSlice";
import { inCallStatus, registeredStatus } from "../features/dialer/dialerSlice";

import { useGetUserQuery } from "../features/users/userApiSlice";

const CheckStasisChannelStatus = () => {
  // Create the verification activity of the channel and set the state to actual

  const dispatch = useDispatch();

  const user_id = useSelector(selectCurrentId);
  const { data: user, isLoading, isSuccess } = useGetUserQuery(user_id);

  const registerStatus = useSelector((state) =>
    registeredStatus(state.dialer.valueRegisteredStatus)
  );
  const callStatus = useSelector((state) =>
    inCallStatus(state.dialer.valueInCallStatus)
  );

  const { data: activeChannels, refetch } = useGetChannelsActivityQuery();

  useEffect(() => {
    const checkChannel = () => {
      refetch();
      const currentExtension = activeChannels.find(
        (channel) => channel.extension === user.user.extension
      );
      if (currentExtension) {

        console.log('inCallStatus::', callStatus.payload)
        console.log('currentExtension::', currentExtension)
  
        if (currentExtension.is_registered == registerStatus.payload) {
          console.log('if  currentExtension.in_stasi...::', registerStatus.payload)
          
        }
  

      }

        


    };

    const intervalId = setInterval(checkChannel, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [activeChannels, refetch, dispatch, user, callStatus.payload, registerStatus.payload]);

  return null;
};

export default CheckStasisChannelStatus;


{/**

 useEffect(() => {
    const checkChannel = () => {
      refetch();
      const currentExtension = activeChannels.find(
        (channel) => channel.extension === user.user.extension
      );

      if (currentExtension) {
        if (currentExtension.in_stasis == callStatus.payload) { // WAS is_active
          // The status of channel between back and front is up and synced
          console.log(
            "The status of channel between back and front is up and synced"
          );
          if (!callStatus.payload) {
            // dispatch(registeredStatus(true))
            // dispatch(inCallStatus(true))
            console.log("IF 1 ::");
          }
          // The status of channel between back and front is up, but not synced
        } else if (currentExtension.in_stasis != callStatus.payload) { // WAS is_active
          console.log(
            "The status of channel between back and front is up, but not synced"
          );
          if (!callStatus.payload) {
            // dispatch(registeredStatus(true))
            // dispatch(inCallStatus(true))
            console.log("IF 2 ::");
          }
        }
      } else if (!currentExtension) {
        // The status of channel between back and front is down
        console.log("The status of channel between back and front is down");
        // dispatch(registeredStatus(false));
        // dispatch(inCallStatus(false));
      }
    };

    const intervalId = setInterval(checkChannel, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [activeChannels, refetch, dispatch, user, callStatus.payload]);


*/}