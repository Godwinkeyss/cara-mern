import {useContext} from 'react'
import {Store} from '../Store'
import {Navigate} from 'react-router-dom'

const AdminRoute = ({children})=>{
    const {state,dispatch} = useContext(Store)
    const {userInfo} = state
    
    return  userInfo && userInfo.isAdmin ? children: <Navigate to="/signin" />;
}

export default AdminRoute;