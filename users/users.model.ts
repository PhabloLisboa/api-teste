const users = [
    { id: '1', 'name': 'Phablo Daniel', age: 19 },
    { id: '2', 'name': 'Marina Lisbôa', age: 17 }
]

export class User {
    static findAll() {
        return Promise.resolve(users)
    }

    static findById(id: string) {
        return new Promise(resolve => {
            const filtered = users.filter( user => user.id === id)
            let user = undefined
            if(filtered.length > 0){
                user = filtered[0]
            }
            resolve(user)
        })
    }
}

