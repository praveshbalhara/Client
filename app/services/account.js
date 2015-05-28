  client.factory('Account', function($http) {
    return {
      getProfile: function() {
        //return $http.get('http://dlujsethi00714:8080/auth/getuser');
        return $http.get('http://dlupbalha12515:8080/auth/getuser');
      }
      // ,
      // updateProfile: function(profileData) {
      //   return $http.put('/api/me', profileData);
      // }
    };
  });