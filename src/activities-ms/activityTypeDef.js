export const activityTypeDef = `
type Activity {
    id: Int
    informacion:  String!
    nombre:  String!
    descripcion:  String!
    lista_miembros : [String]
    tags_especificos : [String]
    notas_adicionales : [String]
    categoria:  String!
    reccurrente: Boolean!
    lugar:  String!
    hora:  String!
    fecha:  String!
    banner:  String!
    comments: [Comment]
    administrador:  String!
}
type Comment {
    id: Int!
    userId:  String! 
    content:  String!
    date:  String!
}
type Response {
    Status: Int
}
 type ReturnId {
     id: Int
 }

input ActivityInput {
    informacion:  String!
    nombre:  String!
    descripcion:  String!
    lista_miembros : [String]
    tags_especificos : [String]
    notas_adicionales : [String]
    categoria:  String!
    reccurrente: Boolean!
    lugar:  String!
    hora:  String!
    fecha:  String!
    banner:  String!
    administrador:  String!
}

input ActivityInputUpdate {
    informacion:  String!
    nombre:  String!
    descripcion:  String!
    lista_miembros : [String]
    tags_especificos : [String]
    notas_adicionales : [String]
    categoria:  String!
    reccurrente: Boolean!
    lugar:  String!
    hora:  String!
    fecha:  String!
    banner:  String!
}

input AdministratorInputUpdate {
    id:  Int!
    newAdministrator:  String!
    informacion:  String!
    nombre:  String!
    descripcion:  String!
    lista_miembros : [String]
    tags_especificos : [String]
    notas_adicionales : [String]
    categoria:  String!
    reccurrente: Boolean!
    lugar:  String!
    hora:  String!
    fecha:  String!
    banner:  String!
    administrador:  String!
}
input ActivityInputDelete {
    id:  Int!
}

input CommentInput {
    userId:  String! 
    content:  String!
    date:  String!
}


`;


export const activityQueries = `
    getActivityByID(id: Int!): Activity!
    getAllActivities: [Activity]

`
;

export const activityMutations = `
    createActivity(activity: ActivityInput, token: String): ReturnId
    updateActivity(id: Int, activity: ActivityInput): ReturnId 
    updateAdministrator(activity: AdministratorInputUpdate): Activity
    commentActivity(id: Int, comment: CommentInput):  Response
    deleteActivity(id: Int): Response
    addMember(id: Int, user: String, token: String): ReturnId

`