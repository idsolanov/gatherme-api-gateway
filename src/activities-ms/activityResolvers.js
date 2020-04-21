import {generalRequest} from '../utilities'
import {getActivityByID,
     getAllActivities,
      createActivity,
       updateActivity,
       commentActivity,
       deleteActivity
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
        }
    },
    Mutation: {
        createActivity: (_, {activity}) => {
            let response = createActivity(`${URL}/`, activity);
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
        }
    }
}

export default activityResolvers;