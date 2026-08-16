import { get, del, patch, post } from "../axios/axios";

export const loginUser = async ({ email, password }) => {
    const response = await post("user/users/login", { email, password })

    const project = await get("/project/projects")
    console.log("project data in LS",project.data);
    window.localStorage.setItem("projectData", project)
    
    return response.data.data;
}

// export const project = async () => {
//     const response = await get("/project/projects")
//     console.log(response.data);

//     return response.data
// }