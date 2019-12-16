"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: '1', 'name': 'Phablo Daniel', age: 19 },
    { id: '2', 'name': 'Marina Lisbôa', age: 17 }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
    static findById(id) {
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id);
            let user = undefined;
            if (filtered.length > 0) {
                user = filtered[0];
            }
            resolve(user);
        });
    }
}
exports.User = User;
