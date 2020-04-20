export const activityTypeDef = `
type Activity {
    id int!
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}
type Comment {
    id int!
    userId String! 
    content String!
    date String!
}
input ActivityInput {
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}

input ActivityInputUpdate {
    id = int!
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}

input AdministratorInputUpdate {
    id = int!
    newAdministrator = String!
    informacion String!
    nombre String!
    descripcion String!
    lista_miembros [String]
    tags_especificos [String]
    notas_adicionales [String]
    categoria String!
    boolean recurrente String!
    lugar String!
    hora String!
    fecha String!
    banner String!
    administrador String!
}
input ActivityInputDelete {
    id: int!
}

input CommentInput {
    id = int!
    userId String! 
    content String!
    date String!
}

`;

export const ActivityQueries = `
    getActivityByID(id: int!): Activity!
    getAllActivities(): [Activity]

`
;

export const ActivityMutations = `
    createActivity(activity: ActivityInput): Activity
    updateActivity(activity:ActivityInputUpdate): Activity
    updateAdministrator(activity: AdministratorInputUpdate): Activity
    commentActivity(comment: CommentInput):  Comment
    deleteActivity(id: ActivityInputDelete): Activity

`