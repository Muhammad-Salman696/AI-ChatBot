ChatBox AI (Next.js + OpenAI)
This is a simple chat interface built with React (JSX) using Next.js API Routes to communicate with the OpenAI GPT-3.5-Turbo model. It allows users to ask a question and get an AI-generated response.

## Features
Simple chat UI with input field and Send button
Uses OpenAI’s chat/completions endpoint
Messages displayed in a conversational format
Handles errors and invalid input

## Setup Instructions
Clone the repository
git clone https://github.com/your-username/chatbox-ai.git
cd chatbox-ai

## Install dependencies
npm install

## Set up OpenAI API key
Create a .env.local file in the root of your project and add:
OPENAI_API_KEY=your_openai_api_key_here
You can get your OpenAI key from https://platform.openai.com/account/api-keys

## Run the development server
npm run dev
