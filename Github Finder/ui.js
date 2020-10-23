function UI() {}

UI.prototype.displayProfile = function(profile) {
  document.querySelector('.profile').style = 'display: flex';
  document.querySelector('.repos').style = 'display: flex';
  const title = document.querySelectorAll('.title');
  title.forEach(function(t) {
    t.style = 'display: block';
  });

  document.getElementsByClassName('profile')[0].innerHTML = `
    <div class='row1'>
      <h2>${profile.name}</h2>
      <img src='${profile.avatar_url}' alt='avatar'>
      <a href='${profile.avatar_url}' target='_blank'>Preview</a>
    </div>

    <div class='row2'>
      <div class='details'>
        <span>Followers: ${profile.followers}</span>
        <span>Following: ${profile.following}</span>
        <span>Repos: ${profile.public_repos}</span>
        <span>Gists: ${profile.public_gists}</span>
      </div>

      <div class='user'>
        <p>Bio: ${profile.bio}</p>
        <p>Email: ${profile.email}</p>
        <p>Location: ${profile.location}</p>
      </div>
    </div>
  `;
}

UI.prototype.displayRepo = function(repos) {
  let output = '';

  repos.forEach(function(repo) {
    output += `
      <div class='row50'>
        <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
      </div>

      <div class='row50'>
        <span>Stars: ${repo.stargazers_count}</span>
        <span>Watchers: ${repo.watchers_count}</span>
        <span>Forks: ${repo.forks_count}</span>
      </div>
    `;

    document.getElementsByClassName('repos')[0].innerHTML = output;
  });
}

UI.prototype.error = function() {
  const err = document.createElement('div');
  err.classList = 'error';
  err.innerText = 'Enter valid username';

  const insert = document.querySelector('.title');
  document.body.insertBefore(err, insert);
  
  setTimeout(() => document.body.removeChild(err, err.parentElement), 1000);
}