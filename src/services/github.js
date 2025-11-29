export const fetchGitHubProjects = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        // Filter out forks if desired, or keep them. For now, we keep everything but maybe filter by stars later.
        // Let's filter out forks to keep it clean, unless the user wants them. 
        // "展示自己在 github 上的创建的公开项目" implies created by them, so !fork.
        return data.filter(repo => !repo.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        return [];
    }
};
