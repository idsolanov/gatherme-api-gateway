import {generalRequest} from '../utilities'
import {getActivityByID,
     getAllActivities,
      createActivity,
       updateActivity,
       commentActivity,
       deleteActivity,
       addMember,
       getActivitiesByCategory
    }from '../logic'

const URL = `http://172.17.0.1:4000/gatherme-activities-ms/activities/activity`;

const activityResolvers = {
    Query: {
        getActivityByID: (_, {id}) => {
            let response = getActivityByID(`${URL}/${id}`);
            return response;
        },
        getAllActivities: (_)=>{
            let response= getAllActivities(`${URL}/`);
            return response;
        },
        getActivitiesByCategory: (_, {category}) => {
            let response= getActivitiesByCategory(`${URL}/category/${category}`);
            return response;
        }
    },
    Mutation: {
        createActivity: (_, {activity, token}) => {
            let response = createActivity(`${URL}/`, activity, token);
            return response;
        },
        updateActivity: (_, {id, activity}) => {
            let response = updateActivity(`${URL}/${id}`,activity);
            return response;
        },
        commentActivity: (_, {id, comment}) => {
            let response = commentActivity(`${URL}/${id}/comment`, comment);
            return response;
        },
        deleteActivity: (_, {id}) => {
            let response = deleteActivity(`${URL}/${id}/`);
            return response;
        },
        addMember: (_, {id, user, token}) => {
            let response = addMember(`${URL}/${id}/add/${user}`, id, user,token);
            return response;
        }
    }
}

export default activityResolvers;