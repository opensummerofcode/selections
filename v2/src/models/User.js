class User {
  constructor(user, claims) {
    this.id = user.uid;
    this.name = user.displayName;
    this.isPending = claims.pending;
    this.isAdmin = claims.admin;
  }
}

export default User;
