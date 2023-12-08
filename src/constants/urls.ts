const baseURL = 'http://owu.linkpc.net/carsAPI/v2';

const cars = '/cars';
const auth = '/auth';
const users = '/users';

const urls = {
    cars: {
        base: cars,
        byId: (id: number): string => `${cars}/${id}`,
        photoById: (id: number): string => `${cars}/${id}/photo`
    },
    auth: {
        register: users,
        login: auth,
        me: `${auth}/me`,
        refresh: `${auth}/refresh`
    }
};

export {
    baseURL,
    urls
};