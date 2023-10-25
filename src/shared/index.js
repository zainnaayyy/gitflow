import { AuthContext, AuthProvider, useAuth} from './context'
import { useLocalStorage, useQuery, useRouter } from './hooks'
import { store } from "./redux/store"
import { actionApi } from './redux/actionAPI'
import { useSelector, useDispatch } from 'react-redux'

const useSharedDispatch = () => useDispatch()
const useSharedSelector =  useSelector

export {
    AuthContext,
    AuthProvider,
    useAuth,
    useLocalStorage,
    useQuery,
    store,
    actionApi,
    useSharedDispatch,
    useSharedSelector,
    useRouter
}