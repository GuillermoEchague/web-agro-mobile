const getUsername = (user) => {
    if(user.displayName) return user.displayName;

    return user.email.split("@")[0]
}

export default getUsername;