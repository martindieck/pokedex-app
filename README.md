![Pokeclicker](https://i.imgur.com/V9kfJQO.png)

Pokeclicker is a Pokémon-themed autoclicker game built with Ruby on Rails, Turbo, and Stimulus. Catch all 1025 Pokémon, including shinies, and build up your trainer empire to earn passive income through your Pokémon!

[Live Demo](https://pokeclicker.martindieck.com)

## Gameplay

- Encounter any of the 1025 existing Pokémon — complete with sprites.
- Catch Pokémon manually or hire trainers to automate the catching process.
- Earn money per second from each Pokémon caught.
- Boost your income by purchasing berries that increase each Pokémon's earn rate.
- Try to catch every Pokémon in both normal and shiny forms.
- Track your collection in your personalized Pokédex-style profile.

## Screenshots

![Screenshot](https://i.imgur.com/IQ5dMEb.png)
![Profile](https://i.imgur.com/rNZtbxP.png)

## Tech Stack

- **Ruby on Rails** – backend and frontend framework
- **Turbo** – for seamless updates without full page reloads
- **Stimulus** – for lightweight JavaScript interactivity
- **Devise** - for user authentication and log-in
- **HTML & CSS** – basic UI styling
- **SQLite** – development database
- **PostgreSQL** – production database
- **Heroku** – deployment platform

## Installation

To run Pokeclicker locally:

1.  Make sure you have Ruby and Rails installed:
   ```
   ruby -v
   rails -v
   ```
2.  Clone the repository:
   ```
   git clone https://github.com/martindieck/pokedex-app.git
   cd pokedex-app
   ```
3.	Install dependencies:
   ```
   bundle install
   ```
4.	Set up and seed the database:
   ```
   rails db:setup
   rails db:seed
   ```
5.	Start the server:
   ```
   rails server
   ```
6.	Visit http://localhost:3000 in your browser to play.

## Live Version

Check out the live version [here](https://pokeclicker.martindieck.com)

## Contributions
Contributions are welcome! Feel free to:
- Fork the repo
- Create a new branch
- Submit a pull request with your feature or fix

MIT licensed – this is primarily an educational and learning-focused project.
