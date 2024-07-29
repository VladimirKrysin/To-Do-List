export const fakeAuthProvider = {
    isAuthenticated: false,
    username: null,
    async signin(username) {
        await new Promise((r) => setTimeout(r, 500));
        fakeAuthProvider.isAuthenticated = true;
        fakeAuthProvider.username = username;
    },
    async signout() {
        await new Promise((r) => setTimeout(r, 500));
        fakeAuthProvider.isAuthenticated = false;
        fakeAuthProvider.username = "";
    },
};