## Image Optimization

- the default image optimization is turned off in `next.config.mjs`.
- The script `optimize-images.ts` optimizes the images using sharp.
- The images in` posts/**` are
  - uploaded to github
  - never uploaded to vercel
    - they are ignored with `.vercelignore`

### Workflow

- Colocate images with your posts
  - posts/post-name/images
- Run optimization script located in `scripts` directory.

## Video Optimization

- using next-video and mux
