document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const searchBtn = document.getElementById('searchBtn');
    const profileDisplay = document.getElementById('profileDisplay');

    // GitHub API base URLs
    const GITHUB_API_URL = 'https://api.github.com/users/';

    // Function to fetch user data
    async function fetchGitHubUser(username) {
        profileDisplay.innerHTML = '<p class="loading-message"><i class="fas fa-spinner fa-spin"></i> Loading profile...</p>';
        try {
            const userResponse = await fetch(`${GITHUB_API_URL}${username}`);
            if (!userResponse.ok) {
                if (userResponse.status === 404) {
                    throw new Error('User not found. Please check the username.');
                }
                throw new Error(`Error fetching user data: ${userResponse.statusText}`);
            }
            const userData = await userResponse.json();

            // Fetch repositories
            const reposResponse = await fetch(userData.repos_url + '?sort=created&direction=desc&per_page=5'); // Get 5 most recent public repos
            if (!reposResponse.ok) {
                throw new Error(`Error fetching repositories: ${reposResponse.statusText}`);
            }
            const reposData = await reposResponse.json();

            displayProfile(userData, reposData);

        } catch (error) {
            profileDisplay.innerHTML = `<p class="error-message"><i class="fas fa-exclamation-circle"></i> ${error.message}</p>`;
            console.error('Fetch error:', error);
        }
    }

    // Function to display profile data
    function displayProfile(user, repos) {
        profileDisplay.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" class="profile-avatar">
            <div class="profile-info">
                <h2>${user.name || user.login}</h2>
                <p class="username">@${user.login}</p>
                ${user.bio ? `<p class="bio">${user.bio}</p>` : ''}
                ${user.location ? `<p><i class="fas fa-map-marker-alt"></i> ${user.location}</p>` : ''}
                ${user.blog ? `<p><i class="fas fa-link"></i> <a href="${user.blog}" target="_blank">${user.blog.replace(/(^\w+:|^)\/\//, '')}</a></p>` : ''}
                <a href="${user.html_url}" target="_blank" class="view-github"><i class="fab fa-github"></i> View on GitHub</a>
            </div>
            <div class="profile-stats">
                <div>
                    <strong>${user.followers}</strong>
                    <span>Followers</span>
                </div>
                <div>
                    <strong>${user.following}</strong>
                    <span>Following</span>
                </div>
                <div>
                    <strong>${user.public_repos}</strong>
                    <span>Public Repos</span>
                </div>
            </div>
            <div class="profile-repos">
                <h3>Recent Public Repositories (${repos.length}/${user.public_repos})</h3>
                <ul class="repo-list">
                    ${repos.map(repo => `
                        <li class="repo-item">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            <div class="repo-lang-stars">
                                ${repo.language ? `<span class="lang"><i class="fas fa-code"></i> ${repo.language}</span>` : ''}
                                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            </div>
                        </li>
                    `).join('')}
                    ${repos.length === 0 ? '<p>No public repositories found.</p>' : ''}
                </ul>
            </div>
        `;
    }

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchGitHubUser(username);
        } else {
            profileDisplay.innerHTML = '<p class="error-message"><i class="fas fa-info-circle"></i> Please enter a GitHub username.</p>';
        }
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click(); // Simulate a click on the search button
        }
    });
});