function Github() {
  this.client_id = '26e87004d8749abb15ef';
  this.client_secret = 'c8ad186a9a74c7c5aaabb51defe303a022cda617';
  this.repos_count = 5;
  this.repos_sort = 'created: asc'
}

Github.prototype.getData = function(user, callback, callback2) {
  const profile = new XMLHttpRequest();
  const repo = new XMLHttpRequest();

  profile.open('GET', `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`, true);

  repo.open('GET', `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`, true);

  repo.send();

  profile.send();

  repo.onload = function() {
    if(repo.status === 200) {
      callback2(JSON.parse(repo.responseText), repo.status);
    }
  }

  profile.onload = function() {
    if(profile.status === 200) {
      callback(JSON.parse(profile.responseText), repo.status);
    }
  }
}