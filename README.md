THIS IS PARCEL TAILWIND / FLOWBITE TEMPLATE PROJECT MADE FOR FUTURE USE.

Create EMPTY new repository
- go to your repository settings -> actions -> general -> sign Read and write permissions -> SAVE

commands you neet to write:

`git clone https://github.com/KrzysztofRozbicki/parcel-tailwind-template.git`
after that rename folder to your repository name e.g. newRepository
- enter the folder ant type  `code .`  to start editing the code
- `git remote -v` to check the linked repository
- `git remote set-url 'your-new-repository-url'` - to set the repository to your new one
- `git fetch` - to fetch your github repository
- `git pull origin --allow-unrelated-histories` - to merge repositories so you can push it

***change the link to your github repository on package.json file.***

- `git push` - to push the main branch

***After that you need to make a gh-pages branch to deploy the project:***

- `git checkout gh-pages` to create new branch
- `git fetch` - to fetch your github repository
- `git pull origin --allow-unrelated-histories` - to merge repositories so you can push it
- `git push` - to push the branch
- `git checkout main` to go back to your main branch

After all of that you should have a new repository with parcel / tailwind / flowbite template.
Now in order to run it on your local machine type in your terminal:

`npm run build`
<sub> to build project </sub>

`npm start`
<sub> to start project on your localhost</sub>
