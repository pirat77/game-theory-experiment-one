interface EndpointResponse {
    meta?: object;
    data?: object;
};
interface GameResponse {
    games: Array<{}>;
};
interface Endpoint {
    name: string;
    method: "POST"|"GET";
    address: string;
    request: object;
    response: GameResponse|EndpointResponse;
};
enum StatusCode {
    PENDING = 1,
    ONGOING = 2,
    FINISHED = 3,
    CANCELED = 4,
};

const endpoints: Endpoint[] = [
    {
        name: "enroll",
        method: "POST",
        address: "/enroll",
        request: {
            nick: "string 8-20",
            lvl: "int",
            map_size: {
                min_map_size: "int 0<x<256",
                max_map_size: "int 0<x<256",
            },
            public_key: "byte",
        },
        response: {
            meta: {
                game_token: "string",
                server_time: "int timestamp",
                time_to_response: "int timestamp",
            },
        },
    },
    {
        name: "list games",
        method: "GET",
        address: "/games",
        request: undefined,
        response: {
            games: [
                {
                    game_token: "string",
                    map_size: "int",
                    players: [
                        //..
                        {
                            nick: "string"
                        },
                    ],
                    status: StatusCode,
                    active_player: "string|undefined",
                }
            ],
        },
    },
    {
        name: "post move",
        method: "POST",
        address: "/move",
        request: {
            game_token: "string",
        	nick: "string",
	        moves: [
                {
                    x_coordinate: "int <0-map_size)",
                    y_coordinate: "int <0-map_size)",
                },
            ],
        },
        response: {
            data: {
                valid: "boolean",
                game_state: {
                    active_player: "string",
                    status_code: StatusCode,
                    map: [
                        //..
                        ["", "x", "o"],
                    ],
                },
            },
            meta: {
                game_token: "string",
                server_time: "int timestamp",
                time_to_response: "int timestamp",
            }
        },
    },
    {
        name: "get game state",
        method: "GET", 
        address: "/game_state", 
        request: {

        }, 
        response: {
            data: {
                game_state: {
                    active_player: "string",
                    status_code: StatusCode,
                    map: [
                        //..
                        ["", "x", "o"],
                    ],
                },
            },
            meta: {
                game_token: "string",
                server_time: "int timestamp",
                time_to_response: "int timestamp",
            }
        }, 
    } 
];
