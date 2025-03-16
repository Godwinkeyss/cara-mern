import {useContext} from 'react'
import {Store} from '../Store'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children})=>{
    const {state,dispatch} = useContext(Store)
    const {userInfo} = state
    
    return  userInfo ? children: <Navigate to="/signin" />;
}

export default ProtectedRoute;