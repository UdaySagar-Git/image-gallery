# Image Gallery

This project is an Image Gallery application that allows users to view images from Unsplash. It is built using Next.js with Tailwind CSS for styling. The application supports infinite scroll, allowing users to seamlessly load and view more images as they scroll down the page.

## Features

- Infinite scrolling to load more images as you scroll.
- Responsive design with a masonry layout for image display.
- Image modal for viewing images in a larger format with additional details.
- Download functionality for images.
- Displays user information and likes for each image.

## Technologies Used

- Next.js
- Tailwind CSS
- TypeScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/UdaySagar-Git/image-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd image-gallery
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Unsplash API key:

   ```plaintext
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Code Structure

- `src/app`: Contains the main application components and pages.
- `src/components`: Contains reusable components.

## Configuration

- **ESLint**: Configured for linting files.
- **Prettier**: Configured for code formatting.
- **Husky**: Manages Git hooks.
- **Lint-staged**: Runs linters on Git staged files.
