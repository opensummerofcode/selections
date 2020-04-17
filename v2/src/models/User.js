class User {
  constructor(user) {
    this.id = user.uid;
    this.name = user.displayName;
    this.isPending = user.pending;
    this.isAdmin = user.admin;
  }
}

export default User;
