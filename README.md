# Go Fund Yourself - Website & Content Management

This document provides an overview of the project, its architecture, and how to manage content and develop the site.

## 1. Core Technologies (The Stack)

This project utilizes a modern Jamstack architecture:

- **Next.js (v14.x):** A React framework for building server-rendered and statically generated web applications. It provides routing, image optimization, and a great developer experience.
- **Tailwind CSS (v3.x):** A utility-first CSS framework for rapidly building custom user interfaces. Styles are applied directly in the HTML/JSX.
- **Decap CMS (formerly Netlify CMS):** A Git-based, open-source headless Content Management System (CMS). It provides a user-friendly admin interface (`/admin`) to edit content, which is then saved as Markdown files in the Git repository.
- **`gray-matter`:** A JavaScript library used to parse the frontmatter (YAML metadata like title, date, image paths) from Markdown files. This is how our Next.js application reads data managed by Decap CMS.
- **Netlify:**
  - **Hosting:** Serves the statically generated Next.js site.
  - **CI/CD (Continuous Integration/Continuous Deployment):** Automatically builds and deploys the site when changes are pushed to the connected GitHub branch (`decap-cms`).
  - **Netlify Identity:** Manages user authentication for Decap CMS. Access is currently invite-only.
  - **Netlify Git Gateway:** Acts as a bridge between Netlify Identity and your GitHub repository, allowing authenticated CMS users to save content changes back to GitHub without needing direct GitHub accounts with write access to the repo.

## 2. Understanding the Architecture (Jamstack)

This project follows Jamstack principles:

- **Git-centric Workflow:** The GitHub repository is the single source of truth for both the website's code and its content. Content is stored as Markdown files within the `content/` directory.
- **Pre-rendering:** The website is pre-rendered into static HTML, CSS, and JavaScript files during the build process on Netlify. This means pages are served incredibly fast and securely.
- **Decoupled CMS:** Decap CMS is "headless," meaning its admin interface is separate from the website's frontend code. When you "publish" in Decap CMS, it creates a commit in the GitHub repository.
- **Build & Deploy Cycle:**
  1.  A content editor makes changes in Decap CMS (`your-site-url/admin`).
  2.  Upon publishing, Decap CMS (via Git Gateway) commits these changes as Markdown files to the `decap-cms` branch in the GitHub repository.
  3.  Netlify detects this new commit.
  4.  Netlify pulls the latest code and content, then runs the build command (`npm run build`).
      - During the build, `getStaticProps` in pages like `pages/index.tsx` uses `gray-matter` and Node.js `fs` to read the Markdown files from the `content/` directory.
  5.  Netlify deploys the newly generated static site files to its global CDN.
  6.  The updated content is now live.

**Visual Flow (Simplified):**

```mermaid
graph TD
    A["CMS User @ /admin"] -- "Edits & Publishes" --> B("Decap CMS");
    B -- "Saves as Markdown via Git Gateway" --> C{"GitHub Repo (decap-cms branch)"};
    C -- "Triggers Webhook" --> D["Netlify"];
    D -- "Builds Site (npm run build)" --> E["Reads Markdown from content/"];
    E -- "Generates Static HTML/CSS/JS" --> F["Netlify Deploys to CDN"];
    F -- "Serves Site" --> G["Website Visitor"];
```

## 3. Project Structure Highlights

- `pages/`: Contains the Next.js page components. Each file here (e.g., `index.tsx`) corresponds to a route on the site.
  - `_app.tsx`: Custom App component, used for global styles and layout.
  - `_document.tsx`: Custom Document component, used to augment `<html>` and `<body>` tags (e.g., for the Netlify Identity widget script).
- `components/`: Reusable React components used across various pages.
- `public/`: For static assets.
  - `public/admin/`: Contains the Decap CMS admin panel (`index.html`) and its configuration (`config.yml`).
  - `public/img/`: Where images uploaded via Decap CMS are stored (as configured by `media_folder` in `config.yml`).
- `content/`: Stores all Markdown content managed by Decap CMS.
  - `content/episodes/`: Markdown files for each episode.
  - `content/companies/`: Markdown files for each featured company.
  - `content/testimonials/`: Markdown files for each testimonial.
- `next.config.js`: Configuration file for Next.js (e.g., Webpack modifications, if any).
- `tailwind.config.js`: Configuration for Tailwind CSS (e.g., custom themes, plugins).
- `postcss.config.js`: Configuration for PostCSS (used by Tailwind CSS).
- `package.json`: Lists project dependencies, scripts (like `dev`, `build`).
- `globals.css`: Global stylesheets, including Tailwind CSS base styles.

## 4. Content Management (Decap CMS)

### Overview

Content for this site (Episodes, Companies, Testimonials) is managed through the Decap CMS admin interface and stored as individual Markdown files in the `content/` directory of this repository.

### Content Types

The CMS is configured to manage the following content types (collections):

1.  **Episodes:**
    - Fields: Title, Publish Date, Description (Markdown), Image, Link.
    - Stored in: `content/episodes/`
2.  **Companies:**
    - Fields: Name, Logo (Image), Description (Markdown), Episode Link, Invest Link.
    - Stored in: `content/companies/`
