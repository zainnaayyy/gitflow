import { useGetLogsQuery } from '../../../features/asterisk/asteriskApiSlice';

  export const ApiQuery = () => {

    const { data: getLog, isLoading, isSuccess, isError } = useGetLogsQuery();

    if (isLoading) {
        console.log('isLoading getLog', getLog)
      } else if(isSuccess) {
        console.log('isSuccess getLog', getLog)
      } else if(isError) {
        console.log('isError getLog', getLog)
      }

    return ('Testing')
  }
