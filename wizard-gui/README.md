# Wizard GUI

This is a React Vite application.

## Project Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/alexarlord-boop/ti-wizard-gui.git
    cd wizard-gui
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the development server:
    ```sh
    npm run dev
    ```

## Docker Setup

1. Build the Docker image:
    ```sh
    docker build -t wizard-gui .
    ```

2. Run the Docker container:
    ```sh
    docker run -dp 3000:3000 wizard-gui
    ```

## Running the Application

After running the Docker container, open your web browser and navigate to `http://localhost:3000` to see the application.

## Configuration

The application is configured to run on port 3000. You can change the port by updating the `vite.config.js` file and the Docker commands accordingly.

