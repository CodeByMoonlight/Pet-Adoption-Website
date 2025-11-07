# Pet Adoption Website

Welcome to the **Pet Adoption Website**! This project is a modern, responsive web application designed to help users find and adopt pets. It features a clean design, interactive animations, and a user-friendly interface.

## Features

- **Home Page**: A welcoming page with a loading screen and background music.
- **Pet Listings**: Browse pets with detailed information and images.
- **Interactive Animations**: Smooth scroll-reveal animations for a professional look.
- **Modals**: Create, update, view, and adopt pets using modals.
- **Audio Player**: Background music with play/pause functionality.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

---

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Custom scroll-reveal animations
- **State Management**: React hooks (`useState`, `useEffect`)
- **TypeScript**: For type safety and better development experience

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/pet-adoption-website.git
    cd pet-adoption-website
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```plaintext
pet-adoption-website/
├── app/
│   ├── components/
│   │   ├── AudioPlayer.tsx       # Background music player
│   │   ├── Loading.tsx           # Loading screen component
│   │   ├── ScrollReveal.tsx      # Scroll animations
│   │   ├── PetCard.tsx           # Individual pet card
│   │   ├── CreatePetModal.tsx    # Modal for creating a pet
│   │   ├── UpdatePetModal.tsx    # Modal for updating a pet
│   │   ├── AdoptModal.tsx        # Modal for adopting a pet
│   │   ├── ViewPetModal.tsx      # Modal for viewing pet details
│   │   └── ReviewModal.tsx       # Modal for reviews
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── public/
│   ├── assets/
│   │   └── bg_music.mp3          # Background music file
│   ├── images/
│   │   └── TY1.gif               # Loading animation
├── README.md                     # Project documentation
├── package.json                  # Project dependencies
└── tsconfig.json                 # TypeScript configuration
```

---

## Key Components

### 1. **Loading Screen**

- Displays a loading animation on the first visit.
- Fades out after 8 seconds or when data is loaded.

### 2. **Audio Player**

- Plays background music with play/pause functionality.
- Music loops automatically.

### 3. **ScrollReveal Animations**

- Smooth animations for sections and pet cards as they come into view.

### 4. **Pet Modals**

- **CreatePetModal**: Add a new pet.
- **UpdatePetModal**: Edit pet details.
- **AdoptModal**: Adopt a pet.
- **ViewPetModal**: View detailed information about a pet.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Academic Context

This website is a project developed for the ICE 415 subject. It demonstrates the integration of modern web development frameworks and APIs to create a functional and interactive application.

---

## Contributors

- **Created By:**: Alijah Valle & Abby Gale Señeres
