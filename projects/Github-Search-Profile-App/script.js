

const APIURL = 'https://api.github.com/users'
const btn = document.getElementById('btn')
const form = document.querySelector('form.upper')
const searchbar = document.getElementById('searchbar')
const listParent = document.querySelector('.bottom')

// Utils
const notFound = document.querySelector('.not-found')
const loader = document.querySelector('.loader')
const handleLoaderVisibility = (state) => loader.classList = state ? 'loader' : 'loader hidden'
const handleErrorVisibility = (state) => notFound.style = state ? "display:block;" : ""

// Normal
const getUser = async (username) => {
    try {
        handleErrorVisibility(false)
        handleLoaderVisibility(true)
        const response = await fetch(`https://api.github.com/users/${username}`).then(res => res.json())
        updatedata(listParent, response);
    } catch (e) {
        console.log(e.name)
        console.log(e.message)
        handleErrorVisibility(true)
    } finally {
        handleLoaderVisibility(false)
    }
}

function updatedata(parent, data) {
    const profileCard = `
        <a class="card" target="_blank" href="${data.html_url}">
            <div class="card-media">
                <img src="${data.avatar_url}" alt="${data.name}">
            </div>
            <div class="card-content">
                <div class="profile-name">
                    <p>${data.name}</p>
                    <span>@${data.login}</span>
                </div>
                <div class="profile-bio">
                    ${data.bio}
                </div>

                <div class="profile-stats">
                    <div>
                        <p class="light">${data.followers}</p>
                        <span>Followers</span>
                    </div>

                    <div>
                        <p class="light">${data.following}</p>
                        <span>Following</span>
                    </div>

                    <div>
                        <p class="light">${data.public_repos}</p>
                        <span>Repositories</span>
                    </div>
                </div>
            </div>
        </a>`
    parent.innerHTML = profileCard
}

// clearing the parent here because it emits when user clicks on the input cross icon as well
searchbar.addEventListener('search', () => {
    listParent.innerHTML = ""
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = searchbar.value
    getUser(username)
})

