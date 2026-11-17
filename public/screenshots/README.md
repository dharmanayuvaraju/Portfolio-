# Screenshots Directory

Store project screenshots here.

### How to add screenshots for your projects:
1. Save your screenshot image file here, for example:
   - `ai-job-hunt-1.png`
   - `cafelive-1.png`
   - `teja-studios-1.png`
   - `ghatmitra-1.png`
   - etc.

2. In `src/data/projects.ts`, update the `screenshots` array for the corresponding project:
   ```ts
   screenshots: [
     {
       url: '/screenshots/ai-job-hunt-1.png',
       caption: 'AI Job Hunt dashboard view with job matches'
     }
   ]
   ```

3. If a project has an empty `screenshots: []` array, the portfolio will automatically render a clean, high-precision placeholder tile with technical metadata and coordinate guidelines.
