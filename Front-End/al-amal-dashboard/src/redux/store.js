import { configureStore } from '@reduxjs/toolkit'

import modalsReducer from './reducers/modalsSlice'
import usersReducer from './reducers/usersSlice'
import billsReducer from './reducers/billsSlice'
import adminsReducer from './reducers/adminsSlice'
import profileReducer from './reducers/profileSlice'
import sponsoredReducer from './reducers/sponsoredSlice'
import coursesReducer from './reducers/coursesSlice'

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    users: usersReducer,
    bills: billsReducer,
    admins: adminsReducer,
    profile: profileReducer,
    sponsored: sponsoredReducer,
    courses: coursesReducer
  }
})

export default store
