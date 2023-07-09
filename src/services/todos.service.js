import httpService from "./http.service"

const todosEndpoint = "todos/";

const todosService = {
    fetch: async () => {
        const {data} = await httpService.get(todosEndpoint, {
            params: {
                _limit: 10,
                _page: 1
            }
        });
        return data
    },
    create: async () => {
        const {data} = await httpService.post(todosEndpoint, {
            title: "New Task",
            completed: false
        });
        return data
    }
};

export default todosService;