3.  **Testimonials:**
    - Fields: Name (of person), Title (Person's title), Quote (Markdown), Picture (Image).
    - Stored in: `content/testimonials/`

### Accessing the CMS

1.  Navigate to your website's admin panel, usually `https://[your-site-name].netlify.app/admin`.
2.  You will be prompted to log in using Netlify Identity.

### Publishing Workflow

1.  Log into `/admin`.
2.  Navigate to the desired collection (e.g., "Episodes").
3.  Create a new entry or edit an existing one.
4.  When ready, click the "Publish" button.
5.  Decap CMS will show a "Published" confirmation once the changes have been successfully committed to the `decap-cms` branch on GitHub.
6.  **Important:** This "Published" status means the content is saved to Git. It is **not yet live** on your website.
7.  The new commit automatically triggers a build and deploy process on Netlify. This can take a few minutes.
8.  You can monitor the build progress in your Netlify site dashboard under the "Deploys" section.
9.  Once the Netlify deploy is successful, your changes will be live on the website. If a build fails, Netlify will notify you (if notifications are configured), and the live site will not be updated.

The `/admin` interface reads the list of content entries directly from the Git repository via Git Gateway. So, after publishing and refreshing `/admin`, you should see your new entry listed fairly quickly, even before the Netlify site build completes. However, the content won't be on the live website until the Netlify build and deploy cycle finishes.

## 5. User Management (Netlify Identity)

CMS users are managed through Netlify Identity.

- **Invite-Only:** Currently, new users must be invited to gain access to the CMS.
- **How to Invite a New CMS User:**
  1.  Log in to your Netlify account.
  2.  Navigate to the site instance for this project.
  3.  Go to the **Identity** tab/section.
  4.  Under "Invite users," click the "Invite users" button.
  5.  Enter the email address of the person you want to invite. They will receive an email with a link to accept the invitation and set up their password.
  6.  Once they've accepted and set a password, they can log in at `https://[your-site-name].netlify.app/admin`.

## 6. Local Development

To run the site and CMS locally for development:

1.  **Prerequisites:**
    - Node.js (version specified in `.nvmrc` if present, or a recent LTS like v18 or v20)
    - npm (comes with Node.js)
2.  **Clone the Repository:**
    ```bash
    git clone https://github.com/coefficient-labs-github/go-fund-yourself-lp.git
    cd go-fund-yourself-lp
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Run the Next.js Development Server:**
    ```bash
    npm run dev
    ```
    This will start the local development server, usually at `http://localhost:3000`.
5.  **Accessing Decap CMS Locally:**
    - The current `public/admin/config.yml` uses `backend: name: git-gateway`. This backend is designed for the deployed Netlify environment and relies on Netlify Identity. It will **not** work fully for local development (you'll likely see authentication errors if you try to log in at `http://localhost:3000/admin`).
    - **For local content testing with Decap CMS, you have a few options (temporary changes):**
      1.  **`test-repo` backend:** Temporarily change `name: git-gateway` to `name: test-repo` in `public/admin/config.yml`. This allows you to see the CMS UI and test config changes, but you cannot save or load real content from Git. Remember to change it back before committing.
      2.  **GitHub backend (more involved):** Temporarily configure Decap CMS to use the `github` backend, which would require authenticating with your GitHub account. This allows full local editing but means commits are made directly by your GitHub user. See Decap CMS docs for `github` backend setup.
    - **Recommendation for local content changes:** Often, it's easier to directly edit the Markdown files in `content/` locally if you're doing structural work or bulk edits, then test the site with `npm run dev`. For UI testing of Decap itself, use the deployed staging or production `/admin` environment.

## 7. Making Changes

### A. To Content (Episodes, Companies, Testimonials)

- Use the Decap CMS admin interface at `https://[your-site-name].netlify.app/admin` as described in Section 4.

### B. To Content Structure (Adding/Removing Fields or Collections)

1.  **Edit Configuration:** Modify the `collections` definition in `public/admin/config.yml`. Refer to Decap CMS documentation for field types and collection settings.
2.  **Commit & Push:** Save your changes to `config.yml`, commit, and push them to the `decap-cms` branch.
3.  **Netlify Deploy:** A new Netlify deploy is required for the `/admin` interface to reflect these configuration changes.
4.  **Update Frontend (Next.js):** If you add new fields or collections, you'll likely need to update your Next.js components (e.g., in `pages/index.tsx` or specific component files) to query for and render this new data. The `getStaticProps` function in `pages/index.tsx` would need to be updated to read from new content folders or parse new fields.

### C. To the Website's Look, Feel, or Functionality (Frontend Code)

1.  **Edit Code:**
    - For page structure or specific page logic: Modify files in `pages/`.
    - For reusable UI elements: Modify or create components in `components/`.
    - For styling: Utilize Tailwind CSS utility classes directly in your JSX. For global styles or Tailwind customizations, edit `globals.css` or `tailwind.config.js`.
2.  **Test Locally:** Use `npm run dev` to see your changes.
3.  **Commit & Push:** Commit your code changes to the `decap-cms` branch (or your development branch if you use one, then merge to `decap-cms`).
4.  **Netlify Deploy:** Netlify will automatically build and deploy these changes to your live site.

## 8. Key Environment Variables (Set in Netlify UI)

The following environment variables are important for the Netlify build process:

- **`NPM_FLAGS`**
  - **Value:** `--include=dev`
  - **Reason:** Tells `npm install` on Netlify to install packages from `devDependencies` in addition to `dependencies`. This is crucial because tools like TypeScript and Tailwind CSS, while listed as `devDependencies`, are required during the `next build` process for production.

## 9. Deployment

- **Branch:** The `decap-cms` branch is currently configured as the production branch on Netlify.
- **Process:** All pushes to this branch will automatically trigger a new build and deployment on Netlify.
- **Logs:** You can view detailed build and deploy logs in your site's dashboard on Netlify under the "Deploys" section. This is the first place to check if a deployment fails or if you encounter unexpected behavior on the live site.

---

This README should provide a solid foundation for understanding and working with the project.
