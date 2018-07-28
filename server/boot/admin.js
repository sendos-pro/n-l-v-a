module.exports = function(app) {
  var Team = app.models.Teams;
  var Role = app.models.Role;

  Team.create(
    [
      {
        realm: "admin",
        username: "admin",
        email: "sendospro@mail.ru",
        password: "admin"
      }
    ],
    function(err, users) {
      if (!err) {
        Role.create(
          {
            name: "admin"
          },
          function(err, role) {
            if (!err) {
              console.log("Created role:", role);

              role.principals.create(
                {
                  principalType: 'Teams',
                  principalId: users[0].id
                },
                function(err, principal) {
                  if (!err) {
                    console.log("Created principal:", principal);
                  }
                }
              );
            }
          }
        );
      }

      console.log("Created admin users:", users);
    }
  );
};