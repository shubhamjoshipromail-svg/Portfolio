# Shubham Joshi Portfolio

Personal portfolio site for Shubham Joshi, focused on explainable ML, AI products, analytics, and consulting case studies.

## Stack

- Static HTML/CSS/JS
- Assets served directly
- Dockerized with Caddy for predictable Railway deploys

## Local preview

From the project root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

## Deploying to Railway

This repo is prepared to deploy through Railway using the root `Dockerfile`.

Railway docs used for this setup:

- Dockerfiles: https://docs.railway.com/builds/dockerfiles
- Build & Deploy overview: https://docs.railway.com/build-deploy
- GitHub autodeploys: https://docs.railway.com/deployments/github-autodeploys

Recommended deploy flow:

1. Push this repo to GitHub.
2. In Railway, create a new project.
3. Choose `Deploy from GitHub repo`.
4. Select this repository.
5. Railway should detect the root `Dockerfile` automatically.
6. After the first successful deploy, generate a public domain in the Railway service networking settings.

## Notes

- The site is served as a static web app through Caddy.
- `try_files {path} /index.html` is included so deep links keep resolving to `index.html`.